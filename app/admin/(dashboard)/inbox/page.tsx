import { db } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Mail, Trash2, CheckCircle2, Clock, User, ChevronRight, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { markMessageAsRead, deleteMessage } from "@/app/actions/settings";
import InboxClient from "./InboxClient";

export default async function InboxPage() {
    await verifySession();

    const messages = await (db as any).contactMessage.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-16 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>İletişim</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Gelen Kutusu</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Mesajlar</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Müşterilerinizden gelen tüm talep, soru ve geri bildirimleri buradan yönetin.</p>
                </div>
            </div>

            <InboxClient initialMessages={messages} />
        </div>
    );
}
