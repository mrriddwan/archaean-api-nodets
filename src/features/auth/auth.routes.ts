import { Router } from "express";
import { AuthController } from ".";
import { AuthService } from "./auth.service";
import { validateRequest } from "@/middleware/validation.middleware";
import { createUpdateUserSchema } from "../user";
import { loginSchema } from "./auth.schema";
import passport from "passport";

const router = Router();
const { register, login } = new AuthController();
const authService = new AuthService();

// internal
router.post("/register", validateRequest(createUpdateUserSchema), register);
router.post("/login", validateRequest(loginSchema), login);

// Google OAuth - initiate
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["openid", "email", "profile"],
    session: false,
    accessType: "offline",
    prompt: "consent",
  })
);

// Google OAuth - callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/v1/auth/google/error",
  }),
  async (req, res, next) => {
    try {
      const user = req.user as any;
      console.log("[OAuth] Authentication successful for user:", user?.email);

      const code = await authService.generateOAuthCode(user.id);

      res.json({
        success: true,
        code,
        expires_in: 300, // 5 minutes in seconds
      });
    } catch (error) {
      next(error);
    }
  }
);

// Error endpoint
router.get("/google/error", (req, res) => {
  const error = req.query.error as string;
  console.error("[OAuth] Authentication failed:", error || "Unknown error");
  res.status(401).json({
    success: false,
    error: error || "Authentication failed",
    message: "Google OAuth authentication failed",
  });
});

// OAuth token exchange endpoint
router.post("/google/tokens", async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Code is required",
      });
    }

    const tokenData = await authService.exchangeOAuthCode(code);

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
});

// Refresh token endpoint
router.post("/refresh", async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: "Refresh token is required",
      });
    }

    const tokenData = await authService.refreshAccessToken(refresh_token);

    res.json({
      success: true,
      access_token: tokenData.accessToken,
      expires_in: tokenData.expiresIn,
      user_id: tokenData.userId,
    });
  } catch (error) {
    next(error);
  }
});

export const authRoutes = router;
