import { prisma } from "../../src/lib/prisma";

export async function seedRoles() {
 
 const roles = [
  { name: "User", code: "USER" },
  { name: "Admin", code: "ADMIN" },
 ];

 await prisma.role.deleteMany();

 await Promise.all(
  roles.map(async (role) => {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  })
 )
}