"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Hall, Academy } from "@/types";
import { HallCard } from "./hall-card";

interface HallListProps {
    academyId?: string; // If provided, filter by this academy
}

export default function HallList({ academyId }: HallListProps) {
    const [halls, setHalls] = useState<Hall[]>([]);
    const [academies, setAcademies] = useState<Academy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [hallsData, academiesData] = await Promise.all([
                    api.listHalls(academyId),
                    api.listAcademies()
                ]);
                setHalls(hallsData);
                setAcademies(academiesData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [academyId]);

    const getAcademyName = (id: string) => {
        return academies.find(a => a.id === id)?.name || "Unknown Academy";
    };

    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[380px] rounded-[24px] bg-muted/20 animate-pulse border border-slate-100" />
                ))}
            </div>
        );
    }

    if (halls.length === 0) {
        return (
            <div className="text-center py-20 text-muted-foreground">
                <p>No halls found for the selected criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {halls.map((hall) => (
                <HallCard
                    key={hall.id}
                    hall={hall}
                    academyName={getAcademyName(hall.academyId)}
                />
            ))}
        </div>
    );
}
