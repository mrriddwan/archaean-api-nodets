import { AppError } from "@/shared/error.types";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


export const errorHandler = (error: Error|AppError, req: Request, res: Response, next: NextFunction) => {
 if(error instanceof AppError) {
  return res.status(error.status).json({
    message: error.message,
    success: false,
    code: error.code,
  });
 }

 console.log(error);

 return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  message: "Internal Server Error",
  success: false,
  error: process.env.NODE_ENV === "development" ? error.message : undefined,
 });

}