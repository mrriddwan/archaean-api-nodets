import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {
  private paymentService: PaymentService;
  constructor() {
    this.paymentService = new PaymentService();
  }

  async getAllPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await this.paymentService.getAllPayments();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }

  async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPaymentById(id as string);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount, status, orderId } = req.body;
      const payment = await this.paymentService.createPayment({
        amount,
        status,
        order: {
          connect: {
            id: orderId,
          },
        },
      });
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { amount, status } = req.body;
      const payment = await this.paymentService.updatePayment(id as string, {
        amount,
        status,
      });
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  async deletePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.deletePayment(id as string);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
}

