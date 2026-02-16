import { NextFunction, Response, Request } from "express";
import { UserService } from "./user.service";
import { IApiResponse } from "../../shared/api.types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      const response: IApiResponse = {
        success: true,
        data: users,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id as string);
      const response: IApiResponse = {
        success: true,
        data: user,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }

  };
}
