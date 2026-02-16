import { faker } from "@faker-js/faker";
import { Prisma } from "../../generated/prisma/client";

export function shopFactory(
  overrides?: Partial<Prisma.ShopCreateInput>
): Omit<Prisma.ShopCreateInput, "owner"> & Partial<Pick<Prisma.ShopCreateInput, "owner">> {
  return {
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    ...overrides,
  };
}

