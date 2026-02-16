import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class CartRepository {
  async findByUserId(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });
    return cart;
  }

  async create(userId: string) {
    const cart = await prisma.cart.create({
      data: { userId },
    });
    return cart;
  }
  
  async update(id: string, data: Prisma.CartUpdateInput) {
    const cart = await prisma.cart.update({ where: { id }, data });
    return cart;
  }

  async delete(id: string) {
    const cart = await prisma.cart.delete({ where: { id } });
    return cart;
  }
}