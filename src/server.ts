import "dotenv/config";

import { createApp } from "./app";
import logger from "./config/logger";
import { prisma } from "./lib/prisma";

const app = createApp();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:" + error);
    process.exit(1);
  }
};

startServer();

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, closing server...");
  await prisma.$disconnect();
  process.exit(0);
});
