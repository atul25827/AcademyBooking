"use client";

import CalendarView from "@/components/calendar/calendar-view";
import { useRouter } from "next/navigation";

export default function AdminCalendarPage() {
    const router = useRouter();

    const handleEventClick = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between pointer-events-none opacity-0 h-0">
                {/* Hidden header since Calendar has its own controls, or we can add one */}
                <h1 className="text-[24px] font-semibold text-[#271E4A] font-poppins">Calendar</h1>
            </div>

            <CalendarView onEventClick={handleEventClick} />
        </div>
    );
}
