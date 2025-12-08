import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const { getAllUsers, getUserById } = new UserController();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export const userRoutes = router;
