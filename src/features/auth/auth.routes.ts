import { Router } from "express";
import { AuthController } from ".";
import { validateRequest } from "@/middleware/validation.middleware";
import { createUpdateUserSchema } from "../user";
import { loginSchema } from "./auth.schema";
import passport from "passport";

const router = Router();
const { register, login } = new AuthController();

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
  (req, res) => {
    const user = req.user as any;
    console.log("[OAuth] Authentication successful for user:", user?.email);
    res.json({
      success: true,
      message: "Google OAuth authentication successful",
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
    });
  }
);

// Success endpoint
router.get("/google/success", (req, res) => {
  res.json({
    success: true,
    message: "Google OAuth authentication successful",
    user: req.user,
  });
});

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

export const authRoutes = router;
