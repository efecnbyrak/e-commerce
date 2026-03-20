import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding started...");

    // Create Categories
    const electronics = await prisma.category.upsert({
        where: { slug: "elektronik" },
        update: {},
        create: {
            name: "Elektronik",
            slug: "elektronik",
            description: "En yeni teknoloji ürünleri"
        }
    });

    const fashion = await prisma.category.upsert({
        where: { slug: "moda" },
        update: {},
        create: {
            name: "Moda",
            slug: "moda",
            description: "Stilinizi yansıtan kıyafetler"
        }
    });

    // Create Products
    await prisma.product.upsert({
        where: { slug: "kablosuz-kulaklik" },
        update: {},
        create: {
            name: "Premium Kablosuz Kulaklık",
            slug: "kablosuz-kulaklik",
            description: "Aktif gürültü engelleme özellikli, 40 saat pil ömrü sunan premium kulaklık.",
            price: 2499.00,
            stock: 50,
            categoryId: electronics.id,
            images: JSON.stringify(["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"]),
            isFeatured: true
        }
    });

    await prisma.product.upsert({
        where: { slug: "akilli-saat" },
        update: {},
        create: {
            name: "Smart Watch Pro",
            slug: "akilli-saat",
            description: "Sağlık takibi ve bildirimler için mükemmel bir yardımcı.",
            price: 3999.00,
            salePrice: 3499.00,
            stock: 30,
            categoryId: electronics.id,
            images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"]),
            isFeatured: true
        }
    });

    await prisma.product.upsert({
        where: { slug: "pamuklu-tisort" },
        update: {},
        create: {
            name: "Oversize Pamuklu Tişört",
            slug: "pamuklu-tisort",
            description: "%100 organik pamuktan üretilmiş, konforlu ve şık tişört.",
            price: 499.00,
            stock: 100,
            categoryId: fashion.id,
            images: JSON.stringify(["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"]),
            isFeatured: false
        }
    });

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
