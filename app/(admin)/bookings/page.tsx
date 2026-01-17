"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Booking } from "@/types";
import { BookingList } from "@/components/booking/booking-list";

export default function AdminBookingsPage() {
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

    const handleViewDetails = (bookingId: string) => {
        router.push(`/admin/bookings/${bookingId}`); // Redirect to Admin Booking Details
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Reusing the BookingList component */}
            <BookingList
                bookings={bookings}
                loading={loading}
                onViewDetails={handleViewDetails}
            />
        </div>
    );
}
