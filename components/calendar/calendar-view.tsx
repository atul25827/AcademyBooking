"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { type Booking } from "@/lib/api";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

// Helper to convert booking string to date event
const getEvents = (bookings: Booking[]) => {
    return bookings.map(b => ({
        title: b.timeSlot,
        start: b.date, // simple date for daygrid
        allDay: true,
        color: b.status === "upcoming" ? "#10b981" : "#64748b",
        extendedProps: { ...b }
    }));
}

export default function CalendarView() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.listBookings().then(bookings => {
            setEvents(getEvents(bookings));
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-10 text-center animate-pulse">Loading calendar...</div>;

    return (
        <div className="calendar-container rounded-xl border border-border/50 bg-card p-4 shadow-sm text-card-foreground">
            <style jsx global>{`
        .fc-theme-standard td, .fc-theme-standard th { border-color: var(--border); }
        .fc-col-header-cell-cushion { color: var(--foreground); padding: 10px !important; }
        .fc-daygrid-day-number { color: var(--muted-foreground); }
        .fc-button-primary { background-color: var(--primary) !important; border-color: var(--primary) !important; }
        .fc-button-active { background-color: var(--primary) !important; filter: brightness(0.9); }
        .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 700; }
      `}</style>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek"
                }}
                events={events}
                height="70vh"
                contentHeight="auto"
            />
        </div>
    );
}
