
import z from "zod";
import { NotificationType } from "./notification.enum";

export const createNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  message: z.string().optional(),
  data: z.any().optional(),
  type: z.enum(NotificationType),
  // Add more fields as needed for your feature
});

export const updateNotificationSchema = createNotificationSchema.partial();

export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationDto = z.infer<typeof updateNotificationSchema>;
