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
    },
    async login(usr: string, pwd: string) {
        const baseUrl = process.env.NEXT_PUBLIC_FRAPPE_URL;
        if (!baseUrl) {
            console.error("NEXT_PUBLIC_BASE_URL is not defined");
            throw new Error("Configuration error");
        }

        const response = await fetch(`${baseUrl}/api/method/academy.api.auth.login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usr, pwd }),
            credentials: 'include', // Important for cookies
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Login failed');
        }

        return response.json();
    },
    async logout() {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) return;

        try {
            await fetch(`${baseUrl}/api/method/academy.api.auth.logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
    },
    async getAcademiesWithHalls(): Promise<Academy[]> {
        const baseUrl = process.env.NEXT_PUBLIC_FRAPPE_URL;
        if (!baseUrl) {
            console.error("NEXT_PUBLIC_BASE_URL (or FRAPPE_URL) is not defined");
            // Fallback to empty array or mock if strictly needed, but better to return empty to signal issue
            return [];
        }

        try {
            const response = await fetch(`${baseUrl}/api/method/academy.api.academy.get_academies_with_halls`, {
                cache: 'no-store' // Ensure fresh data
            });

            if (!response.ok) {
                console.error("Failed to fetch academies");
                return [];
            }
            const json = await response.json();
            // Expected response: { message: "Data Fetched Successfully", data: [...] }
            // Adjust based on actual API response structure provided by user
            const rawData = json.message.data || [];

            return rawData.map((item: any) => ({
                id: item.name, // "name" from API is the ID
                name: item.academy_name,
                imageUrl: item.attachment ? (item.attachment.startsWith('http') ? item.attachment : `${baseUrl}${encodeURI(item.attachment)}`) : '', // Handle potential relative URLs and encode spaces
                halls: (item.halls || []).map((h: any) => ({
                    id: h.name,
                    name: h.hall_name,
                    academyId: h.academy_name, // Or item.name if we want to link by ID
                    capacity: h.capacity || 0,
                    wifi: h.wifi || 0,
                    screen: h.screen || 0
                }))
            }));
        } catch (error) {
            console.error("Error fetching academies:", error);
            return [];
        }
    },

    async createBooking(bookingData: any) {
        const baseUrl = process.env.NEXT_PUBLIC_FRAPPE_URL;
        if (!baseUrl) {
            throw new Error("Configuration error: NEXT_PUBLIC_FRAPPE_URL is not defined");
        }

        const response = await fetch(`${baseUrl}/api/method/academy.api.booking.create_booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
            credentials: 'include', // Include cookies for authentication
        });

        const result = await response.json();

        if (!response.ok) {
            let errorMessage = result.message || result.exception || "Failed to create booking";

            // 1. Check for standard Frappe server messages (most actionable errors)
            if (result._server_messages) {
                try {
                    // _server_messages is a JSON string of a list of JSON strings
                    const messages = JSON.parse(result._server_messages);
                    errorMessage = JSON.parse(messages[0]).message;
                } catch (e) { /* ignore parse error */ }
            }

            // 2. Handle case where message is a nested object or JSON string
            if (typeof errorMessage === 'object' && errorMessage.message) {
                errorMessage = errorMessage.message;
            } else if (typeof errorMessage === 'string' && errorMessage.trim().startsWith('{')) {
                try {
                    const parsed = JSON.parse(errorMessage);
                    if (parsed.message) errorMessage = parsed.message;
                } catch (e) { /* ignore parse error */ }
            }

            throw new Error(String(errorMessage));
        }

        return result;
    },

};
