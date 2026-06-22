import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  try {
    const { rows } = await pool.query(
      'SELECT schema FROM form_schemas WHERE type = $1',
      [type]
    );
    if (rows.length === 0) return NextResponse.json({ title: '', description: '', fields: [] });
    return NextResponse.json(rows[0].schema);
  } catch (err) {
    console.error(`GET /api/forms/${type}:`, err);
    return NextResponse.json({ title: '', description: '', fields: [] });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const body = await req.json();
  try {
    await pool.query(
      `INSERT INTO form_schemas (type, schema)
       VALUES ($1, $2)
       ON CONFLICT (type) DO UPDATE SET schema = $2`,
      [type, JSON.stringify(body)]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`PUT /api/forms/${type}:`, err);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
