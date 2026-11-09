import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
export function notFound(_req: Request, res: Response) { res.status(404).json({ success: false, message: "Endpoint not found" }); }
export function errorHandler(err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, message: status === 500 ? "Unexpected server error" : err.message });
}
