import { RefreshCcw, ShieldCheck, Clock, FileText } from "lucide-react";

export default function ReturnPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-32">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center italic">İade ve Değişim</h1>
            
            <div className="prose prose-zinc prose-invert max-w-none space-y-12">
                <section className="space-y-6 bg-surface border border-border-subtle p-10 rounded-[2.5rem]">
                    <div className="flex items-center gap-4 text-primary">
                        <RefreshCcw className="w-8 h-8" />
                        <h2 className="text-3xl font-bold m-0 text-foreground">Genel İade Koşulları</h2>
                    </div>
                    <p className="text-muted-foreground font-medium leading-[1.8] text-lg">
                        Satın aldığınız ürünleri, teslim aldığınız tarihten itibaren <strong>14 gün</strong> içerisinde iade edebilirsiniz. İade işleminin başlatılabilmesi için ürünün:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                        {[
                            "Kullanılmamış olması",
                            "Orijinal ambalajında olması",
                            "Etiketlerinin sökülmemiş olması",
                            "Tüm aksesuarlarıyla birlikte iade edilmesi",
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl font-bold text-sm">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" /> {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Değişim Süreci</h2>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        Ürün değişimi talepleriniz için öncelikle iade prosedürünü takip etmeniz gerekmektedir. İade işleminiz onaylandıktan sonra dilediğiniz yeni ürünü sipariş verebilirsiniz.
                    </p>
                </section>

                <section className="space-y-6 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3 italic"><Clock className="w-8 h-8" /> Geri Ödeme Zamanı</h2>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        İadeniz tarafımıza ulaştıktan sonra yapılan inceleme sonucunda onaylanırsa, ödeme yaptığınız kanaldan (Kredi kartı/Banka kartı) <strong>5-10 iş günü</strong> içerisinde iadeniz gerçekleştirilecektir.
                    </p>
                </section>
            </div>
        </div>
    );
}
