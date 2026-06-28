import { pool } from './db';

export async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS openings (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      type        TEXT,
      location    TEXT,
      description TEXT,
      tags        JSONB    DEFAULT '[]',
      status      TEXT     DEFAULT 'open',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS partners (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      logo       TEXT,
      website    TEXT,
      type       TEXT,
      status     TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS applications (
      id           TEXT PRIMARY KEY,
      opening_id   TEXT REFERENCES openings(id) ON DELETE SET NULL,
      data         JSONB NOT NULL,
      status       TEXT DEFAULT 'new',
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id           TEXT PRIMARY KEY,
      data         JSONB NOT NULL,
      status       TEXT DEFAULT 'new',
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS form_schemas (
      key        TEXT PRIMARY KEY,
      schema     JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  // Safe to run on existing DBs — adds opening_id if not present
  await pool.query(`
    ALTER TABLE applications
      ADD COLUMN IF NOT EXISTS opening_id TEXT REFERENCES openings(id) ON DELETE SET NULL;
  `);
  console.log('Database tables ready');
}
