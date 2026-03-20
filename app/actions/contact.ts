"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendContactMessage(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Lütfen zorunlu alanları doldurun." };
    }

    try {
        await (db as any).contactMessage.create({
            data: { name, email, subject, message }
        });

        // Trigger a notification for admins
        await (db as any).notification.create({
            data: {
                title: "Yeni İletişim Mesajı",
                message: `${name} isimli kullanıcı bir mesaj gönderdi.`,
                type: "INFO"
            }
        });

        revalidatePath("/admin/inbox");
        return { success: true };
    } catch (error) {
        console.error("Contact Form Error:", error);
        return { error: "Mesaj gönderilirken bir hata oluştu." };
    }
}
