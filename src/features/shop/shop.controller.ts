import { NextFunction, Request, Response } from "express";
import { ShopService } from "./shop.service";

export class ShopController {
  private shopService: ShopService;
  constructor() {
    this.shopService = new ShopService();
  }

  async getAllShops(req: Request, res: Response, next: NextFunction) {
    try {
      const shops = await this.shopService.getAllShops();
      res.json(shops);
    } catch (error) {
      next(error);
    }
  }

  async getShopById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const shop = await this.shopService.getShopById(id as string);
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }

  async createShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, ownerId } = req.body;
      const shop = await this.shopService.createShop({
        name,
        description,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      });
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }

  async updateShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const shop = await this.shopService.updateShop(id as string, {
        name,
        description,
      });
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }

  async deleteShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const shop = await this.shopService.deleteShop(id as string);
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }
}

