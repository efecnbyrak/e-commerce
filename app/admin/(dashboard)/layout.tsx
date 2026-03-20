import { getSession } from "@/lib/session";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // Secure the admin area
    if (!session || session.role !== "ADMIN") {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { id: session.userId },
        select: { firstName: true, lastName: true, imageUrl: true }
    });

    const fullName = user ? `${user.firstName} ${user.lastName}` : "Yönetici";

    return (
        <AdminLayoutClient role={session.role} imageUrl={user?.imageUrl}>
            {children}
        </AdminLayoutClient>
    );
}
