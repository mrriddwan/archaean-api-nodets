import { User } from "generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateUpdateUserDto } from "./user.schema";
export class UserRepository {
  async findAll() {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    });
    return users;
  }

  async findById(id: string): Promise<Pick<User, "id" | "email" | "name" | "created_at" | "updated_at"> | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      }
    });
    return user;
  }

  async create(data: CreateUpdateUserDto) {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  }

  async update(id: string, data: CreateUpdateUserDto) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: true
      },
      omit: {
        password: true,
      }
    });
    return user;
  }

  async findByEmailWithPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: true
      }
    });
    return user;
  }
}
