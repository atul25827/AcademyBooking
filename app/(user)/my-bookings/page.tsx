"use client";

import { useRouter } from "next/navigation"; // Add useRouter
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { type Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Eye, Search, Pencil, Trash2, MapPin, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingStats } from "@/components/booking/booking-stats";

// Removed StatusBadge component as we have a new one in the main component


export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        api.listBookings().then((data) => {
            setBookings(data);
            setLoading(false);
        });
    }, []);

    // Pagination Logic
    const filteredBookings = bookings.filter(b =>
        b.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.organizer?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleViewDetails = (bookingId: string) => {
        router.push(`/my-bookings/${bookingId}`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "upcoming":
            case "approved":
                return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] text-xs font-medium border border-[#ABEFC6]">Approved</span>;
            case "cancelled":
            case "rejected":
                return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#FEF3F2] text-[#B42318] text-xs font-medium border border-[#FECDCA]">Rejected</span>;
            default:
                return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">{status}</span>;
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Booking Stats Cards */}
            <BookingStats bookings={bookings} />

            {/* Main Container matching Figma */}
            <div className="bg-white rounded-[24px] shadow-[0px_4px_15px_0px_rgba(131,131,131,0.64)] p-6 md:p-8 ">

                {/* Top Filters & Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Select>
                            <SelectTrigger className="w-full md:w-[140px] h-[44px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-full md:w-[180px] h-[44px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Select Academy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Academies</SelectItem>
                                {/* Add dynamic options here */}
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-full md:w-[220px] h-[44px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Select Conference & Hall" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Halls</SelectItem>
                                {/* Add dynamic options here */}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" className="w-full md:w-auto h-[44px] px-6 rounded-[6px] border-[#B4B4B4] text-[#271E4A] hover:bg-slate-50">
                        Export
                    </Button>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block rounded-lg overflow-hidden border border-[#EAECF0]">
                    <Table>
                        <TableHeader className="bg-[#F7F9FC]">
                            <TableRow className="border-b border-[#EAECF0] hover:bg-[#F7F9FC] text-nowrap">
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Booking ID</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Academy</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Hall</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Full Name</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Event Start Date</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Event Start End</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm">Training/Event Title</TableHead>
                                <TableHead className="py-4 font-medium text-[#271E4A] text-sm text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-24 text-center">Loading bookings...</TableCell>
                                </TableRow>
                            ) : paginatedBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedBookings.map((booking) => (
                                    <TableRow key={booking.id} className="border-b border-[#EAECF0] hover:bg-slate-50 text-nowrap">
                                        <TableCell className="py-4 text-[#344054] font-medium text-sm">
                                            <button onClick={() => handleViewDetails(booking.id)} className="text-[#6941C6] hover:underline cursor-pointer">
                                                #{booking.id.toUpperCase()}
                                            </button>
                                        </TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.academyId === "ac1" ? "Vapi Academy" : "Other Academy"}</TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.hallId === "h1" ? "Lister Hall" : "Hall 2"}</TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.organizer || "N/A"}</TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.date}</TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.date}</TableCell>
                                        <TableCell className="py-4 text-[#101828] font-normal text-sm">{booking.eventName || "N/A"}</TableCell>
                                        <TableCell className="py-4 text-center">
                                            {getStatusBadge(booking.status)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-slate-600 text-sm">Recent Bookings</h3>
                        <span className="text-xs text-slate-500">{paginatedBookings.length} of {filteredBookings.length}</span>
                    </div>
                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading bookings...</div>
                    ) : paginatedBookings.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">No bookings found.</div>
                    ) : (
                        paginatedBookings.map((booking) => (
                            <div key={booking.id} onClick={() => handleViewDetails(booking.id)} className="bg-white border border-[#e5e7eb] rounded-[14px] p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="font-medium text-[#6941C6] text-sm">#{booking.id.toUpperCase()}</span>
                                    {getStatusBadge(booking.status)}
                                </div>
                                <h4 className="font-medium text-[#101828] text-base mb-4 line-clamp-2">
                                    {booking.eventName || "Untitled Event"}
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-[#4a5565]">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <MapPin className="h-3 w-3 text-slate-500" />
                                        </div>
                                        <span>{booking.hallId === "h1" ? "Lister Hall" : "Hall 2"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#4a5565]">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <Calendar className="h-3 w-3 text-slate-500" />
                                        </div>
                                        <span>{booking.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={currentPage === page}
                                            onClick={() => setCurrentPage(page)}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
