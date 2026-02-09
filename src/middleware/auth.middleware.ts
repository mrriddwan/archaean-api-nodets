import { prisma } from "@/lib/prisma";
import { AppError, ErrorCode } from "@/shared/error.types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(
      ErrorCode.UNAUTHORIZED,
      "Token not provided",
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    // verify token is an access token
    if (decoded.type !== "access") {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Invalid token type",
        StatusCodes.UNAUTHORIZED
      );
    }

    // verify token exists in database
    const tokenRecord = await prisma.token.findUnique({
      where: { token },
    });

    if (!tokenRecord || tokenRecord.type !== "access") {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Token not found or invalid",
        StatusCodes.UNAUTHORIZED
      );
    }

    // check if token is expired in database
    if (new Date() > tokenRecord.expiresAt) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Token expired",
        StatusCodes.UNAUTHORIZED
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "User not found",
        StatusCodes.UNAUTHORIZED
      );
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ErrorCode.UNAUTHORIZED,
      "Invalid token",
      StatusCodes.UNAUTHORIZED
    );
  }
};
