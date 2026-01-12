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
        <h1 className="text-[24px] font-normal tracking-tight text-[#33398A]">{!academyId ? "Meril Conference Hall" : ""}</h1>
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
