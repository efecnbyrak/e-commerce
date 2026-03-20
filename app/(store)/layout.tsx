import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Package } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/session";

interface StoreLayoutProps {
    children: React.ReactNode;
}

export default async function StoreLayout({ children }: StoreLayoutProps) {
    const session = await getSession();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">E</div>
                        <span className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-white uppercase italic">{siteConfig.name}</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {siteConfig.mainNav.map((item) => (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                className="text-sm font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md hidden md:block group">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Ürün veya marka ara..." 
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative group">
                            <ShoppingCart className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 transition-colors" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-zinc-950"></span>
                        </Link>
                        
                        {session ? (
                            <Link href={session.role === 'ADMIN' ? '/admin' : '/profile'} className="flex items-center gap-3 pl-2 border-l border-zinc-100 dark:border-zinc-800">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="hidden lg:flex flex-col">
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">Profil</span>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/login" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-zinc-900/20 hover:scale-[1.02] transition-transform">
                                Giriş Yap
                            </Link>
                        )}
                        
                        <button className="p-3 lg:hidden bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto py-12 px-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">E</div>
                                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white uppercase italic">{siteConfig.name}</span>
                            </Link>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                modern alışveriş deneyimini premium tasarımla buluşturuyoruz. En kaliteli ürünler, en uygun fiyatlarla burada.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-6">Kurumsal</h4>
                            <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">Hakkımızda</Link></li>
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">İletişim</Link></li>
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">Mağazalarımız</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-6">Yardım</h4>
                            <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">Sıkça Sorulan Sorular</Link></li>
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">İade ve Değişim</Link></li>
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">Teslimat Bilgileri</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-6">Bülten</h4>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Yeni gelişmeleri takip edin</p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="E-posta adresi" className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
                                <button className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-500/20"><Package className="w-4 h-4" /></button>
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
