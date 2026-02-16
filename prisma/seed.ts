import { prisma } from "../src/lib/prisma";
import { seedProducts, seedRoles, seedShops, seedUsers } from "./seeders";

async function main() {
  await seedRoles();
  console.log("Roles seeded");
  await seedUsers();
  console.log("Users seeded");
  await seedShops();
  console.log("Shops seeded");
  await seedProducts();
  console.log("Products seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
