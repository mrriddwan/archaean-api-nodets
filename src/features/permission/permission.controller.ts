import { NextFunction, Request, Response } from "express";
import { PermissionService } from "./permission.service";

export class PermissionController {
  private permissionService: PermissionService;
  constructor() {
    this.permissionService = new PermissionService();
  }

  async getAllPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = await this.permissionService.getAllPermissions();
      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }

  async getPermissionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const permission = await this.permissionService.getPermissionById(id as string);
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }

  async createPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;
      const permission = await this.permissionService.createPermission({
        name,
        code,
      });
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }

  async updatePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, code } = req.body;
      const permission = await this.permissionService.updatePermission(id as string, {
        name,
        code,
      });
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }

  async deletePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const permission = await this.permissionService.deletePermission(id as string);
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
}

