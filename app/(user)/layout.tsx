"use client";


import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// Main header handles auth state.

import { usePathname } from "next/navigation";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <div className={cn("flex min-h-screen flex-col", !isHomePage && "bg-white")}>
            <Header />
            <main className="flex-1 w-full container max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>
    );

}
