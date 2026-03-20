import { CreditCard, Banknote, ShieldCheck, Lock, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PaymentsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-32">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center italic">Ödeme Seçenekleri</h1>
            
            <div className="space-y-12">
                <Card className="p-10 bg-surface border-border-subtle rounded-[2.5rem] space-y-8">
                    <div className="flex items-center gap-4 text-primary">
                        <CreditCard className="w-10 h-10" />
                        <h2 className="text-3xl font-bold m-0 text-foreground underline decoration-primary/30 underline-offset-8">Kredi ve Banka Kartı</h2>
                    </div>
                    <p className="text-muted-foreground font-medium leading-[1.8] text-lg">
                        Tüm Visa, Mastercard ve Troy logolu kredi ve banka kartları ile güvenle ödeme yapabilirsiniz.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        {/* Placeholder for card logos */}
                        <div className="h-12 bg-muted/50 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em]">VISA</div>
                        <div className="h-12 bg-muted/50 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em]">MASTERCARD</div>
                        <div className="h-12 bg-muted/50 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em]">TROY</div>
                        <div className="h-12 bg-muted/50 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em]">AMEX</div>
                    </div>
                </Card>

                <Card className="p-10 bg-surface border-border-subtle rounded-[2.5rem] space-y-8">
                    <div className="flex items-center gap-4 text-primary">
                        <Landmark className="w-10 h-10" />
                        <h2 className="text-3xl font-bold m-0 text-foreground underline decoration-primary/30 underline-offset-8">Havale / EFT</h2>
                    </div>
                    <p className="text-muted-foreground font-medium leading-[1.8] text-lg">
                        Sipariş tutarınızı aşağıda belirtilen banka hesaplarımızdan birine göndererek ödemenizi tamamlayabilirsiniz. Açıklama kısmına <strong>Sipariş No</strong> yazmayı unutmayınız.
                    </p>
                    <div className="space-y-4">
                        {[
                            { bank: "İş Bankası", owner: siteConfig.name + " PAZ. TİC. A.Ş.", iban: "TR00 0000 0000 0000 0000 0000 00" },
                            { bank: "Garanti BBVA", owner: siteConfig.name + " PAZ. TİC. A.Ş.", iban: "TR11 1111 1111 1111 1111 1111 11" },
                        ].map((bank, i) => (
                            <div key={i} className="p-6 bg-muted/30 border border-border-subtle rounded-2xl space-y-2 group hover:border-primary/40 transition-all">
                                <p className="font-bold text-lg text-foreground">{bank.bank}</p>
                                <p className="text-sm font-medium text-muted-foreground italic">{bank.owner}</p>
                                <p className="font-mono text-primary font-bold tracking-tighter">{bank.iban}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left transition-all hover:bg-emerald-500/20">
                    <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                        <Lock className="w-10 h-10" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-emerald-500 flex items-center gap-3 justify-center md:justify-start"> <ShieldCheck className="w-6 h-6" /> Güvenli Ödeme Altyapısı</h3>
                        <p className="text-zinc-400 font-medium">
                            Ödemeleriniz 256-bit SSL şifreleme ile tam güvenlik altında gerçekleştirilir. Kart bilgileriniz kesinlikle sunucularımızda saklanmaz.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { siteConfig } from "@/config/site";
