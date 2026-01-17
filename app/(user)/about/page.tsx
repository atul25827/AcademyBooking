import { Badge, CheckCircle2, Clock, Eye, Globe, Lightbulb, ShieldCheck, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Hero Section */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-800 mb-2">
                    <Globe className="w-3 h-3 mr-2" />
                    Trusted by 50+ Academies
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    Empowering Event Management
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    We are streamlining academy bookings with efficiency, transparency, and cutting-edge technology.
                    Our platform connects organizers with world-class facilities seamlessly.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe className="w-32 h-32 text-blue-600" />
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        To provide a seamless, transparent, and efficient booking experience that empowers academies to maximize their potential and organizers to create impactful events without administrative hurdles.
                    </p>
                </div>

                <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Eye className="w-32 h-32 text-purple-600" />
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                        <Eye className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        To be the global standard for academy resource management, creating a connected ecosystem where every facility is utilized to its fullest potential for learning and collaboration.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Efficiency",
                            desc: "We optimize workflows to save your time.",
                            icon: Zap,
                            color: "text-amber-600",
                            bg: "bg-amber-100"
                        },
                        {
                            title: "Transparency",
                            desc: "Clear visibility into every booking status.",
                            icon: Eye,
                            color: "text-emerald-600",
                            bg: "bg-emerald-100"
                        },
                        {
                            title: "Reliability",
                            desc: "Consistent performance you can trust.",
                            icon: ShieldCheck,
                            color: "text-blue-600",
                            bg: "bg-blue-100"
                        },
                        {
                            title: "Innovation",
                            desc: "Continuously improving our platform.",
                            icon: Lightbulb,
                            color: "text-purple-600",
                            bg: "bg-purple-100"
                        }
                    ].map((val, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", val.bg, val.color)}>
                                <val.icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">{val.title}</h4>
                            <p className="text-sm text-slate-500">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 rounded-[32px] p-8 md:p-12 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 to-slate-900 z-0"></div>
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        <div className="text-4xl font-bold tracking-tight text-white/90">50+</div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Academies</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold tracking-tight text-white/90">10k+</div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Bookings</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold tracking-tight text-white/90">99%</div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Satisfaction</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold tracking-tight text-white/90">24/7</div>
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Support</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
