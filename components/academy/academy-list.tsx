"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { type Academy } from "@/types";
import { AcademyCard } from "./academy-card";
import { Skeleton } from "@/components/ui/skeleton";
// Note: I haven't created Skeleton yet. I will create it or use a simple fallback.
// I'll create a simple inline skeleton or create the component.
// I'll stick to a simple loader here to avoid circular dep if I forget to create Skeleton.

export default function AcademyList() {
    const [academies, setAcademies] = useState<Academy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetch
        api.listAcademies()
            .then(setAcademies)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted/20 animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {academies.map((academy) => (
                <AcademyCard key={academy.id} academy={academy} />
            ))}
        </div>
    );
}
