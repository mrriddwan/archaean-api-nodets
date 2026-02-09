import { prisma } from "../src/lib/prisma";
import { seedRoles, seedUsers } from "./seeders";

async function main() {
  await seedRoles();
  console.log("Roles seeded");
  await seedUsers();
  console.log("Users seeded");
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
