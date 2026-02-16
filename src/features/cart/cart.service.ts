import { CartRepository } from "./cart.repository";
import { Prisma } from "generated/prisma/client";

export class CartService {
 constructor(private readonly cartRepository: CartRepository) { }

 async getCartByUserId(userId: string) {
  return this.cartRepository.findByUserId(userId);
 }

 async createCart(userId: string) {
  return this.cartRepository.create(userId);
 }

 async updateCart(id: string, data: Prisma.CartUpdateInput) {
  return this.cartRepository.update(id, data);
 }

 async deleteCart(id: string) {
  return this.cartRepository.delete(id);
 }
}