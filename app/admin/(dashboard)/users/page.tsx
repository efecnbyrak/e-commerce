import { db } from "@/lib/db";
import { Users, Mail, Shield, ShieldCheck, User as UserIcon } from "lucide-react";

export default async function UsersPage() {
    const users = await db.user.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Kullanıcılar</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Platform üyelerini ve rollerini yönetin</p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/40">
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Kullanıcı</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">E-Posta</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Rol</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Kayıt Tarihi</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <UserIcon className="w-5 h-5 text-zinc-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-zinc-900 dark:text-white">{user.firstName} {user.lastName}</span>
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">#{user.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                            <Mail className="w-4 h-4" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {user.role === "ADMIN" ? (
                                                <ShieldCheck className="w-4 h-4 text-red-500" />
                                            ) : (
                                                <Shield className="w-4 h-4 text-zinc-400" />
                                            )}
                                            <span className={`font-bold uppercase tracking-widest text-[10px] ${user.role === "ADMIN" ? "text-red-500" : "text-zinc-500"}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500">
                                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {user.isActive ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
