import { prisma } from "../../lib/prisma";
export class UserRepository {
  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async create(data: { email: string; password: string }) {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  }

  async update(id: string, data: { email?: string; password?: string }) {
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
}
