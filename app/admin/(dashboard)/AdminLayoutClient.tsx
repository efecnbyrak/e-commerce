"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { Users, ShoppingBag, LayoutDashboard, Settings, LogOut, Menu, X, Package, ListTree, User, Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";

interface AdminLayoutClientProps {
    children: React.ReactNode;
    role?: string;
    imageUrl?: string | null;
}

export function AdminLayoutClient({ children, role, imageUrl }: AdminLayoutClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(path);
    };

    const navItems = [
        { title: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
        { title: "Ürünler", href: "/admin/products", icon: Package },
        { title: "Kategoriler", href: "/admin/categories", icon: ListTree },
        { title: "Siparişler", href: "/admin/orders", icon: ShoppingBag },
        { title: "Kullanıcılar", href: "/admin/users", icon: Users },
        { title: "Ayarlar", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-zinc-900 text-white border-b border-zinc-800 p-4 flex items-center justify-between sticky top-0 z-50 h-16 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">E</div>
                    <span className="font-bold text-lg tracking-tight">{siteConfig.name}</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Admin Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 text-white 
                transform transition-transform duration-300 ease-in-out 
                md:translate-x-0 md:block shadow-xl md:shadow-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Desktop Logo */}
                    <div className="hidden md:flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-blue-900/20">E</div>
                        <span className="font-bold text-2xl tracking-tight">{siteConfig.name}</span>
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 modern-scrollbar">
                        <div className="pb-2 px-2">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Yönetim</span>
                        </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                prefetch={false}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive(item.href)
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                                    : "hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive(item.href) ? "text-white" : "text-zinc-500"}`} />
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-zinc-800">
                        <div className="flex items-center gap-3 px-4 py-4 mb-4 rounded-xl bg-zinc-800/30">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                                {imageUrl ? <Image src={imageUrl} alt="Profile" width={40} height={40} /> : <User className="w-6 h-6 text-zinc-400" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-semibold truncate">Yönetici</span>
                                <span className="text-xs text-zinc-500 truncate">{role}</span>
                            </div>
                        </div>
                        <button
                            onClick={async () => await logout()}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 text-red-500 font-medium transition-all group"
                        >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 md:pl-72 min-h-screen flex flex-col relative min-w-0 overflow-x-hidden">
                <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 w-full max-w-[1600px] mx-auto transition-all duration-500 overflow-y-auto">
                    {children}
                </div>

                {/* Dashboard Footer */}
                <footer className="p-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 text-sm mt-auto">
                    <div className="flex items-center justify-center gap-4 italic font-medium opacity-60">
                        <span>© 2026 {siteConfig.name} - Tüm Hakları Saklıdır</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
