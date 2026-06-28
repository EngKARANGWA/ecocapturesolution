"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'ecocapturesolutions@gmail.com';
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'keventO7$';
const JWT_SECRET = process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production';
const COOKIE = 'eco_session';
const isProd = process.env.NODE_ENV === 'production';
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
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
exports.default = router;
