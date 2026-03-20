import { CreditCard, MapPin, ShieldCheck, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage() {
    return (
        <div className="space-y-12 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/cart" className="text-zinc-400 hover:text-zinc-600 transition-colors">Sepet</Link>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
                <span className="text-zinc-900 dark:text-white font-black uppercase tracking-widest text-sm">Ödeme</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    {/* Delivery Address */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter">Teslimat Adresi</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input placeholder="Ad" className="bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <input placeholder="Soyad" className="bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <input placeholder="E-posta" className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                            <textarea placeholder="Açık Adres" rows={4} className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900 border-none rounded-3xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
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
                        <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border-2 border-blue-500/20 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm">
                                        <Wallet className="w-5 h-5 text-zinc-900 dark:text-white" />
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs">Kredi / Banka Kartı</span>
                                </div>
                                <div className="flex gap-2 opacity-50">
                                    <div className="w-8 h-5 bg-zinc-200 rounded" />
                                    <div className="w-8 h-5 bg-zinc-200 rounded" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <input placeholder="Kart Üzerindeki İsim" className="w-full bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                <input placeholder="Kart Numarası" className="w-full bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="AA / YY" className="bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center" />
                                    <input placeholder="CVC" className="bg-white dark:bg-zinc-800 border-none rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-zinc-900/40 sticky top-32">
                        <h2 className="text-2xl font-black uppercase italic tracking-tight mb-8">Sipariş Özeti</h2>
                        <div className="space-y-6 border-b border-white/10 pb-8">
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Ara Toplam</span>
                                <span>₺0.00</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Kargo</span>
                                <span className="text-emerald-400">Ücretsiz</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Vergiler (Dahil)</span>
                                <span>₺0.00</span>
                            </div>
                        </div>
                        <div className="py-8 flex justify-between items-baseline">
                            <span className="font-black uppercase tracking-widest text-xs">Toplam</span>
                            <span className="text-4xl font-black text-blue-500">₺0.00</span>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                            <Lock className="w-5 h-5" /> Siparişi Tamamla
                        </button>
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Güvenli Ödeme Sertifikası</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Wallet } from "lucide-react";
