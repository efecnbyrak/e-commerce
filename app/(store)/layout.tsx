import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Package, ChevronDown, Heart, Bell } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { CartCount } from "@/components/cart/CartCount";

interface StoreLayoutProps {
    children: React.ReactNode;
}

export default async function StoreLayout({ children }: StoreLayoutProps) {
    const session = await getSession();
    const categories = await (db as any).category.findMany({
        take: 10,
        orderBy: { name: 'asc' }
    });

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
                {/* Top Bar */}
                <div className="border-b border-zinc-50 dark:border-zinc-900">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform italic">E</div>
                            <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase italic">{siteConfig.name}</span>
                        </Link>

                        {/* Search Bar - Trendyol Style Center */}
                        <div className="flex-1 max-w-2xl group">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Aradığınız ürün, kategori veya markayı yazınız..." 
                                    className="w-full pl-14 pr-6 py-3.5 bg-zinc-100/50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-800/50 rounded-2xl text-sm font-bold placeholder:text-zinc-500 transition-all outline-none shadow-sm"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {session ? (
                                <div className="flex items-center gap-1 group relative">
                                    <Link href={session.role === 'ADMIN' ? '/admin' : '/profile'} className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-2xl transition-all group/acc">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
                                            <User className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/acc:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hesabım</span>
                                            <span className="text-xs font-black text-zinc-900 dark:text-white truncate max-w-[80px]">{(session as any).firstName || 'Profil'}</span>
                                        </div>
                                        <ChevronDown className="w-3 h-3 text-zinc-400 group-hover/acc:text-blue-600 transition-colors" />
                                    </Link>
                                    
                                    {/* Dropdown Menu (Simplified) */}
                                    <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
                                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                                            <Package className="w-4 h-4 text-zinc-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Siparişlerim</span>
                                        </Link>
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                                            <User className="w-4 h-4 text-zinc-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Profilim</span>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center gap-3 px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-2xl transition-all group border-2 border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                                    <User className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-xs font-black uppercase tracking-[0.15em] text-zinc-900 dark:text-white">Giriş Yap</span>
                                </Link>
                            )}

                            <Link href="/cart" className="flex items-center gap-3 px-5 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-zinc-900/20 relative group">
                                <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-[0.15em]">Sepetim</span>
                                <CartCount />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Categories Bar - Trendyol Style */}
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar py-2">
                    <nav className="flex items-center justify-center gap-8 min-w-max">
                        <Link href="/products" className="py-2 text-[11px] font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-blue-600 transition-all hover:text-blue-600">
                            TÜM ÜRÜNLER
                        </Link>
                        {categories.map((cat: any) => (
                            <Link 
                                key={cat.id} 
                                href={`/products?category=${cat.slug}`}
                                className="py-2 text-[11px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-blue-600 transition-all hover:text-blue-600 whitespace-nowrap"
                            >
                                {cat.name}
                            </Link>
                        ))}
                        <Link href="/categories" className="py-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-blue-600 transition-all flex items-center gap-1">
                            HEPSİ <ChevronDown className="w-3 h-3" />
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto py-12 px-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                        <div className="space-y-8">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20 italic">E</div>
                                <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase italic">{siteConfig.name}</span>
                            </Link>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                modern alışveriş deneyimini premium tasarımla buluşturuyoruz. En kaliteli ürünler, en uygun fiyatlarla burada.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-zinc-400" />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-zinc-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-8">Kurumsal</h4>
                            <ul className="space-y-5 text-xs font-black text-zinc-500 hover:text-blue-600 dark:text-zinc-500 uppercase tracking-widest transition-colors">
                                <li><Link href="/">Hakkımızda</Link></li>
                                <li><Link href="/">İletişim</Link></li>
                                <li><Link href="/">Mağazalarımız</Link></li>
                                <li><Link href="/">Kariyer</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-8">Yardım</h4>
                            <ul className="space-y-5 text-xs font-black text-zinc-500 hover:text-blue-600 dark:text-zinc-500 uppercase tracking-widest transition-colors">
                                <li><Link href="/">Sıkça Sorulan Sorular</Link></li>
                                <li><Link href="/">İade ve Değişim</Link></li>
                                <li><Link href="/">Teslimat Bilgileri</Link></li>
                                <li><Link href="/">Ödeme Seçenekleri</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-8">Bülten</h4>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Yeni gelişmeleri takip edin</p>
                            <div className="flex flex-col gap-3">
                                <input type="email" placeholder="E-posta adresi" className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-5 py-4 text-xs font-bold outline-none focus:border-blue-600 transition-all shadow-sm" />
                                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">Abone Ol</button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                            © 2026 {siteConfig.name} - Premium Shopping Experience
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
