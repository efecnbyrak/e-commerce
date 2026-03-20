"use server";

import { db } from "@/lib/db";
import { ProductSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { ActionState } from "./auth";

export async function createProduct(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    
    // Handle images array from FormData (assuming comma-separated or multiple entries)
    const imagesRaw = formData.getAll("images");
    const images = imagesRaw.length > 0 ? imagesRaw.map(i => i.toString()) : [];

    const validatedFields = ProductSchema.safeParse({
        ...rawData,
        images,
        isFeatured: formData.get("isFeatured") === "on",
        isActive: formData.get("isActive") !== "off", // Default on
    });

    if (!validatedFields.success) {
        return { error: "Lütfen ürün bilgilerini kontrol ediniz.", success: false };
    }

    const data = validatedFields.data;

    try {
        const slug = data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        
        await db.product.create({
            data: {
                ...data,
                slug,
                images: JSON.stringify(data.images),
            }
        });

        revalidatePath("/admin/products");
        revalidatePath("/");
        return { success: true, message: "Ürün başarıyla oluşturuldu." };
    } catch (error) {
        console.error("Create Product error:", error);
        return { error: "Ürün oluşturulurken bir hata oluştu.", success: false };
    }
}

export async function updateProduct(id: number, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    const imagesRaw = formData.getAll("images");
    const images = imagesRaw.length > 0 ? imagesRaw.map(i => i.toString()) : [];

    const validatedFields = ProductSchema.safeParse({
        ...rawData,
        images,
        isFeatured: formData.get("isFeatured") === "on",
        isActive: formData.get("isActive") !== "off",
    });

    if (!validatedFields.success) {
        return { error: "Lütfen ürün bilgilerini kontrol ediniz.", success: false };
    }

    const data = validatedFields.data;

    try {
        await db.product.update({
            where: { id },
            data: {
                ...data,
                images: JSON.stringify(data.images),
            }
        });

        revalidatePath("/admin/products");
        revalidatePath(`/products/${id}`);
        return { success: true, message: "Ürün başarıyla güncellendi." };
    } catch (error) {
        console.error("Update Product error:", error);
        return { error: "Ürün güncellenirken bir hata oluştu.", success: false };
    }
}

export async function deleteProduct(id: number): Promise<ActionState> {
    try {
        await db.product.delete({ where: { id } });
        revalidatePath("/admin/products");
        return { success: true, message: "Ürün başarıyla silindi." };
    } catch (error) {
        console.error("Delete Product error:", error);
        return { error: "Ürün silinirken bir hata oluştu.", success: false };
    }
}
