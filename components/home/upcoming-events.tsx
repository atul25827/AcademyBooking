"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Upcoming Events (Updated to match design needs)
const EVENTS = [
    {
        id: 1,
        title: "EURO PCR 2025",
        date: "2025-12-12",
        startDay: "Monday",
        startTime: "10:30AM",
        endTime: "05:30 PM",
        location: "Vapi Academy",
        attendees: 150,
    },
    {
        id: 2,
        title: "Medical Tech Summit",
        date: "2025-12-18",
        startDay: "Sunday",
        startTime: "09:00AM",
        endTime: "04:00 PM",
        location: "Mumbai Center",
        attendees: 200,
    },
    {
        id: 3,
        title: "Health & Wellness Workshop",
        date: "2026-01-05", // Example next year
        startDay: "Friday",
        startTime: "02:00PM",
        endTime: "06:00 PM",
        location: "Delhi Main Hall",
        attendees: 85,
    }
];

export function UpcomingEvents() {
    const hasEvents = EVENTS.length > 0;

    return (
        <section className="py-10 md:py-16">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between md:mb-8 mb-4">
                    <div>
                        <span className="text-[#7D3FD0] font-medium tracking-wide uppercase text-sm">Don't Miss Out</span>
                        <h2 className="text-[20px] md:text-[24px] font-medium text-slate-900 mt-2 font-poppins">Upcoming Events</h2>
                    </div>
                    {hasEvents && (
                        <Link href="/calendar">
                            <Button variant="outline" className="hidden sm:flex rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#7D3FD0] cursor-pointer">
                                View Calendar
                            </Button>
                        </Link>
                    )}
                </div>

                {hasEvents ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {EVENTS.map((event, index) => {
                            const eventDate = new Date(event.date);
                            const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
                            const day = eventDate.toLocaleDateString('en-US', { day: '2-digit' });
                            const year = eventDate.getFullYear();

                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex bg-white rounded-[12px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 min-h-[160px]"
                                >
                                    {/* Left Section: Details */}
                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                        {/* Date Time Header */}
                                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                                            {event.startDay} {event.startTime} To {event.endTime}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[16px] md:text-[20px] font-semibold text-slate-900 py-1 line-clamp-2">
                                            {event.title}
                                        </h3>

                                        {/* Meta Info */}
                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <MapPin className="w-4 h-4 text-[#7D3FD0]" />
                                                <span className="font-light">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Users className="w-4 h-4 text-[#7D3FD0]" />
                                                <span className="font-light">{event.attendees} Attendees</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual Separator (Dots) */}
                                    <div className="w-[20px] flex flex-col items-center justify-center gap-1.5 py-4">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        ))}
                                    </div>

                                    {/* Right Section: Date Block */}
                                    <div className="w-[100px] flex flex-col items-center justify-center p-4 text-slate-800">
                                        <span className="text-lg font-normal">{month}</span>
                                        <span className="text-4xl font-normal my-1">{day}</span>
                                        <span className="text-lg font-normal text-slate-500">{year}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State - Preserved mostly as is */
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                        {/* Using a generic Calendar icon here if valid, or just keeping the structure */}
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">📅</span>
                        </div>
                        <h3 className="text-[20px] md:text-[24px] font-semibold text-slate-900">No Upcoming Events</h3>
                        <p className="text-slate-500 max-w-sm mt-2">
                            We don't have any events scheduled at the moment. Check back later or follow our announcements!
                        </p>
                    </div>
                )}

                {/* Mobile View All Button */}
                {hasEvents && (
                    <div className="mt-8 sm:hidden px-4">
                        <Link href="/calendar">
                            <Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-700">
                                View Full Calendar
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

