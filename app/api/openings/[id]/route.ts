import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import sql from '@/lib/db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

async function auth(req: NextRequest) {
  const token = req.cookies.get('eco_session')?.value;
  if (!token) return false;
  try { await jwtVerify(token, JWT_SECRET); return true; } catch { return false; }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    const [openingRows, appRows] = await Promise.all([
      sql`SELECT id, title, type, location, description AS desc, tags, status, created_at AS "createdAt"
          FROM openings WHERE id = ${id}`,
      sql`SELECT id, opening_id AS "openingId", data, status, submitted_at AS "submittedAt"
          FROM applications WHERE opening_id = ${id} ORDER BY submitted_at DESC`,
    ]);
    if (openingRows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ opening: openingRows[0], applications: appRows });
  } catch (err) {
    console.error('GET /api/openings/[id]:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json() as Record<string, unknown>;
  try {
    await sql`UPDATE openings SET
      title    = COALESCE(${body.title as string    | null}, title),
      type     = COALESCE(${body.type as string     | null}, type),
      location = COALESCE(${body.location as string | null}, location),
      description = COALESCE(${body.desc as string  | null}, description),
      tags     = COALESCE(${body.tags ? JSON.stringify(body.tags) : null}::jsonb, tags),
      status   = COALESCE(${body.status as string   | null}, status)
      WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/openings/[id]:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await sql`DELETE FROM openings WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/openings/[id]:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
