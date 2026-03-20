import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const INFO_PAGES = {
    "hakkimizda": { title: "Hakkımızda", subtitle: "Hikayemiz ve vizyonumuz." },
    "iletisim": { title: "İletişim", subtitle: "Bizimle iletişime geçin." },
    "magazalarimiz": { title: "Mağazalarımız", subtitle: "Size en yakın noktadayız." },
    "kariyer": { title: "Kariyer", subtitle: "Ekibimize katılın." },
    "yardim": { title: "Yardım Merkezi", subtitle: "Sizin için buradayız." },
    "sss": { title: "Sıkça Sorulan Sorular", subtitle: "Aklınızdaki soruların cevapları." },
    "iade-ve-degisim": { title: "İade ve Değişim", subtitle: "Kolay iade ve değişim süreçleri." },
    "teslimat-bilgileri": { title: "Teslimat Bilgileri", subtitle: "Siparişiniz ne zaman elinizde olur?" },
    "odeme-secenekleri": { title: "Ödeme Seçenekleri", subtitle: "Güvenli ve esnek ödeme yöntemleri." }
};

export default function InfoPage({ params }: { params: { slug: string } }) {
    const page = (INFO_PAGES as any)[params.slug];
    
    if (!page) notFound();

    return (
        <div className="max-w-4xl mx-auto space-y-16 py-12">
            <div className="space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Ana Sayfa
                </Link>
                <div className="space-y-2">
                    <h1 className="text-6xl font-black text-foreground tracking-tighter italic uppercase">{page.title}</h1>
                    <p className="text-xl text-muted-foreground font-medium italic opacity-60">{page.subtitle}</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-[3rem] p-12 md:p-20 space-y-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">İçerik Yakında Burada</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Bu sayfa şu anda hazırlık aşamasındadır. En kısa sürede en güncel bilgilerle burada olacağız. 
                            {page.title} hakkında detaylı bilgi almak için bu bölümü takip etmeye devam edin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border-subtle">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">Daha Fazla Bilgi</h3>
                            <p className="text-muted-foreground">
                                Sorularınız için müşteri hizmetleri ekibimiz her zaman yardıma hazır.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">Bize Ulaşın</h3>
                            <p className="text-muted-foreground">
                                info@shop.com adresinden veya hafta içi 09:00 - 18:00 saatleri arasında telefonla bize ulaşabilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <Link href="/">
                    <button className="px-12 py-5 bg-foreground text-background rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                        Mağazaya Dön
                    </button>
                </Link>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return Object.keys(INFO_PAGES).map((slug) => ({
        slug,
    }));
}
