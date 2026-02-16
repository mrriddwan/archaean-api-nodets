import z from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;

