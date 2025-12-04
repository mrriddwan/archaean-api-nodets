import { Router } from "express";
import { AuthController } from ".";
import { validateRequest } from "@/middleware/validation.middleware";
import { createUpdateUserSchema } from "../user";
import { loginSchema } from "./auth.schema";

const router = Router();
const { register, login } = new AuthController();

router.post("/register", validateRequest(createUpdateUserSchema), register);
router.post("/login", validateRequest(loginSchema), login);

export const authRoutes = router;
