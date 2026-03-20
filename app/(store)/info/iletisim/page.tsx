import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Card } from "@/components/ui/card";
import ContactClient from "./ContactClient";

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-24 pb-32">
            <div className="text-center space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
                    Size Nasıl <br /> <span className="text-primary italic">Yardımcı</span> Olabiliriz?
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                    Sorularınız, önerileriniz veya sadece merhaba demek için bizimle iletişime geçin. Ekibimiz en kısa sürede size dönüş yapacaktır.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">E-posta</p>
                                <p className="text-lg font-bold">destek@eshop.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Telefon</p>
                                <p className="text-lg font-bold">+90 212 555 00 00</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Adres</p>
                                <p className="text-lg font-bold">Maslak, Büyükdere Cd. No:1, 34398 Sarıyer/İstanbul</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-surface border border-border-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                <Clock className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Çalışma Saatleri</p>
                                <p className="text-lg font-bold">Hafta İçi: 09:00 - 18:00</p>
                            </div>
                        </div>
                    </div>

                    <Card className="p-10 bg-zinc-950 text-white rounded-[2.5rem] relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Sosyal Medyada Biz</h3>
                            <p className="text-zinc-400 font-medium">Bizi takip edin ve son gelişmelerden haberdar olun.</p>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Instagram className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Twitter className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Facebook className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mb-32" />
                    </Card>
                </div>

                <div className="lg:col-span-7">
                    <Card className="p-12 bg-surface border border-border-subtle rounded-[3rem] shadow-2xl space-y-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Hızlı Mesaj Gönder</h2>
                            <p className="text-muted-foreground font-medium">Formu doldurun, uzman ekibimiz size ulaşsın.</p>
                        </div>
                        <ContactClient />
                    </Card>
                </div>
            </div>
        </div>
    );
}
