import { prisma } from "@/lib/prisma";
import { AppError, ErrorCode } from "@/shared/error.types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { th } from "zod/v4/locales";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(
      ErrorCode.UNAUTHORIZED,
      "Token not provided",
      StatusCodes.UNAUTHORIZED
    );
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET as string
    ) as any;

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

    const tokenExpired = new Date(decoded.expiresAt) < new Date();
    if (tokenExpired) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Token expired",
        StatusCodes.UNAUTHORIZED
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new AppError(
      ErrorCode.UNAUTHORIZED,
      "Invalid token",
      StatusCodes.UNAUTHORIZED
    );
  }
};
