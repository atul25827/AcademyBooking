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
import { Badge, Eye, Search, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
                return <span className="inline-flex items-center justify-center px-4 py-1 rounded-[4px] bg-[#D1FADF] text-[#027A48] text-xs font-medium">Approved</span>;
            case "cancelled":
            case "rejected":
                return <span className="inline-flex items-center justify-center px-4 py-1 rounded-[4px] bg-[#FEE4E2] text-[#B42318] text-xs font-medium">Rejected</span>;
            default:
                return <span className="inline-flex items-center justify-center px-4 py-1 rounded-[4px] bg-slate-100 text-slate-600 text-xs font-medium">{status}</span>;
        }
    }

    return (
        <div className="container mx-auto py-6 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Container matching Figma */}
            <div className="bg-white rounded-[24px] shadow-[0px_4px_15px_0px_rgba(131,131,131,0.64)] p-6 md:p-8 min-h-[600px]">

                {/* Top Filters & Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Select>
                            <SelectTrigger className="md:w-[140px] w-[120px] md:h-[44px] h-[36px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="md:w-[180px] w-[120px] md:h-[44px] h-[36px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Select Academy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Academies</SelectItem>
                                {/* Add dynamic options here */}
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="md:w-[220px] w-[180px] md:h-[44px] h-[36px] rounded-[6px] border-[#BEBEBE] text-[#8E8787]">
                                <SelectValue placeholder="Select Conference & Hall" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Halls</SelectItem>
                                {/* Add dynamic options here */}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" className="h-[44px] px-6 rounded-[6px] border-[#BEBEBE] text-[#271E4A] hover:bg-slate-50">
                        Export
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-lg overflow-hidden border border-[#EAECF0]">
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
