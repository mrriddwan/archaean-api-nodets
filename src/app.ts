import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./middleware/error.middlesware";

export const createApp = (): Application => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
