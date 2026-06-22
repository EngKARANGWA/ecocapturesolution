import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production';
const COOKIE = 'eco_session';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token =
    (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null) ??
    req.cookies?.[COOKIE];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    (req as Request & { user: unknown }).user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Session expired' });
  }
}
