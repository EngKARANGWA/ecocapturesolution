import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'https://ecocapturesolution.onrender.com';

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('eco_session')?.value ?? null;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const token = await getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${BACKEND}/api/forms/${type}`, { cache: 'no-store', headers });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ title: '', description: '', fields: [] });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const token = await getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const body = await req.json();
  try {
    const res = await fetch(`${BACKEND}/api/forms/${type}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}
