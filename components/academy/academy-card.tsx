"use client";

import Image from "next/image";
import Link from "next/link";
import { type Academy } from "@/types";
import { useAuth } from "@/context/auth-context";
import { Wifi, Monitor, Mic, Users } from "lucide-react";

export function AcademyCard({ academy }: { academy: Academy }) {
    const { isAuthenticated } = useAuth();

    return (
        <div className="relative w-full max-w-[380px] h-[300px] group mx-auto md:mx-0">
            {/* Main Card Container */}
            <div className="relative h-[280px] w-full rounded-[16px] overflow-hidden shadow-lg">
                <Image
                    src={academy.imageUrl}
                    alt={academy.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Title */}
                <div className="absolute top-6 left-6">
                    <h3 className="text-white font-poppins text-xl font-medium tracking-wide shadow-black/20 drop-shadow-md">
                        {academy.name}
                    </h3>
                </div>

                {/* Amenities / Stats Row (Mocked based on Figma design) */}
                <div className="absolute bottom-6 left-6 flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Wifi className="w-4 h-4 text-[#7D3FD0]" />
                        </div>
                        <span className="text-[10px] text-white font-medium">Wi-Fi</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Users className="w-4 h-4 text-[#7D3FD0]" />
                        </div>
                        <span className="text-[10px] text-white font-medium">20-23</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Monitor className="w-4 h-4 text-[#7D3FD0]" />
                        </div>
                        <span className="text-[10px] text-white font-medium">Yes</span>
                    </div>
                </div>
            </div>

            {/* Floating 'Book Now' Button (Overlapping bottom-right) */}
            <Link href={isAuthenticated ? `/book?academyId=${academy.id}` : "/login"}>
                <div className="absolute bottom-0 right-0 z-10">
                    <div className="bg-[#7D3FD0] hover:bg-[#6833ae] transition-colors w-[180px] h-[52px] rounded-tl-[24px] rounded-br-[24px] flex items-center justify-center shadow-lg cursor-pointer transform translate-y-2 translate-x-2 group-hover:translate-x-1 group-hover:translate-y-1 duration-300">
                        <span className="text-white font-poppins font-medium text-lg ">Book Now</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
