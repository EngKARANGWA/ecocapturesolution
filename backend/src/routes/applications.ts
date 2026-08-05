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
  const positionTitle = body['Position Applied For'];
  let openingId: string | null = null;
  if (typeof positionTitle === 'string' && positionTitle.trim()) {
    const { rows } = await pool.query(
      'SELECT id FROM openings WHERE lower(title) = lower($1) LIMIT 1',
      [positionTitle.trim()]
    );
    openingId = rows[0]?.id ?? null;
  }
  await pool.query(
    'INSERT INTO applications (id, opening_id, data) VALUES ($1, $2, $3)',
    [id, openingId, JSON.stringify(body)]
  );
  res.status(201).json({ ok: true });
});

// Protected — dashboard only
router.get('/', requireAuth, async (req, res) => {
  const openingId = req.query.openingId as string | undefined;
  const { rows } = await pool.query(
    `SELECT a.id, a.opening_id AS "openingId", o.title AS "openingTitle",
            a.data, a.status, a.submitted_at AS "submittedAt"
     FROM applications a
     LEFT JOIN openings o ON o.id = a.opening_id
     WHERE ($1::text IS NULL OR a.opening_id = $1)
     ORDER BY a.submitted_at DESC`,
    [openingId ?? null]
  );
  res.json(rows);
});

router.patch('/:id', requireAuth, async (req, res) => {
  const { status } = req.body as { status: string };
  const { rows } = await pool.query(
    'UPDATE applications SET status = $2 WHERE id = $1 RETURNING id',
    [req.params.id, status]
  );
  if (!rows.length) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM applications WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
