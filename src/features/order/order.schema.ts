import z from "zod";

export const createOrderSchema = z.object({
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  total: z.number().positive("Total must be positive"),
  productId: z.string().min(1, "Product ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

