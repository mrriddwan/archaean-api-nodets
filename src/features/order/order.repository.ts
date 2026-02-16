import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class OrderRepository {
  async findAll() {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        quantity: true,
        total: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
    });
    return orders;
  }

  async findById(id: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    return order;
  }

  async create(data: Prisma.OrderCreateInput) {
    const order = await prisma.order.create({ data });
    return order;
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    const order = await prisma.order.update({ where: { id }, data });
    return order;
  }

  async delete(id: string) {
    const order = await prisma.order.delete({ where: { id } });
    return order;
  }
}

