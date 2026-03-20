"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ActionState } from "./auth";
import { getSession } from "@/lib/session";

export async function createOrder(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const session = await getSession();
    if (!session) return { error: "Oturum açmanız gerekmektedir.", success: false };

    const cartDataRaw = formData.get("cartData") as string;
    const shippingAddress = formData.get("shippingAddress") as string;
    const billingAddress = formData.get("billingAddress") as string || shippingAddress;

    if (!cartDataRaw || !shippingAddress) {
        return { error: "Lütfen tüm gerekli alanları doldurunuz.", success: false };
    }

    try {
        const cartItems = JSON.parse(cartDataRaw); // Array of { productId, quantity, price }
        
        const totalAmount = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        const order = await db.$transaction(async (tx: any) => {
            const newOrder = await tx.order.create({
                data: {
                    userId: session.userId,
                    totalAmount,
                    shippingAddress,
                    billingAddress,
                    items: {
                        create: cartItems.map((item: any) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    }
                }
            });

            // Reduce stock
            for (const item of cartItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }

            return newOrder;
        });

        revalidatePath("/admin/orders");
        return { success: true, message: "Siparişiniz başarıyla oluşturuldu.", id: order.id };
    } catch (error) {
        console.error("Create Order error:", error);
        return { error: "Sipariş oluşturulurken bir hata oluştu.", success: false };
    }
}

export async function updateOrderStatus(id: number, status: string): Promise<ActionState> {
    try {
        await db.order.update({
            where: { id },
            data: { status: status as any }
        });

        revalidatePath("/admin/orders");
        revalidatePath(`/orders/${id}`);
        return { success: true, message: "Sipariş durumu güncellendi." };
    } catch (error) {
        console.error("Update Order Status error:", error);
        return { error: "Sipariş durumu güncellenirken bir hata oluştu.", success: false };
    }
}
