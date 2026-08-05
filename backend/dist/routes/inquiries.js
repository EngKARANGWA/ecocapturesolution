"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public — anyone can submit
router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
        res.status(400).json({ error: 'No data provided' });
        return;
    }
    const id = Date.now().toString();
    await db_1.pool.query('INSERT INTO inquiries (id, data) VALUES ($1, $2)', [id, JSON.stringify(body)]);
    res.status(201).json({ ok: true });
});
// Protected — dashboard only
router.get('/', auth_1.requireAuth, async (_req, res) => {
    const { rows } = await db_1.pool.query('SELECT id, data, status, submitted_at AS "submittedAt" FROM inquiries ORDER BY submitted_at DESC');
    res.json(rows);
});
router.patch('/:id', auth_1.requireAuth, async (req, res) => {
    const { status } = req.body;
    const { rows } = await db_1.pool.query('UPDATE inquiries SET status = $2 WHERE id = $1 RETURNING id', [req.params.id, status]);
    if (!rows.length) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json({ ok: true });
});
router.delete('/:id', auth_1.requireAuth, async (req, res) => {
    await db_1.pool.query('DELETE FROM inquiries WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
});
exports.default = router;
