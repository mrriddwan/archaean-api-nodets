import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

// router.use(authenticate);

const productController = new ProductController();

router.get("/", productController.getAllProducts.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.post("/create", productController.createProduct.bind(productController));

export const productRoutes = router;

