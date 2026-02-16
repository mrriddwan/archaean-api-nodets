import { Router } from "express";
import { PermissionController } from "./permission.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const permissionController = new PermissionController();

router.get("/", permissionController.getAllPermissions.bind(permissionController));
router.get("/:id", permissionController.getPermissionById.bind(permissionController));
router.post("/", permissionController.createPermission.bind(permissionController));
router.put("/:id", permissionController.updatePermission.bind(permissionController));
router.delete("/:id", permissionController.deletePermission.bind(permissionController));

export const permissionRoutes = router;

