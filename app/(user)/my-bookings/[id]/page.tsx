"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { type Booking, type Academy, type Hall } from "@/types";
import { Button } from "@/components/ui/button";
import { BookingDetailsView } from "@/components/booking/booking-details-view";

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [academy, setAcademy] = useState<Academy | undefined>();

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        // Fetch booking details
        api.listBookings().then(async (allBookings) => {
            const foundBooking = allBookings.find(b => b.id === id);

            if (foundBooking) {
                setBooking(foundBooking);

                // Fetch Academy details if needed
                const academies = await api.listAcademies();
                const foundAcademy = academies.find(a => a.id === foundBooking.academyId);
                setAcademy(foundAcademy);
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
        <BookingDetailsView
            booking={booking}
            academy={academy}
            onBack={() => router.back()}
        />
    );
}
