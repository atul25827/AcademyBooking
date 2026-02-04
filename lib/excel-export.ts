import * as XLSX from "xlsx";
import { Booking } from "@/types";

export const exportToExcel = (data: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const formatBookingForExport = (booking: Booking) => {
    return {
        "Booking ID": booking.booking_id,
        "Academy": booking.academy || "N/A",
        "Full Name": booking.full_name || booking.fullName || "N/A",
        "Event Title": booking.event_title || booking.eventName || "N/A",
        "Start Date": booking.event_start_date,
        "End Date": booking.event_end_date,
        "Status": booking.event_status || "N/A",
        "Overall Status": booking.overall_status || "N/A",
    };
};
