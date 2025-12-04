import { prisma } from "../../lib/prisma";
import { CreateUpdateUserDto } from "./user.schema";
export class UserRepository {
  async findAll() {
    const users = await prisma.user.findMany({
      select:{
        id: true,
        email: true,
        google_id: true,
        created_at: true,
        updated_at: true
      }
    });
    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select:{
        id: true,
        email: true,
        google_id: true,
        created_at: true,
        updated_at: true
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
      select:{
        id: true,
        email: true,
        google_id: true,
        created_at: true,
        updated_at: true
      }
    });
    return user;
  }
}
