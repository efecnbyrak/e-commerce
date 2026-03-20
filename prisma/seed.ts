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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
