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
    useEffect(() => {
        const storedUser = localStorage.getItem("academy_auth_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse auth user", e);
                console.error("Failed to parse auth token from cookie", e);
                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear invalid cookie
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await api.login(email, password);
            console.log(data, "data")
            // Map API response to User type
            // Response: { sid, user_id, role, full_name }
            const apiUser = {
                id: data.message.user_id || "unknown", // Fallback if needed
                name: data.message.full_name || data.message.user_id,
                email: data.message.user_id, // "usr" is usually email or username
                role: data.message.role ? data.message.role : "Academy User", // Default
                avatarUrl: data.message.image, // Assuming image might be returned, or use fallback
                employeeCode: data.message.employee_code,
            } as User;

            // Normalize role (case insensitive check)
            if (data.message.role && (data.message.role.toLowerCase() === 'system manager' || data.message.role.toLowerCase().includes('academy admin'))) {
                apiUser.role = 'Academy Admin';
            } else {
                apiUser.role = 'Academy User';
            }

            console.log("Login successful", apiUser);

            setUser(apiUser);
            localStorage.setItem("academy_auth_user", JSON.stringify(apiUser));
            document.cookie = `auth_token=${encodeURIComponent(JSON.stringify(apiUser))}; path=/; max-age=${60 * 60 * 24 * 7}`;

            // Redirect based on role (Case insensitive check just to be safe, though we just set it)
            if (apiUser.role.toUpperCase() === "ACADEMY ADMIN") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Propagate error to component for handling
        }
    };

    const logout = async () => {
        await api.logout();
        setUser(null);
        localStorage.removeItem("academy_auth_user");
        // Clear cookies client-side if needed, though the API response should handle it via headers
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
