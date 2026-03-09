import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { createNotificationSchema, updateNotificationSchema } from "./notification.schema";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();
const controller = new NotificationController();

router.use(authenticate);

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", validateRequest(createNotificationSchema), controller.create.bind(controller));
router.put("/:id", validateRequest(updateNotificationSchema), controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export const notificationRoutes = router;
