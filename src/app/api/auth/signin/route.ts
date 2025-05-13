import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for login form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, password } = validation.data;
    
    // Create a Supabase client
    const supabase = await createServerClient();
    
    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 