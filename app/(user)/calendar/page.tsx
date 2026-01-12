"use client";

import CalendarView from "../../../components/calendar/calendar-view";

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="space-y-6 container max-w-7xl mx-auto py-6">
                <div>
                    <h1 className="text-[20px] md:text-[24px] font-medium tracking-tight">Events Schedule</h1>
                    <p className="text-[14px] md:text-[16px] font-normal tracking-tight">Manage your sessions and upcoming bookings.</p>
                </div>
                <CalendarView />
            </div>
        </div>
    );
}
