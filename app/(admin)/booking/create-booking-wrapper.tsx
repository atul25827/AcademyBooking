"use client";

import { useRouter } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import { MasterData, Academy } from "@/types";

interface CreateBookingWrapperProps {
    masterData: MasterData | null;
    academies: Academy[];
}

export function CreateBookingWrapper({ masterData, academies }: CreateBookingWrapperProps) {
    const router = useRouter();

    return (
        <BookingForm
            masterData={masterData}
            academies={academies}
            onSuccess={() => router.push("/admin/bookings")}
            onCancel={() => router.back()}
        />
    );
}
