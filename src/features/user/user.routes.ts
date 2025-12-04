import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const { getAllUsers, getUserById } = new UserController();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export const userRoutes = router;
