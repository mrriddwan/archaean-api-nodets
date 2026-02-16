import { Router } from "express";
import { OrderController } from "./order.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const orderController = new OrderController();

router.get("/", orderController.getAllOrders.bind(orderController));
router.get("/:id", orderController.getOrderById.bind(orderController));
router.post("/", orderController.createOrder.bind(orderController));
router.put("/:id", orderController.updateOrder.bind(orderController));
router.delete("/:id", orderController.deleteOrder.bind(orderController));

export const orderRoutes = router;

