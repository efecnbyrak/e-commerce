"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LayoutGrid, Zap, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface NavbarProps {
    categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="h-12 flex items-center justify-center gap-8 border-t border-border-subtle/50 relative">
            <Link 
                href="/products" 
                className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-all tracking-[0.1em] uppercase"
            >
                Tüm Ürünler
            </Link>

            {/* Categories Dropdown Trigger */}
            <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <button 
                    className={cn(
                        "text-[11px] font-bold flex items-center gap-2 transition-all tracking-[0.1em] uppercase",
                        isMenuOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Kategoriler
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isMenuOpen && "rotate-180")} />
                </button>

                {/* Glassmorphism Dropdown Panel */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[100] w-[600px]"
                        >
                            <div className="bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl border border-border-subtle rounded-[2rem] shadow-2xl overflow-hidden p-8 grid grid-cols-2 gap-8">
                                {/* Left Side: Category List */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-primary">
                                        <LayoutGrid className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Koleksiyonlar</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1">
                                        {categories.map((category) => (
                                            <Link 
                                                key={category.id}
                                                href={`/products?category=${category.slug}`}
                                                className="group flex flex-col gap-0.5 p-3 rounded-2xl hover:bg-primary/5 transition-all"
                                            >
                                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {category.name}
                                                </span>
                                                {category.description && (
                                                    <span className="text-[10px] text-muted-foreground line-clamp-1">
                                                        {category.description}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="/categories" className="inline-flex items-center gap-2 text-[10px] font-bold text-primary hover:gap-3 transition-all pt-2">
                                        TÜMÜNÜ GÖR <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>

                                {/* Right Side: Featured Content / Visual */}
                                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group/featured">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/featured:scale-110 transition-transform duration-700">
                                        <Zap className="w-32 h-32 text-primary fill-primary" />
                                    </div>
                                    
                                    <div className="space-y-4 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                            <Star className="w-3 h-3 text-primary fill-primary" />
                                            <span className="text-[10px] font-bold text-primary uppercase">Özel Teklif</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-foreground leading-tight">
                                            Yeni Sezon <br /> Trendlerini <br /> İlk Siz Keşfedin
                                        </h4>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-[180px]">
                                            En popüler kategorilerde %20'ye varan indirimler başladı.
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-4">
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground uppercase tracking-widest">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                            GÜVENLİ ALIŞVERİŞ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Other Static Links */}
            <Link 
                href="/info/hakkimizda" 
                className="text-[11px] font-bold text-muted-foreground hover:text-foreground transition-all tracking-[0.1em] uppercase"
            >
                Hakkımızda
            </Link>
            <Link 
                href="/info/iletisim" 
                className="text-[11px] font-bold text-muted-foreground hover:text-foreground transition-all tracking-[0.1em] uppercase"
            >
                İletişim
            </Link>
            
            {/* Special Highlight Link */}
            <Link 
                href="/products?on-sale=true" 
                className="text-[11px] font-bold text-danger hover:scale-105 transition-all tracking-[0.1em] uppercase flex items-center gap-2"
            >
                <Zap className="w-3 h-3 fill-danger" />
                İndirimdekiler
            </Link>
        </nav>
    );
}
