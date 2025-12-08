import { prisma } from "../src/lib/prisma";
import { seedRoles, seedUsers } from "./seeders";

async function main() {
  await seedUsers();
  console.log("Users seeded");
  await seedRoles();
  console.log("Roles seeded");
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
