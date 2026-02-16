import z from "zod";

export const createPaymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  status: z.string().min(1, "Status is required"),
  orderId: z.string().min(1, "Order ID is required"),
});

export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;

