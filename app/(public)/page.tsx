"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Trophy, Calendar, Users } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import { HeroIllustration } from "@/components/hero-illustration";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { VideoSection } from "@/components/home/video-section";
import { AcademyLocations } from "@/components/home/academy-locations";

// Dynamic import for client-side list
const AcademyList = dynamic(() => import("@/components/academy/academy-list"), {
    ssr: false,
    loading: () => <AcademyListSkeleton />,
});

function AcademyListSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[300px] rounded-2xl bg-muted/20 animate-pulse ring-1 ring-border/5" />
            ))}
        </div>
    )
}

export default function Home() {
    const { user, isAuthenticated } = useAuth();

    return (
        <div
            className="flex flex-col gap-0 pb-12 overflow-x-hidden min-h-screen"
        >
            {/* Hero Section */}
            <section className="relative pt-12 pb-10 md:pt-20 md:pb-16 overflow-hidden">
                {/* Gradient Background removed to use page background */}


                <div className="container px-4 md:px-8 relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <div className="flex-1 flex flex-col items-start text-left space-y-6 md:space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] text-black font-poppins"
                        >
                            Event Experiences <br /> That Stay With You
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="max-w-[550px] text-lg md:text-xl text-slate-700 leading-relaxed font-inter"
                        >
                            Discover inspiring venues and curated details that make meetings memorable—plan your next event at our Meril Academy.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
                            {/* Reusing existing search/CTA logic but styling it to match if needed. 
                                Figma shows a simple 'Label' button, retaining functional Search/CTA flow for better UX */}
                            {/* <div className="relative flex-1 group">
                                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search football, tennis..."
                                    className="relative flex h-12 w-full rounded-full border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:border-purple-500 shadow-sm transition-all"
                                />
                            </div> */}
                            {isAuthenticated ? (
                                <Link href="/book">
                                    <Button size="lg" className="w-full sm:w-auto h-12 rounded-full bg-[#7D3FD0] hover:bg-[#7D3FD0] text-white px-8 font-medium">Book Now</Button>
                                </Link>
                            ) : (
                                <Link href="/book">
                                    <Button size="lg" className="w-full sm:w-auto h-12 rounded-full bg-[#1D2939] hover:bg-slate-800 text-white px-8 font-medium">Explore</Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right: Illustration from Figma (Assets) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:flex flex-1 w-full max-w-[600px] relative pointer-events-none justify-end"
                    >
                        <HeroIllustration />
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <UpcomingEvents />

            {/* Video Highlight Section */}
            <VideoSection />

            {/* Meril Academy Locations (Carousel) */}
            <AcademyLocations />

        </div>
    );
}
