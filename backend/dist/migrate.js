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
    console.log('Database tables ready');
}
