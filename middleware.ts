import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Пропускаем публичные API (например auth)
  if (url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Проверка токена / сессии
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    url.pathname = '/api/auth/unauthorized'; // или просто вернуть 401
    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next()
  res.headers.set('x-user-id', token.sub || '');
  res.headers.set('x-user-email', token.email || '');

  return res;
}

// Применяем только к API
export const config = {
  matcher: '/api/:path*',
};

