import { prisma } from "@/lib/prisma";

export class TokenRepository {
  async store(token: string, userId: string, expiresAt: Date) {
    return await prisma.token.create({
      data: {
        token,
        userId,
        roleId: "",
        permissions: ['*'],
        type: "API",
        expiresAt,
      },
    });
  }
}