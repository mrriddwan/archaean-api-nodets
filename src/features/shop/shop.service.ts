import { Prisma } from "generated/prisma/client";
import { ShopRepository } from "./shop.repository";

export class ShopService {
  private shopRepository: ShopRepository;
  constructor() {
    this.shopRepository = new ShopRepository();
  }

  async getAllShops() {
    return this.shopRepository.findAll();
  }

  async getShopById(id: string) {
    return this.shopRepository.findById(id);
  }

  async createShop(data: Prisma.ShopCreateInput) {
    return this.shopRepository.create(data);
  }

  async updateShop(id: string, data: Prisma.ShopUpdateInput) {
    return this.shopRepository.update(id, data);
  }

  async deleteShop(id: string) {
    return this.shopRepository.delete(id);
  }
}

