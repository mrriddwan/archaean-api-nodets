// prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client'
import { seedRoles }    from './seeders/role.seeder'
import { seedUsers }    from './seeders/user.seeder'
import { seedShops }    from './seeders/shop.seeder'
import { seedProducts } from './seeders/product.seeder'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })

async function main() {
  console.log('Starting database seeding...')

  try {
    await seedRoles(prisma)
    console.log('Roles seeded ✅')

    await seedUsers(prisma)
    console.log('Users seeded ✅')

    await seedShops(prisma)
    console.log('Shops seeded ✅')

    await seedProducts(prisma)
    console.log('Products seeded ✅')

    console.log('All seeding completed successfully!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()