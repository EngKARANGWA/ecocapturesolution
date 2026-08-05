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
  const { rows } = await pool.query(
    'SELECT id, data, status, submitted_at AS "submittedAt" FROM inquiries ORDER BY submitted_at DESC'
  );
  res.json(rows);
});

router.patch('/:id', requireAuth, async (req, res) => {
  const { status } = req.body as { status: string };
  const { rows } = await pool.query(
    'UPDATE inquiries SET status = $2 WHERE id = $1 RETURNING id',
    [req.params.id, status]
  );
  if (!rows.length) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM inquiries WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
