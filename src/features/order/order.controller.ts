import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";

export class OrderController {
  private orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id as string);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { quantity, total, productId, userId } = req.body;
      const order = await this.orderService.createOrder({
        quantity,
        total,
        productId,
        user: {
          connect: {
            id: userId,
          },
        },
        products: {
          create: {
            product: {
              connect: {
                id: productId,
              },
            },
          },
        },
      });
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantity, total } = req.body;
      const order = await this.orderService.updateOrder(id as string, {
        quantity,
        total,
      });
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await this.orderService.deleteOrder(id as string);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

