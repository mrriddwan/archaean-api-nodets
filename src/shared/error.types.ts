import { StatusCodes } from "http-status-codes";

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class AppError extends Error {
 constructor(
   public code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
   public message: string = 'Something went wrong',
   public status: number = StatusCodes.INTERNAL_SERVER_ERROR,
   public details?: any
 ){
   super(message);
   this.name = 'AppError';
   Error.captureStackTrace(this, this.constructor);
 }
}