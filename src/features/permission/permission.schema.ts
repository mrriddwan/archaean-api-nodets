import z from "zod";

export const createPermissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
});

export type CreatePermissionDto = z.infer<typeof createPermissionSchema>;

