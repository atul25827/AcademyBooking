"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Booking } from "@/types";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        api.listBookings().then((data) => {
            setBookings(data);
            setLoading(false);
        });
    }, []);

    // Get 5 most recent bookings
    const recentBookings = [...bookings].sort((a, b) => {
        // Simplified sort by ID desc or Date desc if available
        return b.id.localeCompare(a.id);
    }).slice(0, 5);

    const handleViewDetails = (id: string) => {
        router.push(`/admin/bookings/${id}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Section */}
            <DashboardStats bookings={bookings} />

            {/* Recent Bookings Section */}
            <div className="bg-white rounded-[24px] shadow-[0px_4px_15px_0px_rgba(216,210,252,0.64)] p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[24px] font-medium text-[#271E4A] font-poppins">Your Booking</h2>
                    <Link href="/admin/bookings">
                        <Button variant="outline" className="bg-[#EDF2FA] text-[#271E4A] border-none hover:bg-slate-200">
                            View List
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-[#EDF4FC]">
                            <TableRow className="border-none hover:bg-[#EDF4FC]">
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Booking ID</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Academy</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Hall</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Full Name</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Event Start Date</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Event Start End</TableHead>
                                <TableHead className="py-4 font-normal text-[#5A5A5A] text-sm">Training/Event Title</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">Loading...</TableCell>
                                </TableRow>
                            ) : recentBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No bookings found.</TableCell>
                                </TableRow>
                            ) : (
                                recentBookings.map((booking) => (
                                    <TableRow
                                        key={booking.id}
                                        className="border-b border-gray-100 hover:bg-slate-50 cursor-pointer"
                                        onClick={() => handleViewDetails(booking.id)}
                                    >
                                        <TableCell className="py-4 font-medium text-[#101828] text-sm">{booking.id}</TableCell>
                                        <TableCell className="py-4 text-[#101828] text-sm">{booking.academyId === "ac1" ? "Vapi Academy" : "Other"}</TableCell>
                                        <TableCell className="py-4 text-[#101828] text-sm">{booking.hallId === "h1" ? "Lister Hall" : "Hall 2"}</TableCell>
                                        <TableCell className="py-4 text-[#33398A] font-medium text-sm">{booking.organizer || "User Name"}</TableCell>
                                        <TableCell className="py-4 text-[#101828] text-sm">{booking.date}</TableCell>
                                        <TableCell className="py-4 text-[#101828] text-sm">{booking.date}</TableCell>
                                        <TableCell className="py-4 text-[#101828] text-sm">{booking.eventName}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
