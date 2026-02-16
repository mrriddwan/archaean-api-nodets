import { Prisma } from "generated/prisma/client";
import { PaymentRepository } from "./payment.repository";

export class PaymentService {
  private paymentRepository: PaymentRepository;
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async getAllPayments() {
    return this.paymentRepository.findAll();
  }

  async getPaymentById(id: string) {
    return this.paymentRepository.findById(id);
  }

  async createPayment(data: Prisma.PaymentCreateInput) {
    return this.paymentRepository.create(data);
  }

  async updatePayment(id: string, data: Prisma.PaymentUpdateInput) {
    return this.paymentRepository.update(id, data);
  }

  async deletePayment(id: string) {
    return this.paymentRepository.delete(id);
  }
}

