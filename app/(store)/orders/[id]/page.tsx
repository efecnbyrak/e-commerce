import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ShoppingBag, MapPin, CreditCard, ChevronLeft, Package, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session) redirect("/login");

    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-24 max-w-2xl mx-auto">
                <EmptyState 
                    title="Geçersiz Sipariş"
                    description="Sipariş numarası hatalı veya geçersiz."
                    icon={Package}
                    actionLabel="Siparişlerime Dön"
                    actionHref="/orders"
                />
            </div>
        );
    }

    const order = await db.order.findUnique({
        where: { id },
        include: { 
            items: {
                include: { product: true }
            }
        }
    });

    if (!order || order.userId !== session.userId) {
        return (
            <div className="py-24 max-w-2xl mx-auto">
                <EmptyState 
                    title="Sipariş Bulunamadı"
                    description="Aradığınız sipariş mevcut değil veya erişim yetkiniz yok."
                    icon={Package}
                    actionLabel="Siparişlerime Dön"
                    actionHref="/orders"
                />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/orders" className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-[1.5rem] hover:bg-zinc-100 transition-all shadow-sm">
                    <ChevronLeft className="w-6 h-6 text-zinc-500" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Sipariş Detayı</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Sipariş ID: #{order.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                        <div className="p-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 flex items-center justify-between">
                            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight italic">Ürünler</h2>
                            <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                order.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-10 flex items-center gap-8 group">
                                    <div className="w-24 h-24 rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform">
                                        {item.product.images ? (
                                            <Image src={JSON.parse(item.product.images)[0] || "/placeholder.png"} alt={item.product.name} width={96} height={96} className="object-cover w-full h-full" />
                                        ) : (
                                            <ShoppingBag className="w-10 h-10 text-zinc-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-zinc-900 dark:text-white text-xl truncate uppercase italic">{item.product.name}</h3>
                                        <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest mt-1">{item.quantity} x ₺{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-2xl text-zinc-900 dark:text-white tracking-tighter">₺{(item.quantity * item.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-10 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Toplam Tutar</span>
                                <span className="text-4xl font-black text-blue-600 tracking-tighter">₺{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-10 space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em]">Teslimat Adresi</h3>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                                {order.shippingAddress}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em]">Ödeme Bilgisi</h3>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Yöntem</span>
                                <span className="text-sm font-black text-zinc-900 dark:text-white uppercase">KART / IYIZICO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
