import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Routes that require authentication
const protectedRoutes = [
  '/admin',
  '/admin/projects',
  '/admin/skills',
  '/admin/contents',
  '/api/admin', // Protect all admin API routes
];

// Create a middleware for internationalization
const i18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  try {
    console.log(`Middleware handling path: ${request.nextUrl.pathname}`);
    
    // Skip middleware for the root path to avoid redirect loops
    if (request.nextUrl.pathname === '/') {
      console.log('Skipping middleware for root path');
      return NextResponse.next();
    }

    // First, handle the internationalization routing
    const i18nResponse = i18nMiddleware(request);
    
    if (i18nResponse) {
      console.log('i18n middleware applied a redirect or rewrite');
      return i18nResponse;
    }
    
    // Create a response that will be used if authentication fails
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create a Supabase client
    const supabase = createSupabaseServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async getAll() {
            return request.cookies.getAll();
          },
          async setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              // If the response is a NextResponse, we can use its cookie methods
              response.cookies.set({ name, value, ...options });
            });
          },
        },
      }
    );

    // Check if the request is for a protected route
    const { pathname } = request.nextUrl;
    const isProtectedRoute = protectedRoutes.some(route => 
      pathname.startsWith(route) || pathname === route
    );

    if (isProtectedRoute) {
      console.log(`Checking auth for protected route: ${pathname}`);
      
      // Get the session
      const { data: { session }, error } = await supabase.auth.getSession();

      // If there's no active session, redirect to the login page
      if (!session || error) {
        console.log(`Auth check failed, redirecting to login. Error: ${error?.message || 'No session'}`);
        
        // Get the locale from the path or default to 'en'
        const urlWithLocale = request.nextUrl.clone();
        urlWithLocale.pathname = '/login';
        // Add original URL as redirect parameter
        urlWithLocale.searchParams.set('redirect', pathname);
        return NextResponse.redirect(urlWithLocale);
      }
      
      console.log('Auth check passed, proceeding to protected route');
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of errors, proceed to the next middleware/page
    return NextResponse.next();
  }
}

export const config = {
  // Match all pathnames except for:
  // - Root path (/)
  // - API auth routes (/api/auth/*)
  // - Next.js internal routes (/_next/*)
  // - Files with extensions (*.*)
  matcher: ['/((?!api/auth|_next|.*\\..*|$).*)'],
}; 