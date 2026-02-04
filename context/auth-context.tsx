"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
import { api } from "@/lib/api";
import { User, UserRole } from "@/types";

interface AuthContextType {
    user: User | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load auth state from localStorage on mount
    // Load auth state from localStorage or Cookie on mount
    // Load auth state from Cookie ONLY (Ideal Source of Truth for Next.js)
    useEffect(() => {
        const checkAuth = () => {
            try {
                // Parse auth_token from cookies
                const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                    const [key, value] = cookie.trim().split('=');
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, string>);

                if (cookies.auth_token) {
                    const userData = JSON.parse(decodeURIComponent(cookies.auth_token));
                    setUser(userData);
                }
            } catch (error) {
                console.error("Failed to restore auth session from cookie:", error);
                // Clear potentially corrupt cookie
                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const result = await api.login(email, password);

            if (result.error) {
                throw new Error(result.error);
            }

            const data = result.data;
            const apiUser = {
                id: data.message.user_id || "unknown",
                name: data.message.full_name || data.message.user_id,
                email: data.message.user_id,
                role: data.message.role ? data.message.role : "Academy User",
                avatarUrl: data.message.image,
                employeeCode: data.message.employee_code,
            } as User;

            if (data.message.role && (data.message.role.toLowerCase() === 'system manager' || data.message.role.toLowerCase().includes('academy admin'))) {
                apiUser.role = 'Academy Admin';
            } else {
                apiUser.role = 'Academy User';
            }

            setUser(apiUser);
            // We use Cookie as the single source of truth for Middleware compatibility
            document.cookie = `auth_token=${encodeURIComponent(JSON.stringify(apiUser))}; path=/; max-age=${60 * 60 * 24 * 7}`;

            if (apiUser.role.toUpperCase() === "ACADEMY ADMIN") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        await api.logout();
        setUser(null);
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "sid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "system_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "full_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.role || null,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
