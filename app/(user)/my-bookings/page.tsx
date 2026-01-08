"use client";

import { useEffect, useState } from "react";
import { type Booking, api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react"; // Using badge icon or text?
import { cn } from "@/lib/utils";

// Helper simple badge component since I didn't create it in UI yet
function StatusBadge({ status }: { status: string }) {
    const styles = {
        upcoming: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        completed: "bg-slate-500/10 text-slate-500 border-slate-500/20",
        cancelled: "bg-red-500/10 text-red-500 border-red-500/20"
    };
    const style = styles[status as keyof typeof styles] || styles.completed;

    return (
        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", style)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        api.listBookings().then(setBookings);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                <p className="text-muted-foreground">History of your academy reservations.</p>
            </div>

            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <p className="text-muted-foreground">No bookings found.</p>
                ) : (
                    bookings.map(booking => (
                        <Card key={booking.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 border-border/40 hover:bg-muted/5 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{booking.academyId === "ac1" ? "Elite Football Academy" : "Pro Tennis Center"}</h3>
                                    <StatusBadge status={booking.status} />
                                </div>
                                <p className="text-sm text-muted-foreground">{booking.date} · {booking.timeSlot}</p>
                            </div>
                            <div className="text-sm text-right">
                                <p className="font-medium">Paid via UPI</p>
                                <p className="text-xs text-muted-foreground">Booking ID: #{booking.id.toUpperCase()}</p>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
