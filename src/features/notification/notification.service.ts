import { Prisma } from "generated/prisma/client";
import { NotificationRepository } from "./notification.repository";

export class NotificationService {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async create(data: Prisma.NotificationCreateInput) {
    return this.repository.create(data);
  }

  async update(id: string, data: Prisma.NotificationUpdateInput) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
