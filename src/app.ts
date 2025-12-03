import express from "express";
import { prisma } from "./lib/prisma";
import helmet from "helmet";
import cors from "cors";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Routes
app.use("/api/v1", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Error handling
// app.use(notFoundHandler);
// app.use(errorHandler);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
