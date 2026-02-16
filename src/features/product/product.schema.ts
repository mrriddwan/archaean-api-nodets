import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  shopId: z.string().min(1, "Shop ID is required"),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;

