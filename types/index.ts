export type UserRole = string;

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    employeeCode?: string;
}

export interface Hall {
    id: string;
    name: string;
    academyId: string;
    capacity?: number;
    wifi?: number | boolean;
    screen?: number | boolean;
}

export interface Academy {
    id: string;
    name: string;
    location?: string;
    rating?: number;
    pricePerSession?: number;
    imageUrl?: string;
    sports?: string[];
    halls?: Hall[];
}

export interface Session {
    id: string;
    date: string | Date;
    startTime: string;
    endTime: string;
    hallId: string;
    bookingType: string;
    eventDate?: Date; // Added based on usage in booking-form
    trainingHall?: string; // Added based on usage in booking-form
}

export interface Booking {
    id: string;
    academyId: string;
    hallId: string;
    date: string;
    timeSlot: string;
    status: string;
    organizer: string;
    fullName: string;
    department: string;
    eventName: string;
    contactNumber: string;
    merilianCode?: string;
    attendeesVertical?: string;
    attendeesDepartment?: string;
    trainingTitle?: string;
    description?: string;
    participantsCount: number;
    email: string;
    matsEvent?: string;
    matsRequestNo?: string;
    itRequirements?: string;
    sessions?: Session[];
}

export interface Company {
    company_code: string;
    name: string;
}

export interface Department {
    name: string;
}

export interface BookingType {
    name: string;
}

export interface ITRequirement {
    name: string;
}

export interface MasterData {
    master_company: Company[];
    department_master: Department[];
    booking_type: BookingType[];
    it_requirements: ITRequirement[];
    [key: string]: any;
}
