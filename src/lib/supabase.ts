import { createBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

// Environment variables are validated at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Types for our database tables
export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          repository_url: string | null
          live_url: string | null
          image_url: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['projects']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Omit<
            Database['public']['Tables']['projects']['Row'],
            'id' | 'created_at' | 'updated_at'
          >
        >
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: number
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['skills']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Omit<
            Database['public']['Tables']['skills']['Row'],
            'id' | 'created_at' | 'updated_at'
          >
        >
      }
      project_skills: {
        Row: {
          id: string
          project_id: string
          skill_id: string
        }
        Insert: Omit<Database['public']['Tables']['project_skills']['Row'], 'id'>
        Update: Partial<Omit<Database['public']['Tables']['project_skills']['Row'], 'id'>>
      }
      contents: {
        Row: {
          id: string
          section: string
          title: string | null
          content: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['contents']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Omit<
            Database['public']['Tables']['contents']['Row'],
            'id' | 'created_at' | 'updated_at'
          >
        >
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

/**
 * Create a Supabase client for use in the browser
 */
export const createClient = () => {
  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}

/**
 * Create a Supabase client for use in middleware
 */
export const createMiddlewareClient = (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  
  return {
    supabase: createSupabaseServerClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    ),
    response,
  }
} 