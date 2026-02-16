import { prisma } from "../../src/lib/prisma";
import { productFactory } from "../factories";

export async function seedProducts(productsPerShop: number = 5) {
  await prisma.product.deleteMany({});

  // Get all existing shops
  const shops = await prisma.shop.findMany({
    select: { id: true, name: true },
  });

  if (shops.length === 0) {
    console.log("→ No shops found. Cannot seed products.");
    return;
  }

  console.log(`→ Seeding ${productsPerShop} products for ${shops.length} shops...`);

  let totalProducts = 0;

  // For each shop → create products using factory
  for (const shop of shops) {
    const productsToCreate = Array.from({ length: productsPerShop }).map(() => {
      const productData = productFactory();
      return {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        shopId: shop.id,
      };
    });

    await prisma.product.createMany({
      data: productsToCreate,
      skipDuplicates: true,
    });

    totalProducts += productsToCreate.length;
    console.log(`  ✓ Created ${productsToCreate.length} products for shop "${shop.name}"`);
  }

  console.log(`→ Product seeding finished. Total: ${totalProducts} products`);
}