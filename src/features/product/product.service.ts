import { Prisma } from "generated/prisma/client";
import { ProductRepository } from "./product.repository";

export class ProductService {
 private productRepository: ProductRepository;
 constructor() {
  this.productRepository = new ProductRepository();
 }

 async getAllProducts() {
  return this.productRepository.findAll();
 }

 async getProductById(id: string) {
  return this.productRepository.findById(id);
 }

 async createProduct(data: Prisma.ProductCreateInput) {
  return this.productRepository.create(data);
 }

 async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
  return this.productRepository.update(id, data);
 }

 async deleteProduct(id: string) {
  return this.productRepository.delete(id);
 }
}