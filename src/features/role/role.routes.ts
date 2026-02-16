import { Router } from "express";
import { RoleController } from "./role.controller";
import { authenticate } from "@/middleware/auth.middleware";

const router = Router();

router.use(authenticate);

const roleController = new RoleController();

router.get("/", roleController.getAllRoles.bind(roleController));
router.get("/:id", roleController.getRoleById.bind(roleController));
router.post("/", roleController.createRole.bind(roleController));
router.put("/:id", roleController.updateRole.bind(roleController));
router.delete("/:id", roleController.deleteRole.bind(roleController));

export const roleRoutes = router;

