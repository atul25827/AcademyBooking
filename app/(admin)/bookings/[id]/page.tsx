import { apiServer } from "@/lib/api-server";
import { BookingDetailsView } from "@/components/booking/booking-details-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch booking details on server side with cookies
    const booking = await apiServer.getBookingDetails(id);

    if (!booking) {
        return (
            <div className="container mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold text-slate-800">Booking Not Found</h1>
                <Link href="/my-bookings">
                    <Button className="mt-4" variant="outline">
                        Go Back
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <BookingDetailsView
            booking={booking}
        />
    );
}


// const ActionButtons = (
//     <>
//         {booking.status === 'pending' && (
//             <>
//                 <Button
//                     onClick={() => handleAction('approved')}
//                     className="bg-[#D1FADF] hover:bg-[#A6F4C5] text-[#027A48] border border-[#027A48]/20 gap-2 font-medium"
//                 >
//                     <Check className="h-4 w-4" />
//                     Approve
//                 </Button>
//                 <Button
//                     onClick={() => handleAction('rejected')}
//                     className="bg-[#FEE4E2] hover:bg-[#FECDCA] text-[#B42318] border border-[#B42318]/20 gap-2 font-medium ml-2"
//                 >
//                     <X className="h-4 w-4" />
//                     Reject
//                 </Button>
//             </>
//         )}
//     </>
// );
