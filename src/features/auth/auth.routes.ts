import { Router } from "express";
import { AuthController } from ".";
import { validateRequest } from "@/middleware/validation.middleware";
import { createUpdateUserSchema } from "../user";
import { loginSchema } from "./auth.schema";
import passport from "passport";

const router = Router();
const authController = new AuthController();
const { register, login, googleCallback, googleError, googleTokens, refresh } = authController;

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
  googleCallback
);

// Error endpoint
router.get("/google/error", googleError);

// OAuth token exchange endpoint
router.post("/google/tokens", googleTokens);

// Refresh token endpoint
router.post("/refresh", refresh);

export const authRoutes = router;
