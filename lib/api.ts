export type Academy = {
    id: string;
    name: string;
    location: string;
    rating: number;
    pricePerSession: number;
    imageUrl: string;
    sports: string[];
};

export type Booking = {
    id: string;
    academyId: string;
    date: string;
    timeSlot: string;
    status: "upcoming" | "completed" | "cancelled";
};

// Mock data
const MOCK_ACADEMIES: Academy[] = [
    {
        id: "ac1",
        name: "Elite Football Academy",
        location: "Bangalore, India",
        rating: 4.8,
        pricePerSession: 799,
        imageUrl: "/takshila_hall.jpg",// Placeholder, using next defaults for now or I'll use placeholders
        sports: ["Football"],
    },
    {
        id: "ac2",
        name: "Pro Tennis Center",
        location: "Pune, India",
        rating: 4.6,
        pricePerSession: 699,
        imageUrl: "/takshila_hall.jpg",
        sports: ["Tennis"],
    },
    {
        id: "ac3",
        name: "All Star Multi Sports",
        location: "Mumbai, India",
        rating: 4.9,
        pricePerSession: 899,
        imageUrl: "/takshila_hall.jpg",
        sports: ["Cricket", "Football", "Basketball"],
    },
    {
        id: "ac4",
        name: "Elite Football Academy",
        location: "Bangalore, India",
        rating: 4.8,
        pricePerSession: 799,
        imageUrl: "/takshila_hall.jpg", // Placeholder, using next defaults for now or I'll use placeholders
        sports: ["Football"],
    },
    {
        id: "ac5",
        name: "Pro Tennis Center",
        location: "Pune, India",
        rating: 4.6,
        pricePerSession: 699,
        imageUrl: "/takshila_hall.jpg",
        sports: ["Tennis"],
    },
    {
        id: "ac6",
        name: "All Star Multi Sports",
        location: "Mumbai, India",
        rating: 4.9,
        pricePerSession: 899,
        imageUrl: "/takshila_hall.jpg",
        sports: ["Cricket", "Football", "Basketball"],
    },
];

const MOCK_BOOKINGS: Booking[] = [
    {
        id: "b1",
        academyId: "ac1",
        date: new Date().toISOString().slice(0, 10),
        timeSlot: "7:00 - 8:00 AM",
        status: "upcoming",
    },
    {
        id: "b2",
        academyId: "ac2",
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        timeSlot: "6:00 - 7:00 PM",
        status: "upcoming",
    },
];

export const api = {
    async listAcademies(): Promise<Academy[]> {
        await new Promise((r) => setTimeout(r, 400));
        return MOCK_ACADEMIES;
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
