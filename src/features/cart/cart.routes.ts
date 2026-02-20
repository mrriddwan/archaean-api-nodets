import { authenticate } from "@/middleware/auth.middleware";
import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router();

router.use(authenticate);

const { getCartByUserId, addProductToCart } = new CartController();

router.get('/user/cart', authenticate, getCartByUserId)
router.post('/user/cart/add-product', authenticate, addProductToCart)

export const cartRoutes = router;