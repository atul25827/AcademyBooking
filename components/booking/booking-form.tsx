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

    const handleAddSession = () => {
        if (
            currentSession.trainingHall &&
            currentSession.bookingType &&
            sessionDate &&
            currentSession.startTime &&
            currentSession.endTime
        ) {
            const newSession: Session = {
                id: Math.random().toString(36).substr(2, 9),
                trainingHall: currentSession.trainingHall,
                bookingType: currentSession.bookingType,
                eventDate: sessionDate,
                startTime: currentSession.startTime!,
                endTime: currentSession.endTime!,
            };
            setSessions([...sessions, newSession]);
            // Reset current session inputs except date maybe? Or clear all.
            setCurrentSession({
                trainingHall: "",
                bookingType: "",
                startTime: "",
                endTime: "",
            });
            setSessionDate(undefined);
        }
    };

    const handleDeleteSession = (id: string) => {
        setSessions(sessions.filter((s) => s.id !== id));
    };

    return (
        <div className="space-y-8">
            {/* Hall Booking Information */}
            <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-semibold text-primary">Hall Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="px-0 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Academy</Label>
                            <Select
                                value={hallInfo.academy}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, academy: val })}
                            >
                                {/* Assuming academyId is pre-selected, effectively read-only or selectable if passed usually */}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={academyId}>Current Academy</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                value={hallInfo.fullName}
                                onChange={(e) => setHallInfo({ ...hallInfo, fullName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Contact Number</Label>
                            <Input
                                value={hallInfo.contactNumber}
                                onChange={(e) => setHallInfo({ ...hallInfo, contactNumber: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Merilian Code</Label>
                            <Select
                                value={hallInfo.merilianCode}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, merilianCode: val })}
                            >
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="code1">Code 1</SelectItem>
                                    <SelectItem value="code2">Code 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Attendees Vertical</Label>
                            <Select
                                value={hallInfo.attendeesVertical}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, attendeesVertical: val })}
                            >
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="v1">Vertical 1</SelectItem>
                                    <SelectItem value="v2">Vertical 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Attendees Department</Label>
                            <Select
                                value={hallInfo.attendeesDepartment}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, attendeesDepartment: val })}
                            >
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="d1">Dept 1</SelectItem>
                                    <SelectItem value="d2">Dept 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Training/Event Title</Label>
                            <Select
                                value={hallInfo.trainingTitle}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, trainingTitle: val })}
                            >
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="t1">Title 1</SelectItem>
                                    <SelectItem value="t2">Title 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Brief Description/Purpose</Label>
                            <Input
                                value={hallInfo.description}
                                onChange={(e) => setHallInfo({ ...hallInfo, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select
                                value={hallInfo.department}
                                onValueChange={(val) => setHallInfo({ ...hallInfo, department: val })}
                            >
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dept1">Dept 1</SelectItem>
                                    <SelectItem value="dept2">Dept 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 flex flex-col">
                            <Label>Event Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Label>Event End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Day wise Plan */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Day wise Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Training Hall</Label>
                        <Select
                            value={currentSession.trainingHall}
                            onValueChange={(val) => setCurrentSession({ ...currentSession, trainingHall: val })}
                        >
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lister-hall">Lister Hall</SelectItem>
                                <SelectItem value="hall-2">Hall 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Booking Type</Label>
                        <Select
                            value={currentSession.bookingType}
                            onValueChange={(val) => setCurrentSession({ ...currentSession, bookingType: val })}
                        >
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vapi-academy">Vapi Academy</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label>Event Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !sessionDate && "text-muted-foreground"
                                    )}
                                >
                                    {sessionDate ? format(sessionDate, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={sessionDate}
                                    onSelect={setSessionDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                        <Label>Event Start Time</Label>
                        {/* Using text input for time for simplicity, ideally a TimePicker */}
                        <Input
                            type="time"
                            value={currentSession.startTime}
                            onChange={(e) => setCurrentSession({ ...currentSession, startTime: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Event End Time</Label>
                        <Input
                            type="time"
                            value={currentSession.endTime}
                            onChange={(e) => setCurrentSession({ ...currentSession, endTime: e.target.value })}
                        />
                    </div>
                    <Button onClick={handleAddSession} className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto">
                        Add
                    </Button>
                </div>
            </div>

            {/* Event Planning Table */}
            {sessions.length > 0 && (
                <div className="rounded-md border">
                    <div className="bg-muted/50 p-4">
                        <h4 className="font-semibold mb-4">Event Planning</h4>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Training Hall</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Booking Type</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Event Date</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Start Time</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">End Time</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {sessions.map((session) => (
                                        <tr key={session.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">{session.trainingHall}</td>
                                            <td className="p-4 align-middle">{session.bookingType}</td>
                                            <td className="p-4 align-middle">{session.eventDate ? format(session.eventDate, "dd-MM-yyyy") : "-"}</td>
                                            <td className="p-4 align-middle">{session.startTime}</td>
                                            <td className="p-4 align-middle">{session.endTime}</td>
                                            <td className="p-4 align-middle">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteSession(session.id)}
                                                    className="h-8 w-8 text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
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
                <h3 className="text-xl font-semibold">Participants Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Number of Participants</Label>
                        <Input
                            value={participantsInfo.numberOfParticipants}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, numberOfParticipants: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>IT Requirements</Label>
                        <Select
                            value={participantsInfo.itRequirements}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, itRequirements: val })}
                        >
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="req1">Requirement 1</SelectItem>
                                <SelectItem value="req2">Requirement 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Specific Requirements, If any</Label>
                        <Select
                            value={participantsInfo.specificRequirements}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, specificRequirements: val })}
                        >
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spec1">Specific 1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={participantsInfo.email}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>MATS Event</Label>
                        <Select
                            value={participantsInfo.matsEvent}
                            onValueChange={(val) => setParticipantsInfo({ ...participantsInfo, matsEvent: val })}
                        >
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>MATS Request No</Label>
                        <Input
                            value={participantsInfo.matsRequestNo}
                            onChange={(e) => setParticipantsInfo({ ...participantsInfo, matsRequestNo: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button variant="outline" size="lg">Back</Button>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">Submit</Button>
            </div>
        </div>
    );
}
