"use client";

import { MerilLogo } from "@/components/meril-logo";
import { useAuth } from "@/context/auth-context";
import { LogOut, LayoutDashboard, Settings, Menu } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { logout, user } = useAuth();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col fixed inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="bg-white rounded-md p-1">
                        <MerilLogo className="h-6 w-10" />
                    </div>
                    <span className="ml-3 font-semibold tracking-wide">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-slate-800 text-white">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6">
                        Settings
                    </div>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <Settings className="h-5 w-5" />
                        System
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-md transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 static lg:sticky lg:top-0 z-40">
                    <div className="lg:hidden">
                        <MerilLogo className="h-8 w-12" />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm text-slate-600">Welcome, <span className="font-semibold text-slate-900">{user?.name}</span></span>
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
