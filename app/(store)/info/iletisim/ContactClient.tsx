"use client";

import { useActionState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "react-hot-toast";
import { sendContactMessage } from "@/app/actions/contact";

export default function ContactClient() {
    const [state, formAction, isPending] = useActionState(sendContactMessage, { success: false });

    useEffect(() => {
        if (state.success) {
            toast.success("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız!");
        }
        if (state.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Adınız</label>
                    <Input name="name" placeholder="Adınız ve Soyadınız" required className="h-14 rounded-2xl border-border-subtle bg-surface focus:ring-primary focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">E-posta</label>
                    <Input name="email" placeholder="ornek@mail.com" type="email" required className="h-14 rounded-2xl border-border-subtle bg-surface focus:ring-primary focus:border-primary transition-all" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Konu</label>
                <Input name="subject" placeholder="Hangi konuda konuşmak istiyorsunuz?" className="h-14 rounded-2xl border-border-subtle bg-surface focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Mesajınız</label>
                <Textarea name="message" placeholder="Mesajınızı detaylandırın..." required className="min-h-[160px] rounded-3xl border-border-subtle bg-surface focus:ring-primary focus:border-primary transition-all py-6" />
            </div>
            <Button isLoading={isPending} className="w-full h-16 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Gönder <Send className="w-5 h-5" />
            </Button>
        </form>
    );
}
