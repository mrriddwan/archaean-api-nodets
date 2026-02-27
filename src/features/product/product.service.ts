import { Prisma } from "generated/prisma/client";
import { ProductRepository } from "./product.repository";
import { deleteCache, getCache, setCache } from "@/lib/redis";

const ALL_PRODUCTS_CACHE_KEY = "products:all";
const PRODUCT_BY_ID_CACHE_KEY_PREFIX = "products:id:";
const DEFAULT_TTL_SECONDS = 60;

export class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    const cached = await getCache<Prisma.ProductModel[]>(ALL_PRODUCTS_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const products = await this.productRepository.findAll();
    await setCache(ALL_PRODUCTS_CACHE_KEY, products, DEFAULT_TTL_SECONDS);
    return this.shuffle(products);
  }

  async getProductById(id: string) {
    const cacheKey = `${PRODUCT_BY_ID_CACHE_KEY_PREFIX}${id}`;
    const cached = await getCache<Prisma.ProductModel | null>(cacheKey);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findById(id);
    if (product) {
      await setCache(cacheKey, product, DEFAULT_TTL_SECONDS);
    }
    return product;
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    const product = await this.productRepository.create(data);
    await deleteCache(ALL_PRODUCTS_CACHE_KEY);
    const cacheKey = `${PRODUCT_BY_ID_CACHE_KEY_PREFIX}${product.id}`;
    await setCache(cacheKey, product, DEFAULT_TTL_SECONDS);
    return product;
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    const product = await this.productRepository.update(id, data);
    await deleteCache(ALL_PRODUCTS_CACHE_KEY);
    const cacheKey = `${PRODUCT_BY_ID_CACHE_KEY_PREFIX}${id}`;
    await deleteCache(cacheKey);
    await setCache(cacheKey, product, DEFAULT_TTL_SECONDS);
    return product;
  }

  async deleteProduct(id: string) {
    const deleted = await this.productRepository.delete(id);
    await deleteCache(ALL_PRODUCTS_CACHE_KEY);
    const cacheKey = `${PRODUCT_BY_ID_CACHE_KEY_PREFIX}${id}`;
    await deleteCache(cacheKey);
    return deleted;
  }

  private shuffle<T>(items: T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}