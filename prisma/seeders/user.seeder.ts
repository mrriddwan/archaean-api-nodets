import argon2 from "argon2";
import { prisma } from "../../src/lib/prisma";

async function seedUsers() {
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

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }
  ));

  console.log({ users });
  console.log("User seeding completed.");
}

export default seedUsers;