import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productService.getAllProducts();

      // temporary image url attach
      const productsWithImageUrl = products.map((product) => {
        const randomImageId = Math.floor(Math.random() * 1000);
        return {
          ...product,
          imageUrl: `https://picsum.photos/id/${randomImageId}/200/300`,
        }

      });
      res.json(productsWithImageUrl);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id as string);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, shopId } = req.body;
      const product = await this.productService.createProduct({
        name,
        description,
        price,
        shop: {
          connect: {
            id: shopId,
          },
        },
      });
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, price, shopId } = req.body;
      const product = await this.productService.updateProduct(id as string, {
        name,
        description,
        price,
        shop: {
          connect: {
            id: shopId,
          },
        },
      });
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await this.productService.deleteProduct(id as string);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}