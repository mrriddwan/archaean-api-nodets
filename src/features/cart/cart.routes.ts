import { authenticate } from "@/middleware/auth.middleware";
import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router();

router.use(authenticate);

const { getCartByUserId } = new CartController()

router.get('/user/cart', authenticate, getCartByUserId)

export const cartRoutes = router;