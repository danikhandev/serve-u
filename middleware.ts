import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simplified token verification for mock purposes
async function verifyToken(token: string | undefined): Promise<'user' | 'worker' | 'admin' | null> {
  if (token === 'user' || token === 'worker' || token === 'admin') {
    return token;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const userToken = request.cookies.get('auth-user-token')?.value;
  const adminToken = request.cookies.get('admin-auth-token')?.value;

  const verifiedUserRole = await verifyToken(userToken);
  const verifiedAdminRole = await verifyToken(adminToken);

  const isAuthPage = pathname.startsWith('/auth') || pathname === '/login' || pathname === '/register';
  const isAdminAuthPage = pathname === '/admin/login';
  
  const isUserDashboard = pathname.startsWith('/dashboard');
  const isWorkerDashboard = pathname.startsWith('/worker');
  const isAdminDashboard = pathname.startsWith('/admin/dashboard');

  // --- Redirect authenticated users from auth pages ---
  if (isAuthPage && verifiedUserRole) {
    const url = verifiedUserRole === 'worker' ? '/worker/dashboard' : '/dashboard';
    return NextResponse.redirect(new URL(url, request.url));
  }
  if (isAdminAuthPage && verifiedAdminRole) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  // --- Protect User/Worker Routes ---
  if (isUserDashboard || isWorkerDashboard) {
    if (!verifiedUserRole) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-user-token');
      return response;
    }
    // If a non-worker tries to access worker pages
    if (verifiedUserRole === 'user' && isWorkerDashboard) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // --- Protect Admin Routes ---
  if (isAdminDashboard) {
    if (!verifiedAdminRole) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/worker/:path*',
    '/admin/dashboard/:path*',
    '/:path*',
    '/login', // Legacy, can be removed if all links go to /login
    '/register', // Legacy
    '/admin/login',
  ],
};