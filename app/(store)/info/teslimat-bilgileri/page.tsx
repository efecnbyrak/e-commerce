import { Truck, Globe, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DeliveryPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-32">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center">Teslimat Bilgileri</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-10 bg-surface border-border-subtle rounded-[2.5rem] space-y-6">
                    <Truck className="w-10 h-10 text-primary" />
                    <h3 className="text-2xl font-bold italic">Ücretsiz Kargo</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        ₺2000 ve üzeri tüm siparişlerinizde kargo ücretsizdir. Altındaki siparişlerde sabit kargo ücreti uygulanır.
                    </p>
                </Card>
                <Card className="p-10 bg-surface border-border-subtle rounded-[2.5rem] space-y-6">
                    <Clock className="w-10 h-10 text-primary" />
                    <h3 className="text-2xl font-bold italic">Hızlı Teslimat</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        Saat 14:00'e kadar verilen siparişler aynı gün kargoya teslim edilmektedir. 
                    </p>
                </Card>
            </div>

            <section className="bg-zinc-950 text-white p-12 rounded-[3rem] space-y-8 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Globe className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Tüm Türkiye'ye Teslimat</h2>
                        <p className="text-zinc-400 font-medium max-w-xl">
                            Türkiye'nin 81 iline, anlaşmalı olduğumuz güvenilir kargo firmaları ile hızlı ve güvenli teslimat sağlıyoruz.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            </section>

            <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3"><MapPin className="w-8 h-8 opacity-40" /> Teslimat Süreleri</h2>
                <div className="space-y-4">
                    {[
                        { label: "İstanbul İçi", time: "1-2 İş Günü" },
                        { label: "Marmara Bölgesi", time: "2-3 İş Günü" },
                        { label: "Diğer İller", time: "3-5 İş Günü" },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-6 bg-surface border border-border-subtle rounded-2xl hover:border-primary/30 transition-all">
                            <span className="font-bold">{item.label}</span>
                            <span className="text-primary font-bold italic tracking-widest">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
