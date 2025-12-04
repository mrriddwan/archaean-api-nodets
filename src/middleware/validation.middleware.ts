import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z, { ZodError } from "zod";

export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
   console.log(req.body);
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => {
          console.log(issue);
          return {
            message: `${issue.path.join(".")} - ${issue.message}`,
          };
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation Error",
          success: false,
          errors: errorMessages,
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };
}
