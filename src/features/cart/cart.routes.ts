import { authenticate } from "@/middleware/auth.middleware";
import { Router } from "express";
import { CartController } from "./cart.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { addProductToCartSchema, removeProductFromCartSchema } from "./cart.schema";

const router = Router();

router.use(authenticate);

const cartController = new CartController();

router.get('/user', authenticate, cartController.getCartByUser.bind(cartController))
router.post('/add-product', authenticate, validateRequest(addProductToCartSchema), cartController.addProductToCart.bind(cartController))
router.delete('/remove-product', authenticate, validateRequest(removeProductFromCartSchema), cartController.removeProductFromCart.bind(cartController))

export const cartRoutes = router;