import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const ADMIN_EMAIL   = process.env.ADMIN_EMAIL ?? 'ecocapturesolutions@gmail.com';
const ADMIN_PASS    = process.env.ADMIN_PASS  ?? 'keventO7$';
const JWT_SECRET    = process.env.JWT_SECRET  ?? 'eco-jwt-secret-change-in-production';
const COOKIE        = 'eco_session';
const isProd        = process.env.NODE_ENV === 'production';

router.post('/login', (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password || email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
  res.json({ ok: true });
});

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE, { path: '/' });
  res.json({ ok: true });
});

export default router;
