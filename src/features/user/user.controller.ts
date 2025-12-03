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
}
