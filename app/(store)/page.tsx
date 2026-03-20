import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Star, Zap, ShieldCheck, Truck, Headphones, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function StoreHomePage() {
    let featuredProducts: any[] = [];
    let categories: any[] = [];

    try {
        const [fProducts, cats] = await Promise.all([
            (db as any).product.findMany({
                where: { isFeatured: true, isActive: true },
                take: 4,
                include: { category: true }
            }).catch(() => []),
            (db as any).category.findMany({
                take: 6
            }).catch(() => [])
        ]);
        featuredProducts = fProducts;
        categories = cats;
    } catch (error) {
        console.error("Store Home Page Fetch Error:", error);
    }

    return (
        <div className="space-y-32 pb-32">
            {/* Hero Section - Premium & Clean */}
            <section className="relative h-[650px] rounded-card overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                <Image 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
                    alt="Hero" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    priority
                />
                <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-24 max-w-4xl space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 w-fit">
                        <Zap className="w-4 h-4 text-primary fill-primary" /> Yeni Sezon Koleksiyonu
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.95]">
                        Stilini <br /> <span className="text-primary">Yeniden</span> Tanımla
                    </h1>
                    <p className="text-zinc-300 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                        En yeni trendler ve premium kalitedeki ürünlerimizle tarzınızı bir üst seviyeye taşıyın. Modern alışverişin adresi.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/products">
                            <Button size="lg" className="px-12 h-16 text-lg rounded-2xl">
                                Hemen Keşfet
                            </Button>
                        </Link>
                        <Link href="/categories">
                            <Button variant="outline" size="lg" className="px-12 h-16 text-lg rounded-2xl bg-white/5 border-white/10 text-white hover:bg-white/10">
                                Kategoriler
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Truck, title: "Hızlı Teslimat", desc: "24 saat içinde kargoya teslim." },
                    { icon: ShieldCheck, title: "Güvenli Ödeme", desc: "256-bit SSL korumalı ödeme altyapısı." },
                    { icon: Headphones, title: "7/24 Destek", desc: "Müşteri hizmetlerimiz her zaman yanınızda." }
                ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-6 p-8 rounded-card border border-border-subtle bg-surface shadow-sm hover:shadow-card-hover transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground font-medium">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Categories Grid */}
            <section className="space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-foreground tracking-tight">Trend Kategoriler</h2>
                        <p className="text-sm text-muted-foreground font-medium mt-1">İhtiyacın olan her şey burada</p>
                    </div>
                    <Link href="/categories">
                        <Button variant="ghost" size="md" className="gap-2 group">
                            Tümünü Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/products?category=${category.slug}`} className="group block text-center space-y-4">
                            <div className="aspect-square rounded-card bg-zinc-100 dark:bg-zinc-900 border border-border-subtle flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                                <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🏷️</span>
                            </div>
                            <h3 className="font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-foreground tracking-tight">Öne Çıkan Ürünler</h2>
                        <p className="text-sm text-muted-foreground font-medium mt-1">Haftanın en çok tercih edilenleri</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.slug}`} className="group h-full">
                            <Card className="h-full bg-surface border border-border-subtle rounded-[2rem] p-4 group-hover:shadow-shadow-card-hover group-hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-inner group-hover:shadow-none transition-all duration-500">
                                    {product.images && (
                                        <Image 
                                            src={JSON.parse(product.images)[0] || "/placeholder.png"} 
                                            alt={product.name} 
                                            fill 
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <Button variant="primary" size="md" className="h-12 w-12 p-0 rounded-xl shadow-2xl">
                                            <ShoppingBag className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    {product.salePrice && (
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="danger" className="rounded-lg px-3 py-1 text-[10px] font-bold shadow-lg">İNDİRİM</Badge>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 px-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{product.category.name}</span>
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            <span className="text-[10px] font-bold text-muted-foreground">4.9</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors tracking-tight">{product.name}</h3>
                                    <div className="flex items-baseline justify-between pt-2 border-t border-border-subtle/50">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-foreground">₺{product.price.toLocaleString()}</span>
                                            {product.salePrice && (
                                                <span className="text-xs font-medium text-muted-foreground line-through">₺{product.salePrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                    {featuredProducts.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-zinc-50 dark:bg-zinc-900 rounded-card border-2 border-dashed border-border-subtle">
                            <p className="text-muted-foreground font-bold">Henüz öne çıkan ürün eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Banner */}
            <section className="bg-zinc-950 rounded-card p-12 md:p-24 relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                                Özel Fırsatları <br /> <span className="text-primary italic">Kaçırmayın</span>
                            </h2>
                            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                                Bültenimize abone olun, en yeni koleksiyon ve indirimlerden ilk siz haberdar olun.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="E-posta adresiniz" 
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-primary transition-all font-medium h-16" 
                            />
                            <Button size="lg" className="h-16 px-12 text-md rounded-2xl">
                                Abone Ol
                            </Button>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium">
                            Verileriniz KVKK kapsamında korunmaktadır. Dilediğiniz zaman ayrılabilirsiniz.
                        </p>
                    </div>
                    <div className="hidden lg:flex justify-center relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
                        <div className="relative w-96 h-96 group-hover:scale-110 transition-transform duration-700">
                             <ShoppingBag className="w-full h-full text-primary" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
