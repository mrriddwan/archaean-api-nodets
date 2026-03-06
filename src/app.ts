import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import { routes } from "./routes";
import { errorHandler } from "./middleware/error.middlesware";
import { responseTransformMiddleware } from "./middleware/response-transform.middleware";
import "./lib/passport";
import { corsOptions } from "./config/cors";

export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors(corsOptions));
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(responseTransformMiddleware);

  // Passport
  app.use(passport.initialize());

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  // Routes
  app.use("/api/v1", routes);

  // Error handling
  // app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
