import { prisma } from "../../src/lib/prisma";
import { shopFactory } from "../factories";
import { userFactory } from "../factories";

export async function seedShops(count: number = 5) {
  await prisma.shop.deleteMany();

  // Get existing users or create new ones for shops
  const existingUsers = await prisma.user.findMany({
    take: count,
  });

  // Create additional users if needed
  const usersNeeded = count - existingUsers.length;
  if (usersNeeded > 0) {
    const userRole = await prisma.role.findUnique({ where: { name: "User" } });
    if (!userRole) {
      throw new Error("User role not found");
    }

    const newUsers = await Promise.all(
      Array.from({ length: usersNeeded }).map(async () => {
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
    existingUsers.push(...newUsers);
  }

  // Create shops for each user (since ownerId is unique, one shop per user)
  const shops = await Promise.all(
    existingUsers.slice(0, count).map(async (user) => {
      const shopData = shopFactory();
      return prisma.shop.create({
        data: {
          ...shopData,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    })
  );

  console.log(`✓ Created ${shops.length} shops`);
  return shops;
}