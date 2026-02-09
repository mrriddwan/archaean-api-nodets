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
      const {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        userId,
      } = await this.authService.login(req.body);
      const response: IApiResponse = {
        message: "Login successful",
        success: true,
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: accessTokenExpiresAt,
          user_id: userId,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
