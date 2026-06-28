import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, title, type, location, description AS desc, tags, status, created_at AS "createdAt"
      FROM openings ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/openings:', err);
    return NextResponse.json([]);
  }
}
