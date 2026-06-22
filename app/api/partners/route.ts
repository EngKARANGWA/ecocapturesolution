import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, logo, website, type, status, created_at AS "createdAt" FROM partners ORDER BY created_at DESC'
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/partners:', err);
    return NextResponse.json([]);
  }
}
