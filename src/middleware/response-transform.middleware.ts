import { Request, Response, NextFunction } from "express";
import { toSnakeCase } from "@/shared/transform.util";

/**
 * Middleware that intercepts all JSON responses and converts them to snake_case
 */
export const responseTransformMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Store the original json method
  const originalJson = res.json.bind(res);

  // Override the json method to transform the response
  res.json = function (body?: any) {
    // Transform the body to snake_case before sending
    const transformedBody = body ? toSnakeCase(body) : body;
    return originalJson(transformedBody);
  };

  next();
};

