import { Prisma } from "generated/prisma/client";
import { OrderRepository } from "./order.repository";

export class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async getAllOrders() {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string) {
    return this.orderRepository.findById(id);
  }

  async createOrder(data: Prisma.OrderCreateInput) {
    return this.orderRepository.create(data);
  }

  async updateOrder(id: string, data: Prisma.OrderUpdateInput) {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string) {
    return this.orderRepository.delete(id);
  }
}

