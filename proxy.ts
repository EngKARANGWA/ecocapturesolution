import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE = 'eco_session';
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // token invalid or expired — fall through to redirect
    }
  }
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
