import { prisma } from "@/lib/prisma";

export class TokenRepository {
  async store(token: string, userId: string, expiresAt: Date, type: 'access' | 'refresh' = 'access') {
    const userRole = await prisma.role.findUnique({ where: { name: "User" } });
    const data = {
      userId,
      roleId: userRole?.id as string,
      permissions: ["*"] as string[],
      type,
      expiresAt,
    };

    return await prisma.token.upsert({
      where: { token },
      update: data,
      create: { token, ...data },
    });
  }

  async delete(userId: string) {
    return await prisma.token.deleteMany({ where: { userId } });
  }
}
