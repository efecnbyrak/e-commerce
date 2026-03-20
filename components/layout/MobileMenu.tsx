"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, User, Search, Package, ChevronRight, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { logout } from "@/app/actions/auth";

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface MobileMenuProps {
    categories: Category[];
    session: any;
}

export function MobileMenu({ categories, session }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
                aria-label="Menüyü Aç"
            >
                <Menu className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] md:hidden">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white dark:bg-zinc-950 shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="h-20 px-6 flex items-center justify-between border-b border-border-subtle">
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold text-lg tracking-tight text-foreground">{siteConfig.name}</span>
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-10">
                                {/* Search in Mobile Menu */}
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Arama Yap</span>
                                    <Link href="/products" className="block">
                                        <div className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-muted-foreground">
                                            <Search className="w-4 h-4" />
                                            <span className="text-sm font-medium">Ürün ara...</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Main Navigation */}
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Menü</span>
                                    <nav className="grid gap-2">
                                        <Link href="/products" className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                            <span className="font-bold text-foreground">Tüm Ürünler</span>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                        <Link href="/categories" className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                            <span className="font-bold text-foreground">Kategoriler</span>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                        <Link href="/info/hakkimizda" className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                            <span className="font-bold text-foreground">Hakkımızda</span>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                        <Link href="/info/iletisim" className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                            <span className="font-bold text-foreground">İletişim</span>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </Link>
                                    </nav>
                                </div>

                                {/* Categories */}
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Koleksiyonlar</span>
                                    <div className="grid grid-cols-1 gap-2">
                                        {categories.slice(0, 5).map((category) => (
                                            <Link 
                                                key={category.id} 
                                                href={`/products?category=${category.slug}`}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 group transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                                                    🏷️
                                                </div>
                                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{category.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Account */}
                            <div className="p-6 border-t border-border-subtle bg-zinc-50 dark:bg-zinc-900/50">
                                {session ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 px-2">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground">{(session as any).firstName || 'Hesabım'}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{session.role}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link href="/profile" className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border-subtle text-xs font-bold text-foreground justify-center">
                                                <User className="w-3.5 h-3.5" /> Profil
                                            </Link>
                                            <Link href="/orders" className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border-subtle text-xs font-bold text-foreground justify-center">
                                                <ShoppingBag className="w-3.5 h-3.5" /> Siparişler
                                            </Link>
                                            {session.role === 'ADMIN' && (
                                                <Link href="/admin" className="col-span-2 flex items-center gap-2 p-3 bg-primary text-white rounded-xl text-xs font-bold justify-center">
                                                    <LayoutDashboard className="w-3.5 h-3.5" /> Yönetim Paneli
                                                </Link>
                                            )}
                                        </div>
                                        <form action={logout}>
                                            <button className="w-full flex items-center justify-center gap-2 p-4 text-danger font-bold text-sm bg-danger/5 rounded-2xl hover:bg-danger hover:text-white transition-all">
                                                <LogOut className="w-4 h-4" /> Çıkış Yap
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        <Link href="/login">
                                            <Button className="w-full h-14 rounded-2xl font-bold">Giriş Yap</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-border-subtle">Kayıt Ol</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
