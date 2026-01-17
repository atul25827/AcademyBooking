import { Booking } from "@/types";
import { Calendar, CalendarCheck, CalendarClock, CalendarX } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStatsProps {
    bookings: Booking[];
}

export function BookingStats({ bookings }: BookingStatsProps) {
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
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            borderColor: "border-blue-200"
        },
        {
            label: "Total Approved",
            value: approvedCount,
            icon: CalendarCheck,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
            borderColor: "border-emerald-200"
        },
        {
            label: "Total Pending",
            value: pendingCount,
            icon: CalendarClock,
            color: "text-amber-600",
            bgColor: "bg-amber-100",
            borderColor: "border-amber-200"
        },
        {
            label: "Total Rejected",
            value: rejectedCount,
            icon: CalendarX,
            color: "text-red-600",
            bgColor: "bg-red-100",
            borderColor: "border-red-200"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "bg-white rounded-[16px] p-6",
                        "border border-slate-100",
                        "shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)]",
                        "transition-all duration-300 ease-in-out",
                        "flex items-center gap-5",
                        "group cursor-default"
                    )}
                >
                    <div className={cn(
                        "p-3.5 rounded-2xl flex items-center justify-center transition-colors duration-300",
                        stat.bgColor,
                        "group-hover:scale-105"
                    )}>
                        <stat.icon className={cn("w-6 h-6", stat.color)} strokeWidth={2} />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">
                            {stat.value}
                        </span>
                        <span className="text-sm font-medium text-slate-500">
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
