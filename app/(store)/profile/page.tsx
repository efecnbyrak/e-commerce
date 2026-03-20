import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { EmptyState } from "@/components/ui/empty-state";

export default async function ProfilePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const user = await db.user.findUnique({
        where: { id: session.userId }
    });

    if (!user) {
        return (
            <div className="py-24 max-w-2xl mx-auto">
                <EmptyState 
                    title="Kullanıcı Bulunamadı"
                    description="Profil bilgileriniz yüklenirken bir sorun oluştu."
                    icon={User}
                    actionLabel="Ana Sayfa"
                    actionHref="/"
                />
            </div>
        );
    }

    const u = user as any;
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email.split("@")[0];

    return (
        <div className="space-y-12 pb-24 max-w-4xl mx-auto">
            <div className="space-y-2 text-center">
                <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase italic">Profilim</h1>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Hesap bilgilerinizi yönetin</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
                <div className="px-12 pb-12 relative">
                    <div className="flex flex-col items-center -translate-y-16">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-white dark:bg-zinc-800 border-8 border-white dark:border-zinc-900 flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden">
                            {u.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={u.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-zinc-300" />
                            )}
                        </div>
                        <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase italic mt-4">{fullName}</h2>
                        <span className="px-4 py-1.5 bg-muted dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">
                            {u.role}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">E-Posta</h3>
                            </div>
                            <p className="font-bold text-zinc-900 dark:text-white">{u.email}</p>
                        </div>

                        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Kayıt Tarihi</h3>
                            </div>
                            <p className="font-bold text-zinc-900 dark:text-white">
                                {new Date(u.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
