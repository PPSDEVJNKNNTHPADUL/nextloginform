import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get('KEYCLOAK_SESSION');

  if (authCookie && req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.rewrite(new URL('/profile', req.url))
  }
}