"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import HallList from "@/components/academy/hall-list";
import { Suspense, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { Academy } from "@/types";
import { useAuth } from "@/context/auth-context";

function BookPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  // URL Params
  const academyIdParam = searchParams.get("academyId");
  const actionParam = searchParams.get("action");

  const isBookingMode = actionParam === "book";

  // Protect Booking Route
  useEffect(() => {
    if (!isLoading && isBookingMode && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isBookingMode, isAuthenticated, router]);

  // State for filter
  const [selectedAcademy, setSelectedAcademy] = useState<string>(academyIdParam || "all");
  const [academies, setAcademies] = useState<Academy[]>([]);

  useEffect(() => {
    // Sync state with URL param if it changes externally or on load
    if (academyIdParam) {
      setSelectedAcademy(academyIdParam);
    } else {
      setSelectedAcademy("all");
    }

    // Fetch academies for the dropdown
    api.listAcademies().then(setAcademies);
  }, [academyIdParam]);

  const handleFilterChange = (value: string) => {
    setSelectedAcademy(value);
    if (value === "all") {
      router.push("/book");
    } else {
      router.push(`/book?academyId=${value}`);
    }
  };



  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {!isBookingMode && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-[24px] font-normal tracking-tight text-[#33398A] font-poppins">
            Meril Conference Hall
          </h1>

          <div className="w-full md:w-[280px]">
            <Select value={selectedAcademy} onValueChange={handleFilterChange}>
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue placeholder="Select Academy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Academies</SelectItem>
                {academies.map((academy) => (
                  <SelectItem key={academy.id} value={academy.id}>
                    {academy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {isBookingMode ? (
        <BookingForm academyId={academyIdParam || ""} />
      ) : (
        <HallList academyId={selectedAcademy === "all" ? undefined : selectedAcademy} />
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-10 text-black font-poppins">Loading booking...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
