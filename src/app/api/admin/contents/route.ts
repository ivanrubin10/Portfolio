import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Input validation schema
const contentSchema = z.object({
  section: z.string().min(2).max(100),
  title: z.string().min(2).max(255),
  content: z.string().min(5),
  language: z.string().min(2).max(10),
});

// GET handler - List all contents
export async function GET(request: Request) {
  try {
    const supabase = await createServerClient();
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const url = new URL(request.url);
    const language = url.searchParams.get('language');
    const section = url.searchParams.get('section');
    
    // Build query
    let query = supabase.from('contents').select('*');
    
    // Filter by language if provided
    if (language) {
      query = query.eq('language', language);
    }
    
    // Filter by section if provided
    if (section) {
      query = query.eq('section', section);
    }
    
    // Execute query
    const { data: contents, error } = await query
      .order('section')
      .order('language');
    
    if (error) {
      console.error('Error fetching contents:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contents' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ contents });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new content
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = contentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Check if content already exists for this section/language
    const { data: existingContent, error: checkError } = await supabase
      .from('contents')
      .select('id')
      .eq('section', validationResult.data.section)
      .eq('language', validationResult.data.language)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking existing content:', checkError);
      return NextResponse.json(
        { error: 'Failed to check if content already exists' },
        { status: 500 }
      );
    }
    
    // If content already exists, return an error
    if (existingContent) {
      return NextResponse.json(
        { error: 'Content for this section and language already exists', existing: existingContent },
        { status: 409 }
      );
    }
    
    // Insert the content
    const { data: content, error } = await supabase
      .from('contents')
      .insert(validationResult.data)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating content:', error);
      return NextResponse.json(
        { error: 'Failed to create content' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/contents');
    revalidatePath('/[locale]');
    
    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT handler - Update an existing content
export async function PUT(request: Request) {
  try {
    const supabase = await createServerClient();
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const { id, ...contentData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }
    
    const validationResult = contentSchema.safeParse(contentData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Check if this update would conflict with existing content
    const { data: existingContent, error: checkError } = await supabase
      .from('contents')
      .select('id')
      .eq('section', validationResult.data.section)
      .eq('language', validationResult.data.language)
      .neq('id', id)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking existing content:', checkError);
      return NextResponse.json(
        { error: 'Failed to check if update would conflict' },
        { status: 500 }
      );
    }
    
    // If there would be a conflict, return an error
    if (existingContent) {
      return NextResponse.json(
        { error: 'Another content with this section and language already exists', existing: existingContent },
        { status: 409 }
      );
    }
    
    // Update the content
    const { data: content, error } = await supabase
      .from('contents')
      .update(validationResult.data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating content:', error);
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/contents');
    revalidatePath('/[locale]');
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a content
export async function DELETE(request: Request) {
  try {
    const supabase = await createServerClient();
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the content ID from URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }
    
    // Before deleting, get information about the content
    const { data: content, error: getError } = await supabase
      .from('contents')
      .select('section, language')
      .eq('id', id)
      .single();
    
    if (getError) {
      console.error('Error getting content:', getError);
      return NextResponse.json(
        { error: 'Failed to get content information' },
        { status: 500 }
      );
    }
    
    // Check if this is the only language for this section
    const { count, error: countError } = await supabase
      .from('contents')
      .select('id', { count: 'exact' })
      .eq('section', content.section);
    
    if (countError) {
      console.error('Error counting contents for section:', countError);
      return NextResponse.json(
        { error: 'Failed to check if content can be deleted' },
        { status: 500 }
      );
    }
    
    // If this is the only language for the section, warn the user
    if (count === 1) {
      return NextResponse.json(
        { error: 'Cannot delete the only language for this section', section: content.section },
        { status: 409 }
      );
    }
    
    // Delete the content
    const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting content:', error);
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/contents');
    revalidatePath('/[locale]');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 