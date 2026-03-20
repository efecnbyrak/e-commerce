"use client";

import { useState } from "react";
import { Mail, Trash2, CheckCircle2, Clock, User, MessageSquare, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { markMessageAsRead, deleteMessage } from "@/app/actions/settings";
import { toast } from "react-hot-toast";

export default function InboxClient({ initialMessages }: { initialMessages: any[] }) {
    const [messages, setMessages] = useState(initialMessages);

    const handleMarkAsRead = async (id: number) => {
        try {
            await markMessageAsRead(id);
            setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
            toast.success("Mesaj okundu olarak işaretlendi.");
        } catch (error) {
            toast.error("Bir hata oluştu.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
        try {
            await deleteMessage(id);
            setMessages(prev => prev.filter(m => m.id !== id));
            toast.success("Mesaj başarıyla silindi.");
        } catch (error) {
            toast.error("Silme işlemi başarısız.");
        }
    };

    return (
        <div className="grid grid-cols-1 gap-8">
            {messages.length === 0 ? (
                <Card className="py-40 border-white/5 bg-zinc-900/40 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-zinc-700">
                        <Mail className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Gelen Kutusu Boş</h3>
                        <p className="text-zinc-500 max-w-xs font-medium">Henüz herhangi bir müşteri mesajı bulunmuyor.</p>
                    </div>
                </Card>
            ) : (
                messages.map((msg) => (
                    <Card key={msg.id} className={`p-8 md:p-10 border-white/5 bg-zinc-900/40 backdrop-blur-xl hover:bg-zinc-900/60 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-10 ${!msg.isRead ? 'ring-1 ring-primary/20 bg-primary/5' : ''}`}>
                        <div className="flex-1 space-y-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge variant={msg.isRead ? "outline" : "primary"} className={`rounded-xl px-4 py-1.5 font-bold uppercase tracking-widest text-[9px] ${msg.isRead ? 'border-white/5 text-zinc-600' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                                    {msg.isRead ? "OKUNDU" : "YENİ MESAJ"}
                                </Badge>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" />
                                    {format(new Date(msg.createdAt), "d MMMM yyyy HH:mm", { locale: tr })}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{msg.subject || "Konu Yok"}</h3>
                                <div className="flex items-center gap-3 text-zinc-400 font-medium">
                                    <User className="w-4 h-4 text-zinc-600" />
                                    <span>{msg.name}</span>
                                    <span className="text-zinc-800">•</span>
                                    <span className="text-primary/80">{msg.email}</span>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 bg-zinc-950/50 border border-white/5 rounded-3xl text-zinc-300 leading-relaxed font-medium">
                                {msg.message}
                            </div>
                        </div>

                        <div className="flex md:flex-col justify-end gap-3 mt-auto md:mt-0">
                            {!msg.isRead && (
                                <Button onClick={() => handleMarkAsRead(msg.id)} variant="outline" className="w-14 h-14 md:w-16 md:h-16 p-0 rounded-2xl bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5">
                                    <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
                                </Button>
                            )}
                            <Button onClick={() => handleDelete(msg.id)} variant="outline" className="w-14 h-14 md:w-16 md:h-16 p-0 rounded-2xl bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5">
                                <Trash2 className="w-6 h-6 md:w-7 md:h-7" />
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}
