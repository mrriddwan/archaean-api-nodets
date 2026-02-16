import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class RoleRepository {
  async findAll() {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return roles;
  }

  async findById(id: string) {
    const role = await prisma.role.findUnique({ where: { id } });
    return role;
  }

  async findByCode(code: string) {
    const role = await prisma.role.findUnique({ where: { code } });
    return role;
  }

  async create(data: Prisma.RoleCreateInput) {
    const role = await prisma.role.create({ data });
    return role;
  }

  async update(id: string, data: Prisma.RoleUpdateInput) {
    const role = await prisma.role.update({ where: { id }, data });
    return role;
  }

  async delete(id: string) {
    const role = await prisma.role.delete({ where: { id } });
    return role;
  }
}

