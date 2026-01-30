"use client";

import { Hall } from "@/types";
import { HallCard } from "./hall-card";

interface HallListProps {
    halls: Hall[];
}

export default function HallList({ halls }: HallListProps) {
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
                    academyName={hall.academyId} // Using mapped academyId which contains the name
                />
            ))}
        </div>
    );
}
