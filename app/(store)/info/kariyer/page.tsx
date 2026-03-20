import { Briefcase, Target, Globe, Users, Heart, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const jobs = [
    { title: "Kıdemli Frontend Geliştirici", type: "Tam Zamanlı", location: "İstanbul / Hibrit" },
    { title: "UI/UX Tasarımcı", type: "Tam Zamanlı", location: "Uzaktan" },
    { title: "E-ticaret Operasyon Uzmanı", type: "Tam Zamanlı", location: "İstanbul" },
    { title: "Müşteri Deneyimi Temsilcisi", type: "Yarı Zamanlı", location: "Uzaktan" },
];

export default function CareerPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-24 pb-32">
            <div className="text-center space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                    Geleceği <span className="text-primary italic">Birlikte</span> İnşa Edelim.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                    Tutkulu, yenilikçi ve sınırları zorlamayı seven bir ekibin parçası olun. {siteConfig.name} ailesinde her fikir değerlidir.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                        Tüm Pozisyonlar <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Global Vizyon", desc: "Yerelden dünyaya uzanan projelerde yer alma şansı.", icon: Globe },
                    { title: "Sürekli Gelişim", desc: "Eğitim bütçesi ve mentorluk programları ile kendinizi geliştirin.", icon: Rocket },
                    { title: "Harika Ekip", desc: "Zeki, eğlenceli ve yardımsever iş arkadaşları.", icon: Users },
                ].map((benefit, i) => (
                    <Card key={i} className="p-10 bg-surface border-border-subtle rounded-[2.5rem] space-y-6 hover:shadow-2xl transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                            <benefit.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold">{benefit.title}</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed">{benefit.desc}</p>
                    </Card>
                ))}
            </div>

            <div className="space-y-12">
                <h2 className="text-4xl font-bold tracking-tight">Açık Pozisyonlar</h2>
                <div className="space-y-4">
                    {jobs.map((job, i) => (
                        <div key={i} className="p-8 bg-surface border border-border-subtle rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-all group cursor-pointer">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {job.location}</span>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-xl h-12 px-8 font-bold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                Başvur
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { siteConfig } from "@/config/site";
