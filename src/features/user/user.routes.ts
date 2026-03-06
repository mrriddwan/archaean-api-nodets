import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const userController = new UserController();

router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));

export const userRoutes = router;
