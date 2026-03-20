import { siteConfig } from "@/config/site";
import { Info, Target, Users, Award, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-24 pb-32">
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in">
                    <Info className="w-4 h-4" /> Hikayemiz
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
                    Geleceğin Modasını <br /> <span className="text-primary italic">Bugünden</span> Şekillendiriyoruz.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                    {siteConfig.name}, sadece bir e-ticaret platformu değil; bir yaşam tarzı ve topluluktur. 2024'ten beri kaliteyi ve estetiği herkes için ulaşılabilir kılıyoruz.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { title: "Vizyonumuz", desc: "Dünyanın en ilham verici moda platformu olmak ve her bireyin stilini özgürce ifade etmesini sağlamak.", icon: Target },
                    { title: "Misyonumuz", desc: "Sürdürülebilir, kaliteli ve yenilikçi ürünleri en iyi müşteri deneyimi ile buluşturmak.", icon: Zap },
                    { title: "Değerlerimiz", desc: "Şeffaflık, dürüstlük ve müşteri odaklılık işimizin merkezinde yer alır.", icon: ShieldCheck },
                ].map((item, i) => (
                    <div key={i} className="p-10 bg-surface border border-border-subtle rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-950 text-white p-12 md:p-24 rounded-[3rem] relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold tracking-tight">Rakamlarla {siteConfig.name}</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-4xl font-bold text-primary italic">50K+</p>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Mutlu Müşteri</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary italic">10K+</p>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Ürün Çeşitliliği</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary italic">24/7</p>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Müşteri Desteği</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary italic">81</p>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">İl Teslimatı</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-6">
                        <Award className="w-12 h-12 text-primary" />
                        <p className="text-xl font-medium leading-relaxed text-zinc-300">
                            "Müşterilerimize sadece ürün satmıyoruz; onlara kendilerini özel hissettirecek bir deneyim vaat ediyoruz. Her paket bizim için yeni bir heyecan."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary" />
                            <div>
                                <p className="font-bold">Emre Can Bayrak</p>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Kurucu & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
            </div>
        </div>
    );
}
