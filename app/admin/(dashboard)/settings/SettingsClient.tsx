"use client"

import { useState } from "react";
import { Settings, Shield, Bell, Globe, Mail, Save, ChevronRight, Lock, Database, Eye, CreditCard, Terminal, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function SettingsClient() {
    const [activeTab, setActiveTab] = useState("general");
    const [twoFactor, setTwoFactor] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const tabs = [
        { id: "general", label: "Genel Yapılandırma", icon: Settings },
        { id: "security", label: "Güvenlik & Erişim", icon: Shield },
        { id: "smtp", label: "E-Posta (SMTP)", icon: Mail },
        { id: "region", label: "Dil & Bölge", icon: Globe },
        { id: "notifications", label: "Bildirimler", icon: Bell },
        { id: "database", label: "Veritabanı", icon: Database },
    ];

    const handleSave = () => {
        toast.success("Ayarlar başarıyla güncellendi!");
    };

    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Sistem</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">{tabs.find(t => t.id === activeTab)?.label}</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Sistem Ayarları</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Mağaza yapılandırmasını, güvenlik ayarlarını ve sistem tercihlerini buradan yönetin.</p>
                </div>
                <Button onClick={handleSave} size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold transition-all hover:scale-105 active:scale-95">
                    <Save className="w-5 h-5" /> Tüm Değişiklikleri Kaydet
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-3">
                    {tabs.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${activeTab === item.id ? 'bg-primary/20 border-primary/40 text-primary shadow-xl shadow-primary/5' : 'bg-transparent border-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'animate-pulse' : ''}`} />
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-12">
                    <Card className="p-10 border-white/5 bg-zinc-900/40 backdrop-blur-xl space-y-12 rounded-[2.5rem] shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                        
                        {activeTab === "general" && (
                            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-6 border-b border-white/5 pb-8">
                                    <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                                        <Settings className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">Genel Yapılandırma</h2>
                                        <p className="text-sm text-zinc-500 font-medium">Mağazanızın temel kimlik ve görünüm ayarları.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Mağaza Adı</label>
                                        <Input defaultValue="Phyberk Shop" className="h-16 bg-zinc-950/50 border-white/5 rounded-2xl font-bold text-white focus:ring-primary shadow-xl" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">İletişim E-Postası</label>
                                        <Input defaultValue="admin@phyberk.com" className="h-16 bg-zinc-950/50 border-white/5 rounded-2xl font-bold text-white focus:ring-primary shadow-xl" />
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Mağaza Açıklaması (Meta Description)</label>
                                        <textarea className="w-full min-h-[160px] p-6 bg-zinc-950/50 border border-white/5 rounded-3xl font-medium text-white placeholder:text-zinc-800 outline-none focus:ring-2 focus:ring-primary transition-all shadow-xl resize-none" placeholder="Modern, şık ve premium ürünlerin adresi..."></textarea>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "security" && (
                            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-6 border-b border-white/5 pb-8">
                                    <div className="w-14 h-14 rounded-[1.25rem] bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                                        <Lock className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">Güvenlik Kontrolleri</h2>
                                        <p className="text-sm text-zinc-500 font-medium">Erişim izinleri ve sistem güvenliğini yönetin.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div 
                                        onClick={() => setTwoFactor(!twoFactor)}
                                        className={`p-8 rounded-[2rem] border transition-all cursor-pointer group ${twoFactor ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5 hover:border-primary/20'}`}
                                    >
                                         <div className="flex justify-between items-start mb-6">
                                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${twoFactor ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:text-primary'}`}>
                                                 <Shield className="w-6 h-6" />
                                             </div>
                                             <div className={`w-14 h-7 rounded-full relative transition-colors ${twoFactor ? 'bg-emerald-500' : 'bg-zinc-800'}`}>
                                                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${twoFactor ? 'right-1' : 'left-1'}`} />
                                             </div>
                                         </div>
                                         <p className="font-bold text-white text-lg mb-2">İki Faktörlü Doğrulama</p>
                                         <p className="text-xs text-zinc-500 font-medium leading-relaxed">Tüm yönetici hesapları için girişlerde SMS veya App onayı zorunlu kılınsın.</p>
                                    </div>

                                    <div 
                                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                                        className={`p-8 rounded-[2rem] border transition-all cursor-pointer group ${maintenanceMode ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/5 hover:border-primary/20'}`}
                                    >
                                         <div className="flex justify-between items-start mb-6">
                                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${maintenanceMode ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:text-primary'}`}>
                                                 <Terminal className="w-6 h-6" />
                                             </div>
                                             <div className={`w-14 h-7 rounded-full relative transition-colors ${maintenanceMode ? 'bg-red-500' : 'bg-zinc-800'}`}>
                                                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${maintenanceMode ? 'right-1' : 'left-1'}`} />
                                             </div>
                                         </div>
                                         <p className="font-bold text-white text-lg mb-2">Bakım Modu</p>
                                         <p className="text-xs text-zinc-500 font-medium leading-relaxed">Siteyi ziyaretçilere kapatın ve sadece yöneticilerin erişebileceği bir uyarı ekranı gösterin.</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "smtp" && (
                            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-6 border-b border-white/5 pb-8">
                                    <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">E-Posta (SMTP) Ayarları</h2>
                                        <p className="text-sm text-zinc-500 font-medium">Sistemin mail gönderimi için kullanacağı sunucu bilgileri.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">SMTP Host</label>
                                        <Input placeholder="smtp.gmail.com" className="h-16 bg-zinc-950/50 border-white/5 rounded-2xl font-bold text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">SMTP Port</label>
                                        <Input placeholder="587" className="h-16 bg-zinc-950/50 border-white/5 rounded-2xl font-bold text-white" />
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">SMTP Kullanıcı</label>
                                        <Input placeholder="merhaba@phyberk.com" className="h-16 bg-zinc-950/50 border-white/5 rounded-2xl font-bold text-white" />
                                    </div>
                                </div>
                            </section>
                        )}

                        {(activeTab === "region" || activeTab === "notifications" || activeTab === "database") && (
                            <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-zinc-700 border border-white/5 shadow-2xl">
                                    <Zap className="w-16 h-16 opacity-30" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Çok Yakında</h3>
                                    <p className="text-zinc-500 max-w-sm font-medium leading-relaxed">Bu ayar modülü şu anda geliştirme aşamasındadır. Takipte kalın!</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-inner">
                            <div className="w-16 h-16 rounded-[1.25rem] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30 shrink-0">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-bold text-white tracking-tight">Hızlı Yapılandırma İpucu</h3>
                                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Değişikliklerin çoğu sistem genelinde anında etkili olur. Ancak ağ önbelleği nedeniyle yansıması 1-2 dakika sürebilir.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

