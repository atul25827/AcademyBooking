"use client";

import { BookingForm } from "@/components/booking/booking-form";
import { useRouter } from "next/navigation";

export default function AdminCreateBookingPage() {
    const router = useRouter();

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_15px_0px_rgba(216,210,252,0.64)] animate-in fade-in duration-500">
            <h2 className="text-[24px] font-medium text-[#271E4A] font-poppins mb-6">Create New Booking</h2>
            <BookingForm
                academyId="ac1" // Default or selector
                onSuccess={() => router.push("/admin/bookings")}
                onCancel={() => router.back()}
            />
        </div>
    );
}
