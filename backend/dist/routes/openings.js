"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, async (_req, res) => {
    const { rows } = await db_1.pool.query('SELECT * FROM openings ORDER BY created_at DESC');
    res.json(rows.map(r => ({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at })));
});
router.post('/', auth_1.requireAuth, async (req, res) => {
    const { title, type, location, desc, tags, status } = req.body;
    const id = Date.now().toString();
    const { rows } = await db_1.pool.query('INSERT INTO openings (id, title, type, location, description, tags, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [id, title, type, location, desc, JSON.stringify(tags ?? []), status ?? 'open']);
    const r = rows[0];
    res.status(201).json({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at });
});
router.put('/:id', auth_1.requireAuth, async (req, res) => {
    const { title, type, location, desc, tags, status } = req.body;
    const { rows } = await db_1.pool.query(`UPDATE openings SET
       title       = COALESCE($2, title),
       type        = COALESCE($3, type),
       location    = COALESCE($4, location),
       description = COALESCE($5, description),
       tags        = COALESCE($6, tags),
       status      = COALESCE($7, status)
     WHERE id = $1 RETURNING *`, [req.params.id, title, type, location, desc, tags ? JSON.stringify(tags) : null, status]);
    if (!rows.length) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const r = rows[0];
    res.json({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at });
});
router.delete('/:id', auth_1.requireAuth, async (req, res) => {
    const { rowCount } = await db_1.pool.query('DELETE FROM openings WHERE id = $1', [req.params.id]);
    if (!rowCount) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json({ ok: true });
});
exports.default = router;
