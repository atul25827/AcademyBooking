"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        if (path.includes("/dashboard")) return "Dashboard";
        if (path.includes("/bookings") && path.split("/").length > 3) return "Booking Details"; // /admin/bookings/123
        if (path.includes("/bookings")) return "All Bookings";
        if (path.endsWith("/booking")) return "Create Booking"; // /admin/booking
        if (path.includes("/calendar")) return "Calendar";
        return "Dashboard";
    };

    const title = getPageTitle(pathname);

    return (
        <div className="flex min-h-screen bg-[#F7F9FB]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ml-[100px]">
                <AdminHeader title={title} />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
