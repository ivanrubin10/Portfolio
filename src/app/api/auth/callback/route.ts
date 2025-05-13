import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = await createServerClient();
    
    // Exchange the auth code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
} 