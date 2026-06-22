import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM partners ORDER BY created_at DESC');
  res.json(rows.map(r => ({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at })));
});

router.post('/', requireAuth, async (req, res) => {
  const { name, logo, website, type, status } = req.body;
  const id = Date.now().toString();
  const { rows } = await pool.query(
    'INSERT INTO partners (id, name, logo, website, type, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [id, name, logo ?? '', website ?? '', type, status ?? 'active']
  );
  const r = rows[0];
  res.status(201).json({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at });
});

router.put('/:id', requireAuth, async (req, res) => {
  const { name, logo, website, type, status } = req.body;
  const { rows } = await pool.query(
    `UPDATE partners SET
       name    = COALESCE($2, name),
       logo    = COALESCE($3, logo),
       website = COALESCE($4, website),
       type    = COALESCE($5, type),
       status  = COALESCE($6, status)
     WHERE id = $1 RETURNING *`,
    [req.params.id, name, logo, website, type, status]
  );
  if (!rows.length) { res.status(404).json({ error: 'Not found' }); return; }
  const r = rows[0];
  res.json({ id: r.id, name: r.name, logo: r.logo, website: r.website, type: r.type, status: r.status, createdAt: r.created_at });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM partners WHERE id = $1', [req.params.id]);
  if (!rowCount) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ok: true });
});

export default router;
