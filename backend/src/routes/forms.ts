import { Router } from 'express';
import { pool } from '../db';
import { requireAuth } from '../middleware/auth';
import fs from 'fs';
import path from 'path';

const router = Router();

// Called from index.ts AFTER migration completes
export async function seedFormSchemas() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM form_schemas');
  if (Number(rows[0].count) > 0) return;
  const seedFile = path.join(__dirname, '../../data/form-schemas.json');
  if (!fs.existsSync(seedFile)) return;
  const schemas = JSON.parse(fs.readFileSync(seedFile, 'utf-8')) as Record<string, unknown>;
  for (const [key, schema] of Object.entries(schemas)) {
    await pool.query(
      'INSERT INTO form_schemas (key, schema) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
      [key, JSON.stringify(schema)]
    );
  }
  console.log('Form schemas seeded');
}

// Public — anyone can read a form schema
router.get('/:key', async (req, res) => {
  const { rows } = await pool.query('SELECT schema FROM form_schemas WHERE key = $1', [req.params.key]);
  if (!rows.length) { res.status(404).json({ error: 'Form not found' }); return; }
  res.json(rows[0].schema);
});

// Protected — only admin can update
router.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params;
  if (!['careers', 'partners'].includes(key as string)) {
    res.status(400).json({ error: 'Invalid form key' }); return;
  }
  await pool.query(
    `INSERT INTO form_schemas (key, schema, updated_at) VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE SET schema = $2, updated_at = NOW()`,
    [key, JSON.stringify(req.body)]
  );
  res.json(req.body);
});

export default router;
