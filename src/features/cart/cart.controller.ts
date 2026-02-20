import { NextFunction, Request, Response } from "express";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";
import { User } from "generated/prisma/client";

export class CartController {
 private cartService: CartService;
 constructor() {
  this.cartService = new CartService(new CartRepository());
 }

 async getCartByUserId(req: Request, res: Response, next: NextFunction) {
  try {
   const user = req.user as User | undefined;
   const userId = user?.id;

   if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
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
   const { productId } = req.body;
   const cart = await this.cartService.addProductToCart(user?.id as string, productId as string);
   res.json(cart);
  } catch (error) {
   next(error);
  }
 }

 async createCart(req: Request, res: Response, next: NextFunction) {
  try {
   const { userId } = req.params;
   const cart = await this.cartService.createCart(userId as string);
   res.json(cart);
  } catch (error) {
   next(error);
  }
 }

 async updateCart(req: Request, res: Response, next: NextFunction) {
  try {
   const { id } = req.params;
   const { data } = req.body;
   const cart = await this.cartService.updateCart(id as string, data);
   res.json(cart);
  } catch (error) {
   next(error);
  }
 }
}