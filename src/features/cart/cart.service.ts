import { CartRepository } from "./cart.repository";

export class CartService {
 constructor(private readonly cartRepository: CartRepository) { }

 async getCartByUserId(userId: string) {
  return this.cartRepository.findByUserId(userId);
 }

 async addProductToCart(userId: string, productId: string) {
  return this.cartRepository.addProductToCart(userId, productId);
 }

 async removeProductFromCart(userId: string, productId: string) {
  return this.cartRepository.removeProductFromCart(userId, productId);
 }
}