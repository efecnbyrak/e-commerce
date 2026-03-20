import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CartPage() {
    // Placeholder for actual cart data (will be client-side or session-based)
    const cartItems = []; 

    return (
        <div className="space-y-12 pb-24">
            <div>
                <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Sepetim</h1>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2">Seçtiğiniz ürünleri kontrol edin</p>
            </div>

            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Cart Items List */}
                    </div>
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-zinc-900/30 space-y-8">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Sipariş Özeti</h2>
                            <div className="space-y-4 border-b border-white/10 pb-8">
                                <div className="flex justify-between text-zinc-400 font-medium">
                                    <span>Ara Toplam</span>
                                    <span>₺0.00</span>
                                </div>
                                <div className="flex justify-between text-zinc-400 font-medium">
                                    <span>Kargo</span>
                                    <span>Ücretsiz</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="font-black uppercase tracking-widest text-xs">Toplam</span>
                                <span className="text-4xl font-black">₺0.00</span>
                            </div>
                            <Link href="/checkout" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3">
                                Ödemeye Geç <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-32 text-center bg-zinc-50 dark:bg-zinc-900/30 rounded-[3.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 space-y-8">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-10 h-10 text-zinc-300" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter">Sepetiniz Boş</h2>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Alışverişe başlamak için henüz çok geç değil!</p>
                    </div>
                    <Link href="/products" className="inline-flex bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
                        Ürünlere Göz At
                    </Link>
                </div>
            )}
        </div>
    );
}
