import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const isLoginRoute = req.nextUrl.pathname === '/admin/login';

  // Missing env vars — skip middleware entirely
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return res;
  }

  try {
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // Not logged in + trying to access protected admin page → go to login
    if (isAdminRoute && !isLoginRoute && !session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Already logged in + on login page → go to dashboard
    if (isLoginRoute && session) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  } catch (e) {
    console.error('Middleware error:', e);
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
