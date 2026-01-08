"use client";

import { useSearchParams } from "next/navigation";
import AcademyList from "@/components/academy/academy-list";
import { BookingForm } from "@/components/booking/booking-form";
import { Suspense } from "react";

function BookPageContent() {
  const searchParams = useSearchParams();
  const academyId = searchParams.get("academyId");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{academyId ? "Complete Booking" : "Book an Academy"}</h1>
        <p className="text-muted-foreground">{academyId ? "Review details and confirm your slot." : "Select an academy to view available slots."}</p>
      </div>

      {academyId ? (
        <BookingForm academyId={academyId} />
      ) : (
        <AcademyList />
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading booking...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
