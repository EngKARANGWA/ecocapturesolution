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
    const positionTitle = body['Position Applied For'];
    let openingId = null;
    if (typeof positionTitle === 'string' && positionTitle.trim()) {
        const { rows } = await db_1.pool.query('SELECT id FROM openings WHERE lower(title) = lower($1) LIMIT 1', [positionTitle.trim()]);
        openingId = rows[0]?.id ?? null;
    }
    await db_1.pool.query('INSERT INTO applications (id, opening_id, data) VALUES ($1, $2, $3)', [id, openingId, JSON.stringify(body)]);
    res.status(201).json({ ok: true });
});
// Protected — dashboard only
router.get('/', auth_1.requireAuth, async (req, res) => {
    const openingId = req.query.openingId;
    const { rows } = await db_1.pool.query(`SELECT a.id, a.opening_id AS "openingId", o.title AS "openingTitle",
            a.data, a.status, a.submitted_at AS "submittedAt"
     FROM applications a
     LEFT JOIN openings o ON o.id = a.opening_id
     WHERE ($1::text IS NULL OR a.opening_id = $1)
     ORDER BY a.submitted_at DESC`, [openingId ?? null]);
    res.json(rows);
});
router.patch('/:id', auth_1.requireAuth, async (req, res) => {
    const { status } = req.body;
    const { rows } = await db_1.pool.query('UPDATE applications SET status = $2 WHERE id = $1 RETURNING id', [req.params.id, status]);
    if (!rows.length) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json({ ok: true });
});
router.delete('/:id', auth_1.requireAuth, async (req, res) => {
    await db_1.pool.query('DELETE FROM applications WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
});
exports.default = router;
