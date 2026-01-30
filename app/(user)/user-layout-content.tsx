"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export function UserLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Logic: Home page (/) shows gradient (transparent div), others show white bg
    const isHome = pathname === "/";

    return (
        // <div className={isHome ? "min-h-screen" : "min-h-screen bg-white"}>
        //     <Header />
        //     <main>{children}</main>
        // </div>

        <div className={cn("flex min-h-screen flex-col", !isHome && "bg-white")}>
            <Header />
            <main className="flex-1 w-full container max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>

    );
}
