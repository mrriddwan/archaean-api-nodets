import { faker } from "@faker-js/faker";
import { Prisma } from "../../generated/prisma/client";
import argon2 from "argon2";

export async function userFactory(
  overrides?: Partial<Prisma.UserCreateInput>
): Promise<Prisma.UserCreateInput> {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: await argon2.hash('password123'),
    ...overrides,
  };
}

