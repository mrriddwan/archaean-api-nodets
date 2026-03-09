import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class NotificationRepository {
  async findAll() {
    return prisma.notification.findMany();
  }

  async findById(id: string) {
    return prisma.notification.findUnique({ where: { id } });
  }

  async create(data: Prisma.NotificationCreateInput) {
    return prisma.notification.create({ data });
  }

  async update(id: string, data: Prisma.NotificationUpdateInput) {
    return prisma.notification.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.notification.delete({ where: { id } });
  }
}
