import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class ProductRepository {

 async findAll() {
  const products = await prisma.product.findMany({
   select: {
    id: true,
    name: true,
    description: true,
    price: true,
    createdAt: true,
    updatedAt: true,
    shop: {
      select: {
        id: true,
        name: true,
      },
    },
   },
  });
  return products;
 }

 async findById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
 }

 async create(data: Prisma.ProductCreateInput) {
  const product = await prisma.product.create({ data });
  return product;
 }

 async update(id: string, data: Prisma.ProductUpdateInput) {
  const product = await prisma.product.update({ where: { id }, data });
  return product;
 }

 async delete(id: string) {
  const product = await prisma.product.delete({ where: { id } });
  return product;
 }
}