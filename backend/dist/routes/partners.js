"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, async (_req, res) => {
    const { rows } = await db_1.pool.query('SELECT * FROM partners ORDER BY created_at DESC');
    res.json(rows.map(r => ({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at })));
});
router.post('/', auth_1.requireAuth, async (req, res) => {
    const { name, logo, website, type, status } = req.body;
    const id = Date.now().toString();
    const { rows } = await db_1.pool.query('INSERT INTO partners (id, name, logo, website, type, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id, name, logo ?? '', website ?? '', type, status ?? 'active']);
    const r = rows[0];
    res.status(201).json({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at });
});
router.put('/:id', auth_1.requireAuth, async (req, res) => {
    const { name, logo, website, type, status } = req.body;
    const { rows } = await db_1.pool.query(`UPDATE partners SET
       name    = COALESCE($2, name),
       logo    = COALESCE($3, logo),
       website = COALESCE($4, website),
       type    = COALESCE($5, type),
       status  = COALESCE($6, status)
     WHERE id = $1 RETURNING *`, [req.params.id, name, logo, website, type, status]);
    if (!rows.length) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const r = rows[0];
    res.json({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at });
});
router.delete('/:id', auth_1.requireAuth, async (req, res) => {
    const { rowCount } = await db_1.pool.query('DELETE FROM partners WHERE id = $1', [req.params.id]);
    if (!rowCount) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json({ ok: true });
});
exports.default = router;
