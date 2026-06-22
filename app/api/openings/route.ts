import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, type, location, desc, tags, status, created_at AS "createdAt"
       FROM openings ORDER BY created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/openings:', err);
    return NextResponse.json([]);
  }
}
