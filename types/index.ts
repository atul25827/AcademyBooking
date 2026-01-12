export type Academy = {
    id: string;
    name: string;
    location: string;
    rating: number;
    pricePerSession: number;
    imageUrl: string;
    sports: string[];
};

export type Hall = {
    id: string;
    name: string;
    academyId: string;
};

export type Booking = {
    id: string;
    academyId: string;
    hallId?: string;
    date: string;
    timeSlot: string;
    status: "upcoming" | "completed" | "cancelled" | "approved" | "rejected" | "pending";
    organizer?: string;
    department?: string;
    eventName?: string;

    // Extended fields from Booking Form
    fullName?: string; // Contact Person Name
    contactNumber?: string;
    merilianCode?: string;
    attendeesVertical?: string;
    attendeesDepartment?: string;
    trainingTitle?: string;
    description?: string;
    participantsCount?: number;
    itRequirements?: string;
    specificRequirements?: string;
    email?: string;
    matsEvent?: string;
    matsRequestNo?: string;

    // Detailed Sessions
    sessions?: {
        id: string;
        date: string;
        startTime: string;
        endTime: string;
        hallId: string;
        bookingType?: string;
    }[];
};
