"use client";

import React, { createContext, useContext, useState } from "react";
import { Academy } from "@/types";

// Extend Academy type to include our specific nested data if not already in types
// Since we mapped it in api.ts, we assume the objects passed here match that structure.
// We might need to cast or extend the type definition in types/index.ts strictly later, 
// but for now we'll use a generic approach or extend locally.

export interface AcademyContextType {
    academies: Academy[];
    loading: boolean;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({
    children,
    initialData
}: {
    children: React.ReactNode;
    initialData: Academy[];
}) {
    // We strictly use initialData which comes from Server Component
    // No useEffect fetching here to avoid double calls.
    const [academies] = useState<Academy[]>(initialData || []);

    return (
        <AcademyContext.Provider value={{ academies, loading: false }}>
            {children}
        </AcademyContext.Provider>
    );
}

export function useAcademy() {
    const context = useContext(AcademyContext);
    if (context === undefined) {
        throw new Error("useAcademy must be used within an AcademyProvider");
    }
    return context;
}
