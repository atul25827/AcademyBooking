"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { type Booking, type Academy, type Hall } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Clock, MapPin, User, Users, Briefcase, Mail, Phone, FileText, Monitor, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper Status Badge (reused from MyBookings)
function StatusBadge({ status }: { status: string }) {
    const statusColor = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
        upcoming: "bg-blue-100 text-blue-700",
        completed: "bg-slate-100 text-slate-700",
        cancelled: "bg-red-100 text-red-700"
    };

    const colorClass = statusColor[status as keyof typeof statusColor] || statusColor.pending;

    return (
        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide", colorClass)}>
            {status}
        </span>
    );
}

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [academy, setAcademy] = useState<Academy | undefined>();
    const [hall, setHall] = useState<Hall | undefined>();

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        // Fetch booking details
        api.listBookings().then(async (allBookings) => {
            const foundBooking = allBookings.find(b => b.id === id);

            if (foundBooking) {
                setBooking(foundBooking);

                // Fetch Academy & Hall details if needed (mocked for now)
                const academies = await api.listAcademies();
                const foundAcademy = academies.find(a => a.id === foundBooking.academyId);
                setAcademy(foundAcademy);

                // Assuming we could fetch halls
                // const halls = await api.listHalls(foundBooking.academyId);
                // setHall(halls.find(h => h.id === foundBooking.hallId));
            }
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl animate-pulse">
                <div className="h-8 w-1/4 bg-slate-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 bg-slate-200 rounded"></div>
                    <div className="h-64 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="container mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold text-slate-800">Booking Not Found</h1>
                <Button onClick={() => router.back()} className="mt-4" variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 -ml-2 text-slate-500 hover:text-slate-800">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#271E4A] font-poppins">{booking.eventName || "Event Details"}</h1>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                            <span className="font-mono text-[#7D3FD0]">#{booking.id.toUpperCase()}</span>
                            <span>•</span>
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={booking.status} />
                    <Button variant="outline" className="border-slate-300 text-slate-700">Edit Booking</Button>
                    {/* Only show cancel if upcoming */}
                    {(booking.status === 'upcoming' || booking.status === 'pending') && (
                        <Button variant="destructive">Cancel Booking</Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content - Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Event & Venue Card */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-[#7D3FD0]" />
                                Event & Venue
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Event Title</label>
                                    <p className="text-slate-900 font-medium">{booking.trainingTitle || booking.eventName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
                                    <p className="text-sm text-slate-700 leading-relaxed max-w-md">
                                        {booking.description || "No description provided."}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-slate-900">{academy?.name || booking.academyId}</p>
                                        <p className="text-sm text-slate-500">{academy?.location || "Location N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Briefcase className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-slate-900">{booking.hallId === 'h1' ? 'Lister Hall' : 'Hall 2'}</p>
                                        <p className="text-sm text-slate-500">Selected Hall</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sessions Table Card */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-[#7D3FD0]" />
                                Session Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Mobile Friendly Session View */}
                            <div className="md:hidden p-4 space-y-4">
                                {booking.sessions ? booking.sessions.map((session, idx) => (
                                    <div key={idx} className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-slate-500 uppercase">Session {idx + 1}</span>
                                            <Badge variant="outline" className="text-slate-600 border-slate-300">{session.bookingType || "General"}</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <p className="text-slate-500 text-xs">Date</p>
                                                <p className="font-medium text-slate-800">{session.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 text-xs">Time</p>
                                                <p className="font-medium text-slate-800">{session.startTime} - {session.endTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-4 text-center text-slate-500 text-sm">No specific sessions details.</div>
                                )}
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Date</th>
                                            <th className="px-6 py-3 font-semibold">Time</th>
                                            <th className="px-6 py-3 font-semibold">Hall</th>
                                            <th className="px-6 py-3 font-semibold">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {booking.sessions ? booking.sessions.map((session, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-4 font-medium text-slate-900">{session.date}</td>
                                                <td className="px-6 py-4 text-slate-600">{session.startTime} - {session.endTime}</td>
                                                <td className="px-6 py-4 text-slate-600">{session.hallId === 'h1' ? "Lister Hall" : "Hall 2"}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="secondary" className="font-normal">{session.bookingType || "General"}</Badge>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                                    No detailed sessions found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Right Column (1/3) */}
                <div className="space-y-6">

                    {/* Organizer Info */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="pb-3 border-b border-slate-50">
                            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                                <User className="h-4 w-4 text-slate-500" />
                                Organizer Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#f0f9ff] text-[#006ccf] flex items-center justify-center font-bold text-sm">
                                    {(booking.fullName || booking.organizer)?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{booking.fullName || booking.organizer}</p>
                                    <p className="text-xs text-slate-500">{booking.department}</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <span>{booking.email || "No email"}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <span>{booking.contactNumber || "No phone"}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                                    <Briefcase className="h-4 w-4 text-slate-400" />
                                    <span>{booking.merilianCode ? `Code: ${booking.merilianCode}` : "No Code"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Requirements & Admin */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="pb-3 border-b border-slate-50">
                            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-500" />
                                Requirements & Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-5">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Participants</h4>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-slate-400" />
                                    <span className="font-medium text-slate-800">{booking.participantsCount || "N/A"} People</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">IT Requirements</h4>
                                <div className="flex items-start gap-2">
                                    <Monitor className="h-4 w-4 text-slate-400 mt-0.5" />
                                    <span className="text-sm text-slate-700">{booking.itRequirements || "None specified"}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-slate-50">
                                <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">MATS Status</h4>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Event?</span>
                                    <span className={cn("font-medium", booking.matsEvent === 'Yes' ? "text-green-600" : "text-slate-600")}>
                                        {booking.matsEvent || "No"}
                                    </span>
                                </div>
                                {booking.matsRequestNo && (
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="text-slate-600">Request #</span>
                                        <span className="font-mono text-slate-700 bg-slate-100 px-1.5 rounded">
                                            {booking.matsRequestNo}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
