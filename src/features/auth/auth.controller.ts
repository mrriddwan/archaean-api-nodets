import { IApiResponse } from "../../shared";
import { AuthService } from "./auth.service";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.register(req.body);
      const response: IApiResponse = {
        message: "User registered successfully",
        success: true,
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, expiresAt } = await this.authService.login(req.body);
      const response: IApiResponse = {
        message: "Login successful",
        success: true,
        data: { token: token, expires_at: expiresAt },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
