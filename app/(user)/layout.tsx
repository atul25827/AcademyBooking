"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// Main header handles auth state.

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login?redirect=" + pathname);
        }
    }, [isLoading, isAuthenticated, router, pathname]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
    }

    if (!isAuthenticated) return null;


    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="flex-1 w-full container max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>
    );

}
