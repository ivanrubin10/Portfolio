import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Input validation schema
const projectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  repository_url: z.string().url().nullable().optional(),
  live_url: z.string().url().nullable().optional(),
  image_url: z.string().nullable().optional(),
  featured: z.boolean().optional().default(false),
  skills: z.array(z.string().uuid()).optional(),
});

// GET handler - List all projects
export async function GET() {
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
    
    // Fetch projects with their skills
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        skills:project_skills(
          skill:skills(*)
        )
      `)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new project
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
    const validationResult = projectSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { skills, ...projectData } = validationResult.data;
    
    // Insert the project
    const { data: project, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }
    
    // Add skills if provided
    if (skills && skills.length > 0) {
      const projectSkills = skills.map(skill_id => ({
        project_id: project.id,
        skill_id
      }));
      
      const { error: skillsError } = await supabase
        .from('project_skills')
        .insert(projectSkills);
      
      if (skillsError) {
        console.error('Error associating skills with project:', skillsError);
        // Continue anyway, as the project was created successfully
      }
    }
    
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT handler - Update an existing project
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
    const { id, ...projectData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const validationResult = projectSchema.safeParse(projectData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { skills, ...validProjectData } = validationResult.data;
    
    // Update the project
    const { data: project, error } = await supabase
      .from('projects')
      .update(validProjectData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }
    
    // If skills are provided, update the project_skills
    if (skills !== undefined) {
      // First, remove all existing project_skills
      const { error: deleteError } = await supabase
        .from('project_skills')
        .delete()
        .eq('project_id', id);
      
      if (deleteError) {
        console.error('Error removing project skills:', deleteError);
        // Continue anyway, as the project was updated successfully
      }
      
      // Then, add the new skills if there are any
      if (skills && skills.length > 0) {
        const projectSkills = skills.map(skill_id => ({
          project_id: id,
          skill_id
        }));
        
        const { error: skillsError } = await supabase
          .from('project_skills')
          .insert(projectSkills);
        
        if (skillsError) {
          console.error('Error associating skills with project:', skillsError);
          // Continue anyway, as the project was updated successfully
        }
      }
    }
    
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a project
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
    
    // Get the project ID from URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Delete the project (project_skills will be automatically deleted due to CASCADE)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 