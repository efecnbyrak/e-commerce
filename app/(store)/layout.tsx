import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Package, ChevronDown, Heart, Bell, LayoutDashboard, LogOut } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { CartCount } from "@/components/cart/CartCount";
import { Button } from "@/components/ui/button";

import { logout } from "@/app/actions/auth";

import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/layout/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const dynamic = "force-dynamic";

interface StoreLayoutProps {
    children: React.ReactNode;
}

export default async function StoreLayout({ children }: StoreLayoutProps) {
    const session = await getSession().catch(() => null);
    let categories: any[] = [];
    try {
        categories = await (db as any).category.findMany({
            take: 8,
            orderBy: { name: 'asc' }
        });
    } catch (error) {
        console.error("Store Layout Categories Fetch Error:", error);
    }

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-border-subtle shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    {/* Top Row */}
                    <div className="h-20 flex items-center justify-between gap-4 md:gap-8">
                        {/* Mobile Menu Trigger - NEW */}
                        <div className="md:hidden">
                            <MobileMenu categories={categories} session={session} />
                        </div>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <span className="font-bold text-lg md:text-xl tracking-tight text-foreground">{siteConfig.name}</span>
                        </Link>

                        {/* Search Bar - Make it visible on md+ and special on mobile */}
                        <div className="hidden md:flex flex-1 max-w-2xl px-4">
                            <SearchBar />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 md:gap-2">
                            {session ? (
                                <div className="group relative">
                                    <Button variant="ghost" size="md" className="gap-2 px-2 md:px-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="hidden lg:block text-xs font-semibold">{(session as any).firstName || 'Hesabım'}</span>
                                        <ChevronDown className="hidden md:block w-4 h-4 text-muted-foreground transition-transform group-hover:rotate-180" />
                                    </Button>
                                    
                                    {/* Dropdown Meta Menu */}
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-surface dark:bg-zinc-900 rounded-card shadow-2xl border border-border-subtle p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-[60]">
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Profilim</span>
                                        </Link>
                                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                                            <Package className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Siparişlerim</span>
                                        </Link>
                                        {session.role === 'ADMIN' && (
                                            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors text-primary">
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span className="text-sm font-bold">Yönetim Paneli</span>
                                            </Link>
                                        )}
                                        <div className="h-px bg-border-subtle my-2" />
                                        <form action={logout}>
                                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-danger/5 text-danger rounded-xl transition-colors text-left">
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm font-bold">Çıkış Yap</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button variant="primary" size="md" className="hidden md:flex">
                                        Giriş Yap
                                    </Button>
                                    <Button variant="ghost" size="md" className="md:hidden p-2">
                                        <User className="w-5 h-5 text-foreground" />
                                    </Button>
                                </Link>
                            )}

                            <Link href="/favorites" className="hidden sm:block">
                                <Button variant="ghost" size="md" className="px-2 md:px-3">
                                    <Heart className="w-5 h-5 text-foreground" />
                                </Button>
                            </Link>

                            <Link href="/cart">
                                <Button variant="ghost" size="md" className="relative px-2 md:px-3">
                                    <ShoppingCart className="w-5 h-5 text-foreground" />
                                    <CartCount />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Row - Hidden on small screens */}
                    <div className="hidden md:block">
                        <Navbar categories={categories} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto py-12 px-4 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-zinc-950 border-t border-border-subtle py-24 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-foreground">{siteConfig.name}</span>
                            </Link>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                modern alışveriş deneyimini premium tasarımla buluşturuyoruz. En kaliteli ürünler, en uygun fiyatlarla burada.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                                    <Bell className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                                    <Heart className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-sm text-foreground mb-6">Kurumsal</h4>
                            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                                <li><Link href="/info/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
                                <li><Link href="/info/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
                                <li><Link href="/info/magazalarimiz" className="hover:text-primary transition-colors">Mağazalarımız</Link></li>
                                <li><Link href="/info/kariyer" className="hover:text-primary transition-colors">Kariyer</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-foreground mb-6">Yardım</h4>
                            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                                <li><Link href="/info/sss" className="hover:text-primary transition-colors">Sıkça Sorulan Sorular</Link></li>
                                <li><Link href="/info/iade-ve-degisim" className="hover:text-primary transition-colors">İade ve Değişim</Link></li>
                                <li><Link href="/info/teslimat-bilgileri" className="hover:text-primary transition-colors">Teslimat Bilgileri</Link></li>
                                <li><Link href="/info/odeme-secenekleri" className="hover:text-primary transition-colors">Ödeme Seçenekleri</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-foreground mb-6">Bülten</h4>
                            <p className="text-sm text-muted-foreground mb-6">Yeni kampanya ve gelişmelerden haberdar olun.</p>
                            <div className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="E-posta adresi" 
                                    className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                                />
                                <Button className="w-full">Abone Ol</Button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-border-subtle text-center">
                        <p className="text-xs font-semibold text-muted-foreground italic">
                            © 2026 {siteConfig.name} - Premium Shopping Experience
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
