import { faker } from "@faker-js/faker";
import { Prisma } from "../../generated/prisma/client";

export function productFactory(
  overrides?: Partial<Prisma.ProductCreateInput>
): Omit<Prisma.ProductCreateInput, "shop"> & Partial<Pick<Prisma.ProductCreateInput, "shop">> {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    ...overrides,
  };
}

