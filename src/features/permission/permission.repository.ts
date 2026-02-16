import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class PermissionRepository {
  async findAll() {
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return permissions;
  }

  async findById(id: string) {
    const permission = await prisma.permission.findUnique({ where: { id } });
    return permission;
  }

  async findByCode(code: string) {
    const permission = await prisma.permission.findUnique({ where: { code } });
    return permission;
  }

  async create(data: Prisma.PermissionCreateInput) {
    const permission = await prisma.permission.create({ data });
    return permission;
  }

  async update(id: string, data: Prisma.PermissionUpdateInput) {
    const permission = await prisma.permission.update({ where: { id }, data });
    return permission;
  }

  async delete(id: string) {
    const permission = await prisma.permission.delete({ where: { id } });
    return permission;
  }
}

