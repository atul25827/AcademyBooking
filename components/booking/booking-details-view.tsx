"use client";

import { useRouter } from "next/navigation";
import { type BookingDetail } from "@/types"; // Keeping for type safety where possible
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDetailsViewProps {
    booking: BookingDetail; // Accept raw data from API typed as BookingDetail
}

function StatusBadge({ status }: { status: string }) {
    const statusColor = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
        upcoming: "bg-blue-100 text-blue-700",
        completed: "bg-slate-100 text-slate-700",
        cancelled: "bg-red-100 text-red-700"
    };

    const colorClass = statusColor[status?.toLowerCase() as keyof typeof statusColor] || statusColor.pending;

    return (
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium uppercase", colorClass)}>
            {status}
        </span>
    );
}

export function BookingDetailsView({ booking }: BookingDetailsViewProps) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };


    return (
        <div className="container mx-auto py-6 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 -ml-2 text-slate-500 hover:text-slate-800 cursor-pointer shrink-0 mt-1">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-y-2">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h1 className="text-[16px] md:text-2xl font-bold text-[#271E4A] font-poppins wrap-break-word leading-tight">
                                    {booking.event_title || "Event Details"}
                                </h1>
                                <StatusBadge status={booking.event_status || "Pending"} />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                            <span className="whitespace-nowrap">
                                Booking Id: <span className="font-mono text-[#7D3FD0]">#{(booking.booking_id || booking.name || "").toUpperCase()}</span>
                            </span>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    <span>{booking?.event_start_date ? new Date(booking.event_start_date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}</span>
                                </div>
                                <span className="text-slate-300">-</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    <span>{booking.event_end_date ? new Date(booking.event_end_date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Event & Venue Card */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-2">
                            <CardTitle className="text-[14px] md:text-lg font-medium text-slate-800">
                                Event & Venue
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 mb-2">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Academy</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.academy}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Participants</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.no_of_participants || 0}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Vertical</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.vertical || "N/A"}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs text-slate-500 font-medium">Department</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.department || "N/A"}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs text-slate-500 font-medium">Merilian Code</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.merilian_code || "N/A"}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs text-slate-500 font-medium">Full Name</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.full_name || "N/A"}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs text-slate-500 font-medium">Contact Number</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.contact_number || "N/A"}</p>
                                </div>
                                <div className="md:col-span-1">
                                    <p className="text-xs text-slate-500 font-medium">Email</p>
                                    <p className="font-medium text-slate-900 text-sm">{booking.email || "N/A"}</p>
                                </div>
                            </div>

                            {/* Description if available */}
                            {booking.description && (
                                <div className="">
                                    <h4 className="text-xs text-slate-500 font-medium">Description</h4>
                                    <p className="font-medium text-slate-900 text-sm">
                                        {booking.description}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {/* Sidebar - Right Column (1/3) */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Requirements & Admin */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-2">
                            <CardTitle className="text-[14px] md:text-lg font-medium text-slate-800">
                                Requirements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2 space-y-2">
                            <div>
                                <h4 className="text-xs text-slate-500 font-medium">Specific Requirements</h4>
                                <span className="font-medium text-slate-900 text-sm">{booking.specific_requirements || "None specified"}</span>
                            </div>
                            <div>
                                <h4 className="text-xs text-slate-500 font-medium">IT Requirements</h4>
                                <span className="font-medium text-slate-900 text-sm">{booking.it_requirement || "None specified"}</span>
                            </div>
                            <div>
                                <h4 className="text-xs text-slate-500 font-medium">MATS Status</h4>
                                <span className={cn("font-medium text-slate-900 text-sm", booking.mats_event === 'Yes' ? "text-green-600" : "text-slate-600")}>
                                    {booking.mats_event || "No"}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-xs text-slate-500 font-medium">MATS Request #</h4>
                                <span className="font-medium text-slate-900 text-sm">{booking.mats_request_no || "N/A"}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Schedule */}
                <div className="lg:col-span-3 space-y-2">
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-2">
                            <CardTitle className="text-[14px] md:text-lg font-medium text-slate-800">
                                Schedule - Daywise Plan ({booking.event_planning?.length || 1} Days)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {booking.event_planning && booking.event_planning.length > 0 ? booking.event_planning.map((session: any, idx: number) => (
                                    <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 shadow-md transition-shadow group flex flex-col gap-3">
                                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase border border-slate-200">
                                                    D{idx + 1}
                                                </div>
                                                <span className="text-sm font-medium text-slate-800">
                                                    {new Date(session.event_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                {new Date(session.event_date).toLocaleDateString(undefined, { weekday: 'short' })}
                                            </span>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="text-xs font-medium text-slate-700">{session.event_start_time || "09:00"} - {session.event_end_time || "17:00"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="text-xs font-medium text-slate-700">{session.hall}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-8 text-slate-500 text-sm">No schedule details available.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div >
    );
}
