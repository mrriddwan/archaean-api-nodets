// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const { seedRoles }    = require('./seeders');  // or './seeders/roles' if separate files
const { seedUsers }    = require('./seeders');
const { seedShops }    = require('./seeders');
const { seedProducts } = require('./seeders');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  try {
    await seedRoles(prisma);
    console.log('Roles seeded ✅');

    await seedUsers(prisma);
    console.log('Users seeded ✅');

    await seedShops(prisma);
    console.log('Shops seeded ✅');

    await seedProducts(prisma);
    console.log('Products seeded ✅');

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();