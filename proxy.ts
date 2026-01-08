import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // 1. Define guarded routes
    const protectedRoutes = ['/book', '/calendar', '/my-bookings'];
    const isAuthRoute = protectedRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/admin');
    const isAdminRoute = pathname.startsWith('/admin');

    if (isAuthRoute) {
        if (!token) {
            // Not authenticated -> Redirect to Login
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // 2. Check Role (if Admin route)
        if (isAdminRoute) {
            try {
                const user = JSON.parse(token);
                if (user.role !== 'ADMIN') {
                    // Trusted user but not Admin -> Redirect to Home (or 403)
                    return NextResponse.redirect(new URL('/', request.url));
                }
            } catch (e) {
                // Invalid token format
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    }

    // 3. Prevent authenticated users from visiting Login/Register
    if (pathname === '/login' || pathname === '/register') {
        if (token) {
            // Redirect based on role if possible
            try {
                const user = JSON.parse(token);
                if (user.role === 'ADMIN') {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                }
            } catch (e) { }
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/book/:path*',
        '/calendar',
        '/my-bookings',
        '/admin/:path*',
        '/login',
        '/register',
    ],
};
