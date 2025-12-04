import z, { email } from "zod";

export const createUpdateUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required").optional(),
});

export type CreateUpdateUserDto = z.infer<typeof createUpdateUserSchema>;
