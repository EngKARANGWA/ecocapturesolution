import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM openings ORDER BY created_at DESC');
  res.json(rows.map(r => ({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at })));
});

router.post('/', requireAuth, async (req, res) => {
  const { title, type, location, desc, tags, status } = req.body;
  const id = Date.now().toString();
  const { rows } = await pool.query(
    'INSERT INTO openings (id, title, type, location, description, tags, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [id, title, type, location, desc, JSON.stringify(tags ?? []), status ?? 'open']
  );
  const r = rows[0];
  res.status(201).json({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at });
});

router.put('/:id', requireAuth, async (req, res) => {
  const { title, type, location, desc, tags, status } = req.body;
  const { rows } = await pool.query(
    `UPDATE openings SET
       title       = COALESCE($2, title),
       type        = COALESCE($3, type),
       location    = COALESCE($4, location),
       description = COALESCE($5, description),
       tags        = COALESCE($6, tags),
       status      = COALESCE($7, status)
     WHERE id = $1 RETURNING *`,
    [req.params.id, title, type, location, desc, tags ? JSON.stringify(tags) : null, status]
  );
  if (!rows.length) { res.status(404).json({ error: 'Not found' }); return; }
  const r = rows[0];
  res.json({ id: r.id, title: r.title, type: r.type, location: r.location, desc: r.description, tags: r.tags, status: r.status, createdAt: r.created_at });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM openings WHERE id = $1', [req.params.id]);
  if (!rowCount) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ok: true });
});

export default router;
