import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppError } from "../utils/AppError";
export interface AuthRequest extends Request { user?: { id: string; role: string; name: string; email: string } }
export async function protect(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : "";
    if (!token) throw new AppError(401, "Authentication required");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError(401, "Account not found");
    req.user = { id: user.id, role: user.role, name: user.name, email: user.email };
    next();
  } catch (error) { next(error instanceof AppError ? error : new AppError(401, "Invalid or expired session")); }
}
export const allowRoles = (...roles: string[]) => (req: AuthRequest, _res: Response, next: NextFunction) =>
  req.user && roles.includes(req.user.role) ? next() : next(new AppError(403, "You do not have permission for this action"));
