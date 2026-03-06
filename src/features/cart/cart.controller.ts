import { NextFunction, Request, Response } from "express";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";
import { User } from "generated/prisma/client";

export class CartController {
  private cartService: CartService;
  constructor() {
    this.cartService = new CartService(new CartRepository());
  }

  async getCartByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User | undefined;
      const userId = user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized", code: "UNAUTHORIZED" });
      }

      const cart = await this.cartService.getCartByUserId(userId);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User | undefined;
      const { product_id } = req.body;
      const cart = await this.cartService.addProductToCart(
        user?.id as string,
        product_id as string
      );
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  async removeProductFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User | undefined;
      const { product_id } = req.body;
      const cart = await this.cartService.removeProductFromCart(user?.id as string, product_id as string);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }
}