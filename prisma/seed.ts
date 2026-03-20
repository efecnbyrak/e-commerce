import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database for E-Shop...');

    // 1. Create Admin User
    const adminEmail = 'admin@example.com';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
                firstName: 'System',
                lastName: 'Admin',
                isActive: true
            }
        });
        console.log('✅ Admin user created: admin@example.com / admin123');
    }

    // 2. Create Categories
    const categories = [
        { name: 'Ayakkabı', slug: 'ayakkabi' },
        { name: 'Giyim', slug: 'giyim' },
        { name: 'Elektronik', slug: 'elektronik' },
        { name: 'Aksesuar', slug: 'aksesuar' }
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: { name: cat.name, slug: cat.slug }
        });
    }
    console.log('✅ Categories created');

    // 3. Create Featured Products
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: 'ayakkabi' } });
    
    const products = [
        {
            name: 'Premium Spor Ayakkabı',
            slug: 'premium-spor-ayakkabi',
            description: 'Yüksek kaliteli, konforlu ve şık spor ayakkabı.',
            price: 1299.99,
            stock: 50,
            categoryId: category.id,
            isFeatured: true,
            images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'])
        },
        {
            name: 'Klasik Beyaz Sneaker',
            slug: 'klasik-beyaz-sneaker',
            description: 'Her tarza uygun klasik tasarım.',
            price: 899.99,
            stock: 100,
            categoryId: category.id,
            isFeatured: true,
            images: JSON.stringify(['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'])
        }
    ];

    for (const prod of products) {
        await prisma.product.upsert({
            where: { slug: prod.slug },
            update: {},
            create: prod
        });
    }
    console.log('✅ Featured products created');

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
