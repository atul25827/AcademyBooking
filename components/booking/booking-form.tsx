"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronsUpDown, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BookingFormProps {
    academyId: string;
}

interface Session {
    id: string;
    trainingHall: string;
    bookingType: string;
    eventDate: Date | undefined;
    startTime: string;
    endTime: string;
}

export function BookingForm({ academyId }: BookingFormProps) {
    // Hall Booking Info State
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
    const [hallInfo, setHallInfo] = React.useState({
        academy: academyId,
        fullName: "",
        contactNumber: "",
        merilianCode: "",
        attendeesVertical: "",
        attendeesDepartment: "",
        trainingTitle: "",
        description: "",
        department: "",
    });

    // Day Wise Plan State
    const [currentSession, setCurrentSession] = React.useState<Partial<Session>>({
        trainingHall: "",
        bookingType: "",
        startTime: "",
        endTime: "",
    });
    const [sessionDate, setSessionDate] = React.useState<Date>();
    const [sessions, setSessions] = React.useState<Session[]>([]);

    // Participants Form State
    const [participantsInfo, setParticipantsInfo] = React.useState({
        numberOfParticipants: "",
        itRequirements: "",
        specificRequirements: "",
        email: "",
        matsEvent: "",
        matsRequestNo: "",
    });

    // Validation State
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    // Validation Configuration
    const hallInfoRules = {
        academy: { label: "Academy", required: true },
        fullName: { label: "Full Name", required: true },
        contactNumber: { label: "Contact Number", required: true },
        merilianCode: { label: "Merilian Code", required: true },
        attendeesVertical: { label: "Attendees Vertical", required: true },
        attendeesDepartment: { label: "Attendees Department", required: true },
        trainingTitle: { label: "Training Title", required: true },
        description: { label: "Description", required: true },
        department: { label: "Department", required: true },
    };

    const sessionRules = {
        trainingHall: { label: "Training Hall", required: true },
        bookingType: { label: "Booking Type", required: true },
        startTime: { label: "Start Time", required: true },
        endTime: { label: "End Time", required: true },
    };

    const participantsInfoRules = {
        numberOfParticipants: { label: "Number of Participants", required: true },
        itRequirements: { label: "IT Requirements", required: true },
        specificRequirements: { label: "Specific Requirements", required: false }, // Example optional
        email: { label: "Email", required: true, email: true },
        matsEvent: { label: "MATS Event", required: true },
        matsRequestNo: { label: "MATS Request No", required: true },
    };

    // Generic Validation Helper
    const validateValues = (values: any, rules: Record<string, any>, prefix: string = "") => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        Object.keys(rules).forEach((field) => {
            const rule = rules[field];
            const value = values[field];
            const errorKey = prefix ? `${prefix}.${field}` : field;

            if (rule.required && (!value || value.toString().trim() === "")) {
                newErrors[errorKey] = `${rule.label} is required`;
                isValid = false;
            } else if (rule.email && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors[errorKey] = "Invalid email address";
                    isValid = false;
                }
            }
        });

        return { isValid, errors: newErrors };
    };

    const handleAddSession = () => {
        const sessionPayload = {
            ...currentSession,
            eventDate: sessionDate, // Validate date separately if needed or add to rules
        };

        const { isValid, errors: sessionErrors } = validateValues(sessionPayload, sessionRules, "session");

        // Manual check for Date
        let dateError = {};
        if (!sessionDate) {
            dateError = { "session.eventDate": "Event Date is required" };
        }

        if (isValid && sessionDate) {
            const newSession: Session = {
                id: Math.random().toString(36).substr(2, 9),
                trainingHall: currentSession.trainingHall!,
                bookingType: currentSession.bookingType!,
                eventDate: sessionDate,
                startTime: currentSession.startTime!,
                endTime: currentSession.endTime!,
            };
            setSessions([...sessions, newSession]);

            // Reset current session
            setCurrentSession({
                trainingHall: "",
                bookingType: "",
                startTime: "",
                endTime: "",
            });
            setSessionDate(undefined);

            // Clear session errors
            const remainingErrors = { ...errors };
            Object.keys(sessionRules).forEach(key => delete remainingErrors[`session.${key}`]);
            delete remainingErrors["session.eventDate"];
            setErrors(remainingErrors);
        } else {
            setErrors(prev => ({ ...prev, ...sessionErrors, ...dateError }));
        }
    };

    const handleDeleteSession = (id: string) => {
        setSessions(sessions.filter((s) => s.id !== id));
    };

    const handleSubmit = () => {
        // Validate Hall Info
        const { isValid: isHallValid, errors: hallErrors } = validateValues(hallInfo, hallInfoRules, "hall");

        // Validate Dates (Manual)
        const dateErrors: Record<string, string> = {};
        if (!startDate) dateErrors["hall.startDate"] = "Start Date is required";
        if (!endDate) dateErrors["hall.endDate"] = "End Date is required";

        // Validate Participants Info
        const { isValid: isParticipantsValid, errors: participantsErrors } = validateValues(participantsInfo, participantsInfoRules, "participants");

        // Validate Sessions (Must have at least one)
        const sessionListErrors: Record<string, string> = {};
        if (sessions.length === 0) {
            sessionListErrors["global.sessions"] = "Please add at least one session plan.";
        }

        const allErrors = { ...hallErrors, ...dateErrors, ...participantsErrors, ...sessionListErrors };

        if (isHallValid && isParticipantsValid && sessions.length > 0 && startDate && endDate) {
            console.log("Form Submitted Successfully", { hallInfo, sessions, participantsInfo, startDate, endDate });
            alert("Booking Submitted Successfully!");
            setErrors({});
            // Proceed with API call here
        } else {
            setErrors(allErrors);
            // Optional: Scroll to top or first error
        }
    };

    // Helper for rendering form fields with error handling
    const renderError = (key: string) => {
        return errors[key] ? <p className="text-red-500 text-xs mt-1">{errors[key]}</p> : null;
    };

    const renderLabel = (label: string, required: boolean = true) => (
        <Label className="text-[#767676] text-[20px] font-normal">
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
    );

    return (
        <div className="space-y-8">
            {/* Hall Booking Information */}
            <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-[20px] font-normal text-[#271E4A] font-poppins ">Hall Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="px-0 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Academy")}
                            <Select
                                value={hallInfo.academy}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, academy: val })}
                            >
                                <SelectTrigger className="">
                                    <SelectValue className="" placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={academyId}>Current Academy</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.academy")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Full Name")}
                            <Input
                                value={hallInfo.fullName}
                                onChange={(e) => setHallInfo({ ...hallInfo, fullName: e.target.value })}
                            />
                            {renderError("hall.fullName")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Contact Number")}
                            <Input
                                value={hallInfo.contactNumber}
                                onChange={(e) => setHallInfo({ ...hallInfo, contactNumber: e.target.value })}
                            />
                            {renderError("hall.contactNumber")}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Merilian Code")}
                            <Select
                                value={hallInfo.merilianCode}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, merilianCode: val })}
                            >
                                <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="code1">Code 1</SelectItem>
                                    <SelectItem value="code2">Code 2</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.merilianCode")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Attendees Vertical")}
                            <Select
                                value={hallInfo.attendeesVertical}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, attendeesVertical: val })}
                            >
                                <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="v1">Vertical 1</SelectItem>
                                    <SelectItem value="v2">Vertical 2</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.attendeesVertical")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Attendees Department")}
                            <Select
                                value={hallInfo.attendeesDepartment}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, attendeesDepartment: val })}
                            >
                                <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="d1">Dept 1</SelectItem>
                                    <SelectItem value="d2">Dept 2</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.attendeesDepartment")}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Training/Event Title")}
                            <Select
                                value={hallInfo.trainingTitle}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, trainingTitle: val })}
                            >
                                <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="t1">Title 1</SelectItem>
                                    <SelectItem value="t2">Title 2</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.trainingTitle")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Brief Description/Purpose")}
                            <Input
                                value={hallInfo.description}
                                onChange={(e) => setHallInfo({ ...hallInfo, description: e.target.value })}
                            />
                            {renderError("hall.description")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Department")}
                            <Select
                                value={hallInfo.department}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, department: val })}
                            >
                                <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dept1">Dept 1</SelectItem>
                                    <SelectItem value="dept2">Dept 2</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("hall.department")}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Event Start Date")}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal bg-background rounded-[6px]",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white border-[#BEBEBE]" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {renderError("hall.startDate")}
                        </div>
                        <div className="space-y-2 flex flex-col">
                            {renderLabel("Event End Date")}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal bg-background rounded-[6px]",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white border-[#BEBEBE]" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {renderError("hall.endDate")}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Day wise Plan */}
            <div className="space-y-4">
                <h3 className="text-[20px] font-normal text-[#271E4A] font-poppins ">Day wise Plan</h3>
                {renderError("global.sessions")}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Training Hall")}
                        <Select
                            value={currentSession.trainingHall}
                            onValueChange={(val) => setCurrentSession({ ...currentSession, trainingHall: val })}
                        >
                            <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lister-hall">Lister Hall</SelectItem>
                                <SelectItem value="hall-2">Hall 2</SelectItem>
                            </SelectContent>
                        </Select>
                        {renderError("session.trainingHall")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Booking Type")}
                        <Select
                            value={currentSession.bookingType}
                            onValueChange={(val) => setCurrentSession({ ...currentSession, bookingType: val })}
                        >
                            <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vapi-academy">Vapi Academy</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                        </Select>
                        {renderError("session.bookingType")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Event Date")}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal bg-background rounded-[6px]",
                                        !sessionDate && "text-muted-foreground"
                                    )}
                                >
                                    {sessionDate ? format(sessionDate, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white border-[#BEBEBE]" align="start">
                                <Calendar
                                    mode="single"
                                    selected={sessionDate}
                                    onSelect={setSessionDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {renderError("session.eventDate")}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Event Start Time")}
                        {/* Using text input for time for simplicity, ideally a TimePicker */}
                        <Input
                            type="time"
                            value={currentSession.startTime}
                            onChange={(e) => setCurrentSession({ ...currentSession, startTime: e.target.value })}
                        />
                        {renderError("session.startTime")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Event End Time")}
                        <Input
                            type="time"
                            value={currentSession.endTime}
                            onChange={(e) => setCurrentSession({ ...currentSession, endTime: e.target.value })}
                        />
                        {renderError("session.endTime")}
                    </div>
                    <Button onClick={handleAddSession} className="bg-[#7D3FD0] hover:bg-[#7D3FD0] text-white w-fit md:text-[20px] sm:[16px] cursor-pointer">
                        Add
                    </Button>
                </div>
            </div>

            {/* Event Planning Table */}
            {sessions.length > 0 && (
                <div className="rounded-[24px] shadow-[0_4px_15px_0_rgba(216,210,252,0.64)]">
                    <div className="bg-muted/50 p-4">
                        <h4 className="text-[20px] font-normal text-[#271E4A] font-poppins py-1">Event Planning</h4>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="bg-[#EDF4FC] ">
                                    <tr className="transition-colors font-normal hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground rounded-l-[12px]">Training Hall</th>
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground">Booking Type</th>
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground">Event Date</th>
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground">Start Time</th>
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground">End Time</th>
                                        <th className="h-12 px-2 align-middle font-normal text-muted-foreground rounded-r-[12px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {sessions.map((session) => (
                                        <tr key={session.id} className="border-b border-[#BEBEBE] transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-2 align-middle">{session.trainingHall}</td>
                                            <td className="p-2 align-middle">{session.bookingType}</td>
                                            <td className="p-2 align-middle">{session.eventDate ? format(session.eventDate, "dd-MM-yyyy") : "-"}</td>
                                            <td className="p-2 align-middle">{session.startTime}</td>
                                            <td className="p-2 align-middle">{session.endTime}</td>
                                            <td className="p-2 align-middle">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteSession(session.id)}
                                                    className="h-8 w-8 text-destructive cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Participants Form */}
            <div className="space-y-6">
                <h3 className="text-[20px] font-normal text-[#271E4A] font-poppins">Participants Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Number of Participants")}
                        <Input
                            value={participantsInfo.numberOfParticipants}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, numberOfParticipants: e.target.value })}
                        />
                        {renderError("participants.numberOfParticipants")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("IT Requirements")}
                        <Select
                            value={participantsInfo.itRequirements}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, itRequirements: val })}
                        >
                            <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="req1">Requirement 1</SelectItem>
                                <SelectItem value="req2">Requirement 2</SelectItem>
                            </SelectContent>
                        </Select>
                        {renderError("participants.itRequirements")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Specific Requirements, If any", false)} {/* optional in logic? logic says required: false */}
                        <Select
                            value={participantsInfo.specificRequirements}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, specificRequirements: val })}
                        >
                            <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spec1">Specific 1</SelectItem>
                            </SelectContent>
                        </Select>
                        {renderError("participants.specificRequirements")}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("Email")}
                        <Input
                            type="email"
                            value={participantsInfo.email}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, email: e.target.value })}
                        />
                        {renderError("participants.email")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("MATS Event")}
                        <Select
                            value={participantsInfo.matsEvent}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, matsEvent: val })}
                        >
                            <SelectTrigger className="bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                        </Select>
                        {renderError("participants.matsEvent")}
                    </div>
                    <div className="space-y-2 flex flex-col">
                        {renderLabel("MATS Request No")}
                        <Input
                            value={participantsInfo.matsRequestNo}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, matsRequestNo: e.target.value })}
                        />
                        {renderError("participants.matsRequestNo")}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" size="lg" className="text-[20px]">Back</Button>
                <Button size="lg" className="bg-[#7D3FD0] hover:bg-[#7D3FD0] text-white text-[20px] cursor-pointer" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}
