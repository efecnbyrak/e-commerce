"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { Users, ShoppingBag, LayoutDashboard, Settings, LogOut, Menu, X, Package, ListTree, User, Bell, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

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
        <div className="min-h-screen bg-[#09090b] flex flex-col md:flex-row font-sans text-zinc-400">
            {/* Mobile Header */}
            <div className="md:hidden bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-50 h-20 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">{siteConfig.name}</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-white/5 border border-white/5 text-zinc-400 hover:text-white rounded-2xl transition-all active:scale-95"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Admin Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-zinc-950/80 backdrop-blur-3xl border-r border-white/5
                transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                md:translate-x-0 md:block 
                ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full md:opacity-100'}
            `}>
                <div className="flex flex-col h-full p-8">
                    {/* Desktop Logo */}
                    <Link href="/admin" className="hidden md:flex items-center gap-4 mb-14 group">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-[10deg] transition-all duration-500">
                            <Package className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl tracking-tighter text-white leading-none">{siteConfig.name}</span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mt-1">Admin Panel</span>
                        </div>
                    </Link>

                    <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                        <div className="pb-6 px-2">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">ANA MENÜ</span>
                        </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                prefetch={false}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 group relative overflow-hidden ${isActive(item.href)
                                    ? "bg-primary text-white shadow-2xl shadow-primary/30"
                                    : "hover:bg-white/5 text-zinc-500 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-transform duration-500 ${isActive(item.href) ? "text-white scale-110" : "text-zinc-600 group-hover:text-white group-hover:scale-110"}`} />
                                <span className="text-[13px] tracking-tight">{item.title}</span>
                                {isActive(item.href) && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white/20 rounded-l-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8">
                        <div className="group relative bg-[#121214] border border-white/5 p-4 rounded-3xl mb-8 flex items-center gap-4 hover:border-primary/30 transition-all duration-500 cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 ring-4 ring-black">
                                {imageUrl ? <Image src={imageUrl} alt="Profile" width={48} height={48} className="object-cover" /> : <User className="w-6 h-6 text-zinc-500" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate text-white">Phy Berk</span>
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.1em]">{role || "Yönetici"}</span>
                            </div>
                        </div>
                        <form action={logout}>
                            <button
                                className="w-full flex items-center justify-center gap-3 px-6 h-14 rounded-2xl bg-danger/10 hover:bg-danger text-danger hover:text-white font-bold transition-all duration-300 group shadow-lg shadow-danger/5"
                            >
                                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm">Güvenli Çıkış</span>
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-md transition-all duration-500" onClick={() => setIsOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 md:pl-80 min-h-screen flex flex-col relative min-w-0">
                {/* Content Header */}
                <header className="h-24 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl sticky top-0 z-30 px-10 flex items-center justify-between hidden md:flex">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                        <Link href="/admin" className="hover:text-primary transition-colors">YÖNETİM</Link>
                        <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                        <span className="text-white">{navItems.find(i => isActive(i.href))?.title || "GENEL BAKIŞ"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 mr-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">Sistem Aktif</span>
                        </div>
                        <Button variant="ghost" size="md" className="relative p-3 h-12 w-12 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                            <Bell className="w-5 h-5 text-zinc-400" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-[#09090b]" />
                        </Button>
                    </div>
                </header>

                <div className="flex-1 p-10 lg:p-14 w-full max-w-[1600px] mx-auto bg-[#09090b] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {children}
                </div>

                {/* Dashboard Footer */}
                <footer className="py-12 px-10 border-t border-white/5 text-center bg-zinc-950/40">
                    <p className="font-bold uppercase tracking-[0.4em] text-[10px] text-zinc-700">
                        © 2026 {siteConfig.name} CORE v4.2 - PROFESSIONAL E-COMMERCE ENGINE
                    </p>
                </footer>
            </main>
        </div>
    );
}
