import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class ShopRepository {
  async findAll() {
    const shops = await prisma.shop.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return shops;
  }

  async findById(id: string) {
    const shop = await prisma.shop.findUnique({ where: { id } });
    return shop;
  }

  async create(data: Prisma.ShopCreateInput) {
    const shop = await prisma.shop.create({ data });
    return shop;
  }

  async update(id: string, data: Prisma.ShopUpdateInput) {
    const shop = await prisma.shop.update({ where: { id }, data });
    return shop;
  }

  async delete(id: string) {
    const shop = await prisma.shop.delete({ where: { id } });
    return shop;
  }
}

