"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const db_1 = require("./db");
async function migrate() {
    await db_1.pool.query(`
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

    CREATE TABLE IF NOT EXISTS site_stats (
      key         TEXT PRIMARY KEY,
      label       TEXT NOT NULL,
      value       TEXT NOT NULL,
      suffix      TEXT,
      description TEXT,
      status      TEXT DEFAULT 'active',
      sort_order  INTEGER DEFAULT 0,
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS products (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      slug        TEXT NOT NULL UNIQUE,
      summary     TEXT NOT NULL,
      features    JSONB DEFAULT '[]',
      image       TEXT,
      category    TEXT,
      status      TEXT DEFAULT 'active',
      sort_order  INTEGER DEFAULT 0,
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS company_story (
      id          TEXT PRIMARY KEY,
      paragraph   TEXT NOT NULL,
      status      TEXT DEFAULT 'active',
      sort_order  INTEGER DEFAULT 0,
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS news_items (
      id            TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      body          TEXT NOT NULL,
      category      TEXT,
      publish_date  TIMESTAMPTZ,
      featured      BOOLEAN DEFAULT FALSE,
      archived      BOOLEAN DEFAULT FALSE,
      slug          TEXT UNIQUE,
      images        JSONB DEFAULT '[]',
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS projects (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT NOT NULL,
      location    TEXT,
      status      TEXT,
      timeline    TEXT,
      partners    JSONB DEFAULT '[]',
      results     JSONB DEFAULT '[]',
      images      JSONB DEFAULT '[]',
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      role        TEXT,
      quote       TEXT NOT NULL,
      category    TEXT,
      status      TEXT DEFAULT 'pending',
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS gallery_albums (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      cover_image TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id          TEXT PRIMARY KEY,
      album_id    TEXT REFERENCES gallery_albums(id) ON DELETE SET NULL,
      image       TEXT NOT NULL,
      caption     TEXT,
      sort_order  INTEGER DEFAULT 0,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS resources (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      file_url    TEXT NOT NULL,
      type        TEXT,
      category    TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `);
    // Safe to run on existing DBs — adds opening_id if not present
    await db_1.pool.query(`
    ALTER TABLE applications
      ADD COLUMN IF NOT EXISTS opening_id TEXT REFERENCES openings(id) ON DELETE SET NULL;
  `);
    console.log('Database tables ready');
}
