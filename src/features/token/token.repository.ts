import { prisma } from "@/lib/prisma";

export class TokenRepository {
  async store(token: string, userId: string, expiresAt: Date) {
    const userRole = await prisma.role.findUnique({ where: { name: "User" } });

    return await prisma.token.create({
      data: {
        token,
        userId,
        roleId: userRole?.id as string,
        permissions: ["*"],
        type: "API",
        expiresAt,
      },
    });
  }
}
