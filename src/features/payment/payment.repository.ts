import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class PaymentRepository {
  async findAll() {
    const payments = await prisma.payment.findMany({
      select: {
        id: true,
        amount: true,
        status: true,
        order: {
          select: {
            id: true,
            total: true,
            quantity: true,
          },
        },
      },
    });
    return payments;
  }

  async findById(id: string) {
    const payment = await prisma.payment.findUnique({ where: { id } });
    return payment;
  }

  async create(data: Prisma.PaymentCreateInput) {
    const payment = await prisma.payment.create({ data });
    return payment;
  }

  async update(id: string, data: Prisma.PaymentUpdateInput) {
    const payment = await prisma.payment.update({ where: { id }, data });
    return payment;
  }

  async delete(id: string) {
    const payment = await prisma.payment.delete({ where: { id } });
    return payment;
  }
}

