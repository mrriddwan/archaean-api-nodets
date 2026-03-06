import z from "zod";

export const addProductToCartSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
});

export const removeProductFromCartSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
});

export type AddProductToCartDto = z.infer<typeof addProductToCartSchema>;
