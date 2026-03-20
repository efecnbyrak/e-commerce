"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createNotification(title: string, message: string, type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" = "INFO") {
    try {
        await (db as any).notification.create({
            data: { title, message, type }
        });
        revalidatePath("/admin");
    } catch (error) {
        console.error("Failed to create notification:", error);
    }
}

export async function getNotifications() {
    return await (db as any).notification.findMany({
        orderBy: { createdAt: "desc" },
        take: 20
    });
}

export async function markNotificationAsRead(id: number) {
    await (db as any).notification.update({
        where: { id },
        data: { isRead: true }
    });
    revalidatePath("/admin");
}
