import { db } from "@/lib/db";
import { Settings, Shield, Bell, Globe, Mail, Save, ChevronRight, Lock, Database, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function SettingsPage() {
    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Sistem</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Genel Ayarlar</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Sistem Ayarları</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Mağaza yapılandırmasını, güvenlik ayarlarını ve sistem tercihlerini buradan yönetin.</p>
                </div>
                <Button size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold">
                    <Save className="w-5 h-5" /> Tüm Değişiklikleri Kaydet
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-4">
                    {[
                        { label: "Genel Yapılandırma", icon: Settings, active: true },
                        { label: "Güvenlik & Erişim", icon: Shield },
                        { label: "E-Posta (SMTP)", icon: Mail },
                        { label: "Dil & Bölge", icon: Globe },
                        { label: "Bildirimler", icon: Bell },
                        { label: "Veritabanı", icon: Database },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${item.active ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-transparent border-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-12">
                    <Card className="p-10 border-white/5 bg-zinc-900/40 backdrop-blur-xl space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Settings className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Genel Bilgiler</h2>
                                    <p className="text-sm text-zinc-500 font-medium">Mağazanızın temel kimlik bilgilerini düzenleyin.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Mağaza Adı</label>
                                    <Input placeholder="Premium E-Shop" className="h-14 bg-white/5 border-white/5 rounded-xl font-bold text-white focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Destek E-Postası</label>
                                    <Input placeholder="destek@eshop.com" className="h-14 bg-white/5 border-white/5 rounded-xl font-bold text-white focus:ring-primary" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Mağaza Açıklaması (SEO)</label>
                                    <textarea className="w-full min-h-[120px] p-6 bg-white/5 border border-white/5 rounded-2xl font-medium text-white placeholder:text-zinc-700 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Modern ve şık tasarım ürünleri..."></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Güvenlik Ayarları</h2>
                                    <p className="text-sm text-zinc-500 font-medium">Yönetici paneli ve kullanıcı güvenliğini yapılandırın.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                     <div className="space-y-1">
                                         <p className="font-bold text-white">İki Faktörlü Doğrulama</p>
                                         <p className="text-xs text-zinc-500 font-medium">Tüm admin hesapları için zorunlu kıl.</p>
                                     </div>
                                     <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                                         <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-600 rounded-full" />
                                     </div>
                                </div>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                     <div className="space-y-1">
                                         <p className="font-bold text-white">Bakım Modu</p>
                                         <p className="text-xs text-zinc-500 font-medium">Siteyi geçici olarak erişime kapat.</p>
                                     </div>
                                     <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                                         <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-600 rounded-full" />
                                     </div>
                                </div>
                            </div>
                        </section>

                        <section className="p-8 bg-primary/5 border border-primary/20 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                                <Eye className="w-8 h-8" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-bold text-white tracking-tight">Görünüm Önizleme</h3>
                                <p className="text-zinc-400 text-sm font-medium">Bu bölümdeki ayarlar sistem tarafından anlık olarak kaydedilir fakat sitenin tüm kullanıcıları için geçerli olması bir kaç dakika sürebilir.</p>
                            </div>
                        </section>
                    </Card>
                </div>
            </div>
        </div>
    );
}
