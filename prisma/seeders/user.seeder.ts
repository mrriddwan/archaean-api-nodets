import argon2 from "argon2";
import { prisma } from "../../src/lib/prisma";

export async function seedUsers() {
  const users = [
    {
      email: "user1@example.com",
      password: await argon2.hash("password1"),
      name: "User One",
    },
    {
      email: "user2@example.com",
      password: await argon2.hash("password2"),
      name: "User Two",
    },
  ];

  const userRole = await prisma.role.findUnique({ where: { name: "User" } });
  
  if (!userRole) {
    throw new Error("User role not found");
  }

  await prisma.user.deleteMany();

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          userOnRoles: {
            create: {
              roleId: userRole.id,
            },
          },
        },
      });
    }
  ));
}