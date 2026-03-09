import { NextFunction, Request, Response } from "express";
import { NotificationService } from "./notification.service";

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.notificationService.findAll();
      res.json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await this.notificationService.findById(id as string);
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.notificationService.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await this.notificationService.update(id as string, req.body);
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.notificationService.delete(id as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
