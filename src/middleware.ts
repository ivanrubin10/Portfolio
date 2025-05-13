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
  // First, handle the internationalization routing
  const i18nResponse = i18nMiddleware(request);
  
  // Create a response that will be used if authentication fails
  const response = i18nResponse || NextResponse.next({
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
            if (response instanceof NextResponse) {
              response.cookies.set({ name, value, ...options });
            }
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
    // Get the session
    const { data: { session }, error } = await supabase.auth.getSession();

    // If there's no active session, redirect to the login page
    if (!session || error) {
      // Get the locale from the path or default to 'en'
      const urlWithLocale = request.nextUrl.clone();
      urlWithLocale.pathname = '/login';
      // Add original URL as redirect parameter
      urlWithLocale.searchParams.set('redirect', pathname);
      return NextResponse.redirect(urlWithLocale);
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api/auth`, `/_next` or include `.`
  // - … the root pathname
  matcher: ['/((?!api/auth|_next|.*\\..*).*)'],
}; 