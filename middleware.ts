import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // If Supabase env vars aren't set, don't redirect — just let the page render
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res;
  }

  try {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = req.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginRoute && !session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    if (isLoginRoute && session) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  } catch (e) {
    // If anything fails, let the page handle it
    console.error('Middleware error:', e);
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
