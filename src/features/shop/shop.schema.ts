import z from "zod";

export const createShopSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ownerId: z.string().min(1, "Owner ID is required"),
});

export type CreateShopDto = z.infer<typeof createShopSchema>;

