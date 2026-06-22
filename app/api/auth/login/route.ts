import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

export async function POST(req: NextRequest) {
  const body = await req.json() as { email: string; password: string };

  // Verify credentials against the backend
  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json({ error: 'Cannot reach server. Try again.' }, { status: 502 });
  }

  if (!backendRes.ok) {
    const data = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: (data as { error?: string }).error ?? 'Invalid credentials' },
      { status: backendRes.status }
    );
  }

  // Credentials valid — sign a fresh JWT with the shared secret
  const token = await new SignJWT({ email: body.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  return NextResponse.json({ ok: true, token });
}
