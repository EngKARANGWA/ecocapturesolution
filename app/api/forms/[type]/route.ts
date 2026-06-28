import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import sql from '@/lib/db';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('eco_session')?.value ?? null;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  try {
    const rows = await sql`SELECT schema FROM form_schemas WHERE key = ${type}`;
    if (rows.length === 0) return NextResponse.json({ title: '', description: '', fields: [] });
    return NextResponse.json(rows[0].schema);
  } catch (err) {
    console.error(`GET /api/forms/${type}:`, err);
    return NextResponse.json({ title: '', description: '', fields: [] });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const token = await getToken();
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  try {
    await sql`
      INSERT INTO form_schemas (key, schema)
      VALUES (${type}, ${JSON.stringify(body)}::jsonb)
      ON CONFLICT (key) DO UPDATE SET schema = ${JSON.stringify(body)}::jsonb
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`PUT /api/forms/${type}:`, err);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
