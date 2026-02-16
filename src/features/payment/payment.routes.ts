import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const paymentController = new PaymentController();

router.get("/", paymentController.getAllPayments.bind(paymentController));
router.get("/:id", paymentController.getPaymentById.bind(paymentController));
router.post("/", paymentController.createPayment.bind(paymentController));
router.put("/:id", paymentController.updatePayment.bind(paymentController));
router.delete("/:id", paymentController.deletePayment.bind(paymentController));

export const paymentRoutes = router;

