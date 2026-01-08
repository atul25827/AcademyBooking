"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock Data for Upcoming Events
const EVENTS = [
    {
        id: 1,
        title: "National Tennis Championship 2024",
        date: "2024-02-15",
        time: "09:00 AM",
        location: "Meril Academy Main Court",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop",
        category: "Tournament"
    },
    {
        id: 2,
        title: "Summer Football Camp",
        date: "2024-03-01",
        time: "10:00 AM",
        location: "Training Ground B",
        image: "https://images.unsplash.com/photo-1543326727-b5c33f044948?q=80&w=800&auto=format&fit=crop",
        category: "Training"
    },
    {
        id: 3,
        title: "Badminton Pro League",
        date: "2024-03-10",
        time: "04:00 PM",
        location: "Indoor Arena 1",
        image: "https://images.unsplash.com/photo-1626224583764-8478907cd485?q=80&w=800&auto=format&fit=crop",
        category: "Pro League"
    }
];

export function UpcomingEvents() {
    const hasEvents = EVENTS.length > 0;

    return (
        <section className="py-10 md:py-16 bg-transparent">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-purple-600 font-semibold tracking-wide uppercase text-sm">Don't Miss Out</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 font-poppins">Upcoming Events</h2>
                    </div>
                    {hasEvents && (
                        <Button variant="outline" className="hidden sm:flex rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-purple-600">
                            View Calendar
                        </Button>
                    )}
                </div>

                {hasEvents ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {EVENTS.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                            >
                                {/* Image Container */}
                                {/* <div className="relative h-48 w-full overflow-hidden">
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-purple-700 z-10 shadow-sm uppercase tracking-wider">
                                        {event.category}
                                    </span>
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-0" />
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div> */}

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-purple-500" />
                                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-purple-500" />
                                            <span>{event.time}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                                        <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                                        <span className="truncate">{event.location}</span>
                                    </div>

                                    <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-purple-600 transition-colors">
                                        Register Now
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">No Upcoming Events</h3>
                        <p className="text-slate-500 max-w-sm mt-2">
                            We don't have any events scheduled at the moment. Check back later or follow our announcements!
                        </p>
                    </div>
                )}

                {/* Mobile View All Button */}
                {hasEvents && (
                    <div className="mt-8 sm:hidden px-4">
                        <Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-700">
                            View Full Calendar
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
