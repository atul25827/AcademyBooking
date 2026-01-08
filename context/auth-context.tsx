"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
export type UserRole = "USER" | "ADMIN";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
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
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock user data - In real app, this comes from API
            const mockUser: User = {
                id: "1",
                name: "Test User",
                email,
                role: email.includes("admin") ? "ADMIN" : "USER", // Simple role simulation
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            };

            setUser(mockUser);
            localStorage.setItem("academy_auth_user", JSON.stringify(mockUser));

            // Set cookie for middleware
            // Expires in 7 days
            document.cookie = `auth_token=${JSON.stringify(mockUser)}; path=/; max-age=${60 * 60 * 24 * 7}`;

            // Redirect based on role
            if (mockUser.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("academy_auth_user");
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/login"); // Or router.push("/") if preferred
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
