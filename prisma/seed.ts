import { prisma } from "../src/lib/prisma";
import seedUsers from "./seeders/user.seeder";

async function main() {
  await seedUsers();
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
