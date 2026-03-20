import { db } from "@/lib/db";
import { Users, Mail, Shield, ShieldCheck, User as UserIcon, Calendar, MoreVertical, Edit, ChevronRight, UserPlus, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UsersPage() {
    const users = await (db as any).user.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Topluluk</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Kullanıcılar</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Kullanıcı Yönetimi</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Platformdaki tüm üyeleri, rollerini ve erişim izinlerini buradan kontrol edin.</p>
                </div>
                <div className="flex gap-4">
                    <Button size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold">
                        <UserPlus className="w-5 h-5" /> Yeni Kullanıcı Ekle
                    </Button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="İsim, e-posta veya rol ile ara..." 
                        className="w-full pl-16 pr-6 h-14 bg-white/5 border border-white/5 rounded-2xl text-[15px] font-medium text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 px-8 gap-3 border-white/10 rounded-2xl font-bold text-zinc-400 hover:bg-white/5">
                        <Filter className="w-5 h-5" /> Filtreler
                    </Button>
                </div>
            </Card>

            <Card className="overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-3xl">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 bg-zinc-950/30 hover:bg-zinc-950/30 h-16">
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pl-10 text-zinc-600">Kullanıcı Bilgisi</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">E-Posta</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-center text-zinc-600">Rol</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Kayıt Tarihi</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600 text-center">Durum</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pr-10 text-right text-zinc-600">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: any) => (
                                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                    <TableCell className="pl-10 h-28">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center border border-white/5 shadow-xl group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                                                {user.imageUrl ? (
                                                    <img src={user.imageUrl} alt={user.firstName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon className="w-7 h-7 text-zinc-800 group-hover:text-primary transition-colors" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0 space-y-1.5">
                                                <span className="font-bold text-[17px] text-white truncate leading-tight group-hover:text-primary transition-colors duration-300">{user.firstName} {user.lastName}</span>
                                                <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">ID: #{user.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-zinc-400 font-medium">
                                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2.5">
                                            {user.role === "ADMIN" ? (
                                                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-xl px-4 py-1.5 text-[10px] font-bold gap-2 uppercase tracking-widest border shadow-lg shadow-primary/5">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> ADMİN
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="rounded-xl px-4 py-1.5 text-[10px] font-bold gap-2 border-white/5 text-zinc-500 bg-white/5 uppercase tracking-widest">
                                                    <Shield className="w-3.5 h-3.5" /> ÜYE
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-zinc-500 font-medium">
                                            <Calendar className="w-4 h-4 opacity-40 text-primary" />
                                            <span className="text-sm tracking-tight">{new Date(user.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={user.isActive ? "secondary" : "danger"} className={`rounded-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none ${user.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-danger/10 text-danger'}`}>
                                            {user.isActive ? 'AKTİF' : 'PASİF'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="pr-10 text-right">
                                        <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                            <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all shadow-xl">
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-white transition-all shadow-xl">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
