"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { type Booking, type Academy } from "@/types";
import { Button } from "@/components/ui/button";
import { BookingDetailsView } from "@/components/booking/booking-details-view";
import { Check, X } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed, or use alert for now

export default function AdminBookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [academy, setAcademy] = useState<Academy | undefined>();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        api.listBookings().then(async (allBookings) => {
            const foundBooking = allBookings.find(b => b.id === id);
            if (foundBooking) {
                setBooking(foundBooking);
                const academies = await api.listAcademies();
                const foundAcademy = academies.find(a => a.id === foundBooking.academyId);
                setAcademy(foundAcademy);
            }
            setLoading(false);
        });
    }, [id]);

    const handleAction = (status: 'approved' | 'rejected') => {
        // Here we would call API to update status
        // api.updateBookingStatus(id, status)
        toast.success(`Booking ${status.toUpperCase()} Successfully!`);
        router.push("/admin/bookings");
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!booking) {
        return <div className="p-8">Booking not found</div>;
    }

    const ActionButtons = (
        <>
            {booking.status === 'pending' && (
                <>
                    <Button
                        onClick={() => handleAction('approved')}
                        className="bg-[#D1FADF] hover:bg-[#A6F4C5] text-[#027A48] border border-[#027A48]/20 gap-2 font-medium"
                    >
                        <Check className="h-4 w-4" />
                        Approve
                    </Button>
                    <Button
                        onClick={() => handleAction('rejected')}
                        className="bg-[#FEE4E2] hover:bg-[#FECDCA] text-[#B42318] border border-[#B42318]/20 gap-2 font-medium ml-2"
                    >
                        <X className="h-4 w-4" />
                        Reject
                    </Button>
                </>
            )}
        </>
    );

    return (
        <BookingDetailsView
            booking={booking}
            academy={academy}
            onBack={() => router.back()}
            action={ActionButtons}
        />
    );
}
