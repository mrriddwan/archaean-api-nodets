import { Router } from "express";
import { ShopController } from "./shop.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const shopController = new ShopController();

router.get("/", shopController.getAllShops.bind(shopController));
router.get("/:id", shopController.getShopById.bind(shopController));
router.post("/", shopController.createShop.bind(shopController));
router.put("/:id", shopController.updateShop.bind(shopController));
router.delete("/:id", shopController.deleteShop.bind(shopController));

export const shopRoutes = router;

