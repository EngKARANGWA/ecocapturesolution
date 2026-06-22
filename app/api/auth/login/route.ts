import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function POST(req: NextRequest) {
  const body = await req.json();

  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json({ error: 'Cannot reach server' }, { status: 502 });
  }

  const data = await backendRes.json();
  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const { token } = data as { token: string };
  const isProd = process.env.NODE_ENV === 'production';

  const response = NextResponse.json({ ok: true });
  response.cookies.set('eco_session', token, {
    httpOnly: false,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
