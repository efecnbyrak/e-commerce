import { db } from "@/lib/db";
import { Users, Mail, Shield, ShieldCheck, User as UserIcon, Calendar, MoreVertical, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default async function UsersPage() {
    const users = await (db as any).user.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Kullanıcı Yönetimi</h1>
                    <p className="text-sm text-muted-foreground font-medium">Platformdaki tüm üyeleri ve rollerini buradan yönetin.</p>
                </div>
            </div>

            <Card className="overflow-hidden border-border-subtle shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">Kullanıcı</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">E-Posta</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Rol</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Kayıt Tarihi</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Durum</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest pr-8 text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-24">
                                    <EmptyState 
                                        title="Kullanıcı Bulunamadı"
                                        description="Platformda henüz kayıtlı bir kullanıcı bulunmuyor."
                                        icon={Users}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        {users.map((user: any) => (
                            <TableRow key={user.id} className="hover:bg-muted/20 transition-colors group">
                                <TableCell className="pl-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border-subtle group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                                            <UserIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="font-bold text-foreground text-base tracking-tight">{user.firstName} {user.lastName}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">ID: #{user.id}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2.5 text-muted-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border-subtle group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-colors">
                                            <Mail className="w-3.5 h-3.5 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2.5">
                                        {user.role === "ADMIN" ? (
                                            <Badge variant="danger" className="rounded-lg px-3 py-1 text-[10px] font-bold gap-1.5">
                                                <ShieldCheck className="w-3 h-3" /> ADMİN
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="rounded-lg px-3 py-1 text-[10px] font-bold gap-1.5 border-border-subtle text-muted-foreground bg-surface">
                                                <Shield className="w-3 h-3" /> ÜYE
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                                        <span className="text-sm">{new Date(user.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.isActive ? "secondary" : "danger"} className="rounded-lg px-3 py-1 text-xs font-bold">
                                        {user.isActive ? 'Aktif' : 'Pasif'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="pr-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-primary hover:border-primary/40 shadow-sm bg-white">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-zinc-600 hover:border-zinc-300 shadow-sm bg-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
