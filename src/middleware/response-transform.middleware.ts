import { Request, Response, NextFunction } from "express";
import { toSnakeCase } from "@/shared/transform.util";

/**
 * Normalizes JSON body to IApiResponse shape.
 * - 2xx + raw data → { success: true, data }
 * - 4xx/5xx + object with message but no success → { success: false, message, code }
 * Then converts keys to snake_case.
 */
function normalizeToApiResponse(res: Response, body: any): any {
  const status = res.statusCode;
  const isSuccess = status >= 200 && status < 300;
  const alreadyShaped =
    body != null &&
    typeof body === "object" &&
    "success" in body;

  if (alreadyShaped) return body;

  if (isSuccess) {
    return { success: true, data: body };
  }

  if (
    status >= 400 &&
    body != null &&
    typeof body === "object" &&
    "message" in body
  ) {
    return {
      success: false,
      message: body.message,
      code: body.code ?? "ERROR",
    };
  }

  return body;
}

/**
 * Middleware that:
 * 1. Wraps successful (2xx) JSON responses in IApiResponse format when not already shaped.
 * 2. Converts all JSON response keys to snake_case.
 */
export const responseTransformMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json.bind(res);

  res.json = function (body?: any) {
    const normalized = normalizeToApiResponse(res, body);
    const transformed = normalized ? toSnakeCase(normalized) : normalized;
    return originalJson(transformed);
  };

  next();
};

