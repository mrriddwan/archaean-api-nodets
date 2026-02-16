import { NextFunction, Request, Response } from "express";
import { RoleService } from "./role.service";

export class RoleController {
  private roleService: RoleService;
  constructor() {
    this.roleService = new RoleService();
  }

  async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const role = await this.roleService.getRoleById(id as string);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }

  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;
      const role = await this.roleService.createRole({
        name,
        code,
      });
      res.json(role);
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, code } = req.body;
      const role = await this.roleService.updateRole(id as string, {
        name,
        code,
      });
      res.json(role);
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const role = await this.roleService.deleteRole(id as string);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }
}

