import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public — anyone can submit
router.post('/', async (req, res) => {
  const body = req.body as Record<string, unknown>;
  if (!body || Object.keys(body).length === 0) {
    res.status(400).json({ error: 'No data provided' }); return;
  }
  const id = Date.now().toString();
  await pool.query(
    'INSERT INTO inquiries (id, data) VALUES ($1, $2)',
    [id, JSON.stringify(body)]
  );
  res.status(201).json({ ok: true });
});

// Protected — dashboard only
router.get('/', requireAuth, async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM inquiries ORDER BY submitted_at DESC');
  res.json(rows.map(r => ({ id: r.id, ...r.data, status: r.status, submittedAt: r.submitted_at })));
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM inquiries WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
