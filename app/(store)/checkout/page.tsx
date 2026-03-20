"use client";

import { useCart } from "@/context/CartContext";
import { CreditCard, MapPin, ShieldCheck, ChevronRight, Lock, Wallet, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createOrder } from "@/app/actions/orders";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";

export default function CheckoutPage() {
    const { cartItems, totalAmount, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (cartItems.length === 0) {
        return (
            <div className="py-24 max-w-2xl mx-auto">
                <EmptyState 
                    title="Sepetiniz Boş"
                    description="Ödeme yapabilmek için sepetinizde en az bir ürün bulunmalıdır."
                    icon={ShoppingBag}
                    actionLabel="Ürünlere Göz At"
                    actionHref="/products"
                />
            </div>
        );
    }

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        
        // Add cart items to formData
        formData.append("cartData", JSON.stringify(cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }))));

        const result = await createOrder({ success: false }, formData);

        if (result.success) {
            toast.success(result.message || "Siparişiniz alındı!");
            clearCart();
            router.push(`/orders/${result.id}`);
        } else {
            toast.error(result.error || "Bir hata oluştu.");
        }
        setIsSubmitting(false);
    }

    return (
        <div className="space-y-12 pb-24">
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                <a href="/cart" className="hover:text-blue-600 transition-colors">Sepet</a>
                <ChevronRight className="w-4 h-4" />
                <span className="text-zinc-900 dark:text-white">Ödeme</span>
            </div>

            <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                    {/* Delivery Address */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter">Teslimat Adresi</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input name="firstName" required placeholder="Ad" className="bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <input name="lastName" required placeholder="Soyad" className="bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <input name="email" type="email" required placeholder="E-posta" className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <textarea name="shippingAddress" required placeholder="Açık Adres" rows={4} className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900 border-none rounded-[2rem] px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter">Ödeme Yöntemi</h2>
                        </div>
                        <div className="p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border-4 border-blue-500/20 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg">
                                        <Wallet className="w-6 h-6 text-zinc-900 dark:text-white" />
                                    </div>
                                    <span className="font-black text-zinc-900 dark:text-white uppercase tracking-widest text-sm italic">Kredi / Banka Kartı</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded shadow-inner" />
                                    <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded shadow-inner" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <input placeholder="Kart Üzerindeki İsim" className="w-full bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" />
                                <input placeholder="Kart Numarası" className="w-full bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="AA / YY" className="bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center shadow-sm" />
                                    <input placeholder="CVC" className="bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-zinc-900/40 sticky top-32 space-y-8">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight">Sipariş Özeti</h2>
                        <div className="space-y-6 border-b border-white/10 pb-8">
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span className="text-[10px] font-black uppercase tracking-widest">Ara Toplam</span>
                                <span className="font-bold">₺{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span className="text-[10px] font-black uppercase tracking-widest">Kargo</span>
                                <span className="text-emerald-400 font-black">ÜCRETSİZ</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="font-black uppercase tracking-widest text-[10px] text-zinc-500">Ödenecek Tutar</span>
                            <span className="text-5xl font-black text-blue-500 tracking-tighter">₺{totalAmount.toLocaleString()}</span>
                        </div>
                        <button 
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><Lock className="w-5 h-5" /> Siparişi Onayla</>
                            )}
                        </button>
                        <div className="flex items-center justify-center gap-3 opacity-30 text-[8px] font-black uppercase tracking-[0.3em]">
                            <ShieldCheck className="w-3 h-3" />
                            256-bit Güvenli Ödeme
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
