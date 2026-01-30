import { Academy, Hall, Booking } from "@/types";

export const MOCK_ACADEMIES: Academy[] = [
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

export const MOCK_HALLS: Hall[] = [
    { id: "h1", name: "Main Pitch", academyId: "ac1" },
    { id: "h2", name: "Training Ground", academyId: "ac1" },
    { id: "h3", name: "Court A", academyId: "ac2" },
    { id: "h4", name: "Center Court", academyId: "ac2" },
    { id: "h5", name: "Indoor Arena", academyId: "ac3" },
];

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: "2025-001",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-12",
        timeSlot: "09:00 AM - 05:00 PM",
        status: "approved",
        organizer: "Deepak Mathur",
        fullName: "Deepak Mathur",
        department: "Cardiology",
        eventName: "EURO PCR 2025",
        contactNumber: "+91 98765 43210",
        merilianCode: "MC-2025-001",
        attendeesVertical: "Medical",
        attendeesDepartment: "Cardiology",
        trainingTitle: "EURO PCR 2025 Annual Conference",
        description: "Annual meeting of the European Association of Percutaneous Cardiovascular Interventions. Focus on latest innovations in interventional cardiology.",
        participantsCount: 150,
        email: "deepak.mathur@academy.com",
        matsEvent: "Yes",
        matsRequestNo: "MATS-8821",
        itRequirements: "Projector, Sound System, 2 Microphones",
        sessions: [
            { id: "s1", date: "2025-12-12", startTime: "09:00", endTime: "17:00", hallId: "h1", bookingType: "Conference" },
            { id: "s2", date: "2025-12-12", startTime: "09:00", endTime: "17:00", hallId: "h1", bookingType: "Conference" },
            { id: "s3", date: "2025-12-12", startTime: "09:00", endTime: "17:00", hallId: "h1", bookingType: "Conference" },
            { id: "s4", date: "2025-12-12", startTime: "09:00", endTime: "17:00", hallId: "h1", bookingType: "Conference" },
            { id: "s5", date: "2025-12-12", startTime: "09:00", endTime: "17:00", hallId: "h1", bookingType: "Conference" },
        ]
    },
    {
        id: "2025-002",
        academyId: "ac1",
        hallId: "h2",
        date: "2025-12-15",
        timeSlot: "10:00 AM - 02:00 PM",
        status: "upcoming",
        organizer: "Sarah Wilson",
        fullName: "Sarah Wilson",
        department: "Neurology",
        eventName: "Neurology Seminar",
        contactNumber: "+91 87654 32109",
        trainingTitle: "Advanced Neurology Workshop",
        description: "Workshop on advanced neurological procedures and case studies.",
        participantsCount: 45,
        email: "sarah.wilson@academy.com",
        sessions: [
            { id: "s2", date: "2025-12-15", startTime: "10:00", endTime: "14:00", hallId: "h2", bookingType: "Training" }
        ]
    },
    {
        id: "2025-003",
        academyId: "ac2",
        hallId: "h1",
        date: "2025-12-20",
        timeSlot: "09:00 AM - 04:00 PM",
        status: "completed",
        organizer: "James Miller",
        fullName: "James Miller",
        department: "General Surgery",
        eventName: "Surgical Basics",
        contactNumber: "+91 76543 21098",
        participantsCount: 20,
        email: "james.miller@academy.com",
        sessions: [
            { id: "s3", date: "2025-12-20", startTime: "09:00", endTime: "16:00", hallId: "h1", bookingType: "Training" }
        ]
    },
    {
        id: "2025-004",
        academyId: "ac1",
        hallId: "h3",
        date: "2025-12-22",
        timeSlot: "01:00 PM - 05:00 PM",
        status: "rejected",
        organizer: "Amit Patel",
        fullName: "Amit Patel",
        department: "Administration",
        eventName: "Staff Meeting",
        contactNumber: "+91 99887 76655",
        description: "Quarterly staff alignment meeting.",
        participantsCount: 100,
        email: "amit.patel@academy.com",
        sessions: [
            { id: "s4", date: "2025-12-22", startTime: "13:00", endTime: "17:00", hallId: "h3", bookingType: "Meeting" }
        ]
    },
    {
        id: "2025-005",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-28",
        timeSlot: "10:00 AM - 06:00 PM",
        status: "approved",
        organizer: "Priya Sharma",
        fullName: "Priya Sharma",
        department: "Research",
        eventName: "Research Symposium",
        contactNumber: "+91 88776 65544",
        trainingTitle: "Q4 Research Findings Presentation",
        description: "Presentation of Q4 research findings and planning for Q1 2026.",
        participantsCount: 60,
        email: "priya.sharma@academy.com",
        matsEvent: "No",
        sessions: [
            { id: "s5", date: "2025-12-28", startTime: "10:00", endTime: "18:00", hallId: "h1", bookingType: "Symposium" }
        ]
    },

    {
        id: "2025-006",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-28",
        timeSlot: "10:00 AM - 06:00 PM",
        status: "approved",
        organizer: "Priya Sharma",
        fullName: "Priya Sharma",
        department: "Research",
        eventName: "Research Symposium",
        contactNumber: "+91 88776 65544",
        trainingTitle: "Q4 Research Findings Presentation",
        description: "Presentation of Q4 research findings and planning for Q1 2026.",
        participantsCount: 60,
        email: "priya.sharma@academy.com",
        matsEvent: "No",
        sessions: [
            { id: "s5", date: "2025-12-28", startTime: "10:00", endTime: "18:00", hallId: "h1", bookingType: "Symposium" }
        ]
    },
    {
        id: "2025-007",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-28",
        timeSlot: "10:00 AM - 06:00 PM",
        status: "approved",
        organizer: "Priya Sharma",
        fullName: "Priya Sharma",
        department: "Research",
        eventName: "Research Symposium",
        contactNumber: "+91 88776 65544",
        trainingTitle: "Q4 Research Findings Presentation",
        description: "Presentation of Q4 research findings and planning for Q1 2026.",
        participantsCount: 60,
        email: "priya.sharma@academy.com",
        matsEvent: "No",
        sessions: [
            { id: "s5", date: "2025-12-28", startTime: "10:00", endTime: "18:00", hallId: "h1", bookingType: "Symposium" }
        ]
    },
    {
        id: "2025-008",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-28",
        timeSlot: "10:00 AM - 06:00 PM",
        status: "approved",
        organizer: "Priya Sharma",
        fullName: "Priya Sharma",
        department: "Research",
        eventName: "Research Symposium",
        contactNumber: "+91 88776 65544",
        trainingTitle: "Q4 Research Findings Presentation",
        description: "Presentation of Q4 research findings and planning for Q1 2026.",
        participantsCount: 60,
        email: "priya.sharma@academy.com",
        matsEvent: "No",
        sessions: [
            { id: "s5", date: "2025-12-28", startTime: "10:00", endTime: "18:00", hallId: "h1", bookingType: "Symposium" }
        ]
    },
    {
        id: "2025-009",
        academyId: "ac1",
        hallId: "h1",
        date: "2025-12-28",
        timeSlot: "10:00 AM - 06:00 PM",
        status: "approved",
        organizer: "Priya Sharma",
        fullName: "Priya Sharma",
        department: "Research",
        eventName: "Research Symposium",
        contactNumber: "+91 88776 65544",
        trainingTitle: "Q4 Research Findings Presentation",
        description: "Presentation of Q4 research findings and planning for Q1 2026.",
        participantsCount: 60,
        email: "priya.sharma@academy.com",
        matsEvent: "No",
        sessions: [
            { id: "s5", date: "2025-12-28", startTime: "10:00", endTime: "18:00", hallId: "h1", bookingType: "Symposium" }
        ]
    },
];
