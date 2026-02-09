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

  googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as any;
      console.log("[OAuth] Authentication successful for user:", user?.email);

      const code = await this.authService.generateOAuthCode(user.id);

      res.json({
        success: true,
        code,
        expires_in: 300,
      });
    } catch (error) {
      next(error);
    }
  };

  googleError = async (req: Request, res: Response, next: NextFunction) => {
    const error = req.query.error as string;
    console.error("[OAuth] Authentication failed:", error || "Unknown error");
    res.status(401).json({
      success: false,
      error: error || "Authentication failed",
      message: "Google OAuth authentication failed",
    });
  };

  googleTokens = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;

      if (!code) {
        return res.status(400).json({
          success: false,
          error: "Code is required",
        });
      }

      const tokenData = await this.authService.exchangeOAuthCode(code);

      res.json({
        success: true,
        access_token: tokenData.accessToken,
        refresh_token: tokenData.refreshToken,
        expires_in: tokenData.expiresIn,
        user_id: tokenData.userId,
      });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(400).json({
          success: false,
          error: "Refresh token is required",
        });
      }

      const tokenData = await this.authService.refreshAccessToken(refresh_token);

      res.json({
        success: true,
        access_token: tokenData.accessToken,
        expires_in: tokenData.expiresIn,
        user_id: tokenData.userId,
      });
    } catch (error) {
      next(error);
    }
  };
}
