import { Academy, Hall, Booking } from "@/types";
import { MOCK_ACADEMIES, MOCK_HALLS, MOCK_BOOKINGS } from "@/constants/mock-data";

export type { Academy, Hall, Booking }; // Re-export for backward compatibility if needed, or just let components import from types

export const api = {
    async listAcademies(): Promise<Academy[]> {
        await new Promise((r) => setTimeout(r, 400));
        return MOCK_ACADEMIES;
    },
    async listHalls(academyId?: string): Promise<Hall[]> {
        await new Promise((r) => setTimeout(r, 300));
        if (academyId && academyId !== "all") {
            return MOCK_HALLS.filter(h => h.academyId === academyId);
        }
        return MOCK_HALLS;
    },
    async listBookings(): Promise<Booking[]> {
        await new Promise((r) => setTimeout(r, 400));
        return MOCK_BOOKINGS;
    },
    async getAcademy(id: string): Promise<Academy | undefined> {
        await new Promise((r) => setTimeout(r, 200));
        return MOCK_ACADEMIES.find(a => a.id === id);
    }
};
