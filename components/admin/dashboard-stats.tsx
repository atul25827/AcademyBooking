"use client";

import { Booking } from "@/types";
import { Calendar, CalendarCheck, Clock, XSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
    bookings: Booking[];
}

export function DashboardStats({ bookings }: DashboardStatsProps) {
    const totalEvents = bookings.length;

    const approvedCount = bookings.filter(b =>
        ["approved", "upcoming", "completed"].includes(b.status)
    ).length;

    const pendingCount = bookings.filter(b =>
        b.status === "pending"
    ).length;

    const rejectedCount = bookings.filter(b =>
        ["rejected", "cancelled"].includes(b.status)
    ).length;

    const stats = [
        {
            label: "Total Events",
            value: totalEvents,
            icon: Calendar,
            bgClass: "bg-[#E3E8FF]",
            textClass: "text-[#33398A]",
            iconClass: "text-[#33398A]"
        },
        {
            label: "Total Approved",
            value: approvedCount,
            icon: CalendarCheck,
            bgClass: "bg-[#D1FADF]",
            textClass: "text-[#027A48]",
            iconClass: "text-[#027A48]"
        },
        {
            label: "Total Pending",
            value: pendingCount,
            icon: Clock,
            bgClass: "bg-[#FEF0C7]",
            textClass: "text-[#B54708]",
            iconClass: "text-[#B54708]"
        },
        {
            label: "Total Rejected",
            value: rejectedCount,
            icon: XSquare,
            bgClass: "bg-[#FEE4E2]",
            textClass: "text-[#B42318]",
            iconClass: "text-[#B42318]"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "rounded-[16px] p-6 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]",
                        stat.bgClass
                    )}
                >
                    <stat.icon className={cn("w-10 h-10", stat.iconClass)} strokeWidth={1.5} />
                    <div className="flex flex-col">
                        <span className={cn("text-3xl font-bold tracking-tight", stat.textClass)}>
                            {stat.value}
                        </span>
                        <span className={cn("text-base font-medium opacity-90", stat.textClass)}>
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
