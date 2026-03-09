import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class CartRepository {
  async findByUserId(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });
    return cart;
  }

  async addProductToCart(userId: string, productId: string) {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: {
        cartItems: { include: { product: true } },
      },
    });

    await prisma.cartItem.upsert({
      where: {
        productId_cartId: {
          productId,
          cartId: cart.id,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        productId,
        cartId: cart.id,
        quantity: 1,
      },
      include: {
        product: true,
      },
    });

    return prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: { include: { product: true } },
      },
    });
  }

  async removeProductFromCart(userId: string, productId: string) {

    const cart = await prisma.cart.findUnique({ where: { userId }, include: { cartItems: { include: { product: true } } } });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { productId, cartId: cart.id },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    await prisma.cartItem.update({
      where: { productId_cartId: { productId, cartId: cart.id } },
      data: { quantity: { decrement: 1 } },
    });

    if (cartItem.quantity === 0) {
      await prisma.cartItem.delete({
        where: { productId_cartId: { productId, cartId: cart.id } },
      });
    }

    return prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: { include: { product: true } },
      },
    });
  }
}