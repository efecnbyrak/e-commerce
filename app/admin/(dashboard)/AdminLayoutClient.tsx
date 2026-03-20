"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { Users, ShoppingBag, LayoutDashboard, Settings, LogOut, Menu, X, Package, ListTree, User, Bell } from "lucide-react";
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
        <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
            {/* Mobile Header */}
            <div className="md:hidden bg-zinc-900 text-white border-b border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-50 h-20 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">{siteConfig.name}</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Admin Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-zinc-950 text-white 
                transform transition-transform duration-300 ease-in-out 
                md:translate-x-0 md:block shadow-2xl md:shadow-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-8">
                    {/* Desktop Logo */}
                    <div className="hidden md:flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-white">{siteConfig.name}</span>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
                        <div className="pb-4 px-2">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Yönetim Paneli</span>
                        </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                prefetch={false}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 group ${isActive(item.href)
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "hover:bg-zinc-900 text-zinc-400 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? "text-white" : "text-zinc-500 group-hover:text-white"}`} />
                                <span className="text-sm">{item.title}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-zinc-900">
                        <div className="flex items-center gap-4 px-4 py-4 mb-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-zinc-700">
                                {imageUrl ? <Image src={imageUrl} alt="Profile" width={40} height={40} className="object-cover" /> : <User className="w-5 h-5 text-zinc-400" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate text-white">Admin</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{role}</span>
                            </div>
                        </div>
                        <button
                            onClick={async () => await logout()}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-danger/10 text-danger font-bold transition-all group"
                        >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Çıkış Yap</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 md:pl-80 min-h-screen flex flex-col relative min-w-0">
                {/* Content Header (Optional, for Breadcrumbs/Actions) */}
                <div className="h-20 border-b border-border-subtle bg-white/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between hidden md:flex">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-foreground font-bold">{navItems.find(i => isActive(i.href))?.title || "Genel Bakış"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="md" className="relative p-2 h-10 w-10">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-8 lg:p-12 w-full max-w-[1600px] mx-auto transition-all duration-500">
                    {children}
                </div>

                {/* Dashboard Footer */}
                <footer className="p-12 border-t border-border-subtle text-center text-muted-foreground text-xs mt-auto">
                    <p className="font-bold uppercase tracking-widest opacity-40">
                        © 2026 {siteConfig.name} - Tüm Hakları Saklıdır
                    </p>
                </footer>
            </main>
        </div>
    );
}
