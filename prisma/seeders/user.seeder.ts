import { PrismaClient } from "generated/prisma/client"
import { userFactory } from "../factories";

export async function seedUsers(prisma: PrismaClient, count: number = 10) {
  const userRole = await prisma.role.findUnique({ where: { name: "User" } });
  
  if (!userRole) {
    throw new Error("User role not found");
  }

  await prisma.user.deleteMany();

  const users = await Promise.all(
    Array.from({ length: count }).map(async () => {
      const userData = await userFactory();
      return prisma.user.create({
        data: {
          ...userData,
          userOnRoles: {
            create: {
              roleId: userRole.id,
            },
          },
        },
      });
    })
  );

  console.log(`✓ Created ${users.length} users`);
  return users;
}