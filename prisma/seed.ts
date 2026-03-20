import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Erkek Giyim', slug: 'erkek-giyim', description: 'Modern ve şık erkek koleksiyonu.' },
    { name: 'Kadın Giyim', slug: 'kadin-giyim', description: 'Zarif ve trend kadın koleksiyonu.' },
    { name: 'Ayakkabı', slug: 'ayakkabi', description: 'Her adıma konfor katan ayakkabılar.' },
    { name: 'Aksesuar', slug: 'aksesuar', description: 'Stilinizi tamamlayan özel aksesuarlar.' },
    { name: 'Çanta', slug: 'canta', description: 'Günlük ve şık çanta modelleri.' },
    { name: 'Dış Giyim', slug: 'dis-giyim', description: 'Soğuk havalara karşı koruyucu ve şık parçalar.' },
  ]

  for (const category of categories) {
    await (prisma as any).category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  console.log('Categories seeded successfully!')

  const seededCategories = await (prisma as any).category.findMany();
  const categoryMap = Object.fromEntries(seededCategories.map((c: any) => [c.slug, c.id]));

  const products = [
    {
      name: 'Premium Slim Fit Gömlek',
      slug: 'premium-slim-fit-gomlek',
      description: '%100 Pamuk, nefes alan kumaş yapısı ile günlük kullanım için ideal.',
      price: 899,
      stock: 50,
      images: JSON.stringify(['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop']),
      categoryId: categoryMap['erkek-giyim'],
      isActive: true,
      isFeatured: true
    },
    {
      name: 'Modern Kesim Denim Pantolon',
      slug: 'modern-kesim-denim-pantolon',
      description: 'Esnek yapısı ve modern kesimi ile şıklık ve konfor bir arada.',
      price: 1299,
      stock: 35,
      images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop']),
      categoryId: categoryMap['erkek-giyim'],
      isActive: true,
      isFeatured: true
    },
    {
      name: 'Zarif Çiçekli Yazlık Elbise',
      slug: 'zarif-cicekli-yazlik-elbise',
      description: 'Hafif kumaşı ve canlı renkleri ile yaz aylarının vazgeçilmeyeni.',
      price: 1150,
      stock: 25,
      images: JSON.stringify(['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop']),
      categoryId: categoryMap['kadin-giyim'],
      isActive: true,
      isFeatured: true
    },
    {
      name: 'Klasik Beyaz Sneaker',
      slug: 'klasik-beyaz-sneaker',
      description: 'Zamansız tasarımı ile her kombine uyum sağlayan rahat sneaker.',
      price: 2499,
      stock: 15,
      images: JSON.stringify(['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop']),
      categoryId: categoryMap['ayakkabi'],
      isActive: true,
      isFeatured: true
    },
    {
      name: 'Hafif Şişme Mont',
      slug: 'hafif-sisme-mont',
      description: 'Su itici kumaş ve sıcak tutan dolgusu ile kışın en iyi dostu.',
      price: 3200,
      stock: 10,
      images: JSON.stringify(['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1974&auto=format&fit=crop']),
      categoryId: categoryMap['dis-giyim'],
      isActive: true,
      isFeatured: true
    },
    {
        name: 'Deri Sırt Çantası',
        slug: 'deri-sirt-cantasi',
        description: 'Geniş iç hacmi ve dayanıklı deri yapısı ile hem şık hem fonksiyonel.',
        price: 1750,
        stock: 20,
        images: JSON.stringify(['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop']),
        categoryId: categoryMap['canta'],
        isActive: true,
        isFeatured: false
      }
  ]

  for (const product of products) {
    await (prisma as any).product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log('Products seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
