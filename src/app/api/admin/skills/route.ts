import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Database } from '@/lib/supabase';

// Define the skill type
type Skill = Database['public']['Tables']['skills']['Row'] & {
  projects?: Array<{ project: { id: string } }>;
};

// Input validation schema
const skillSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.string().min(2).max(50),
  level: z.number().int().min(1).max(5),
  icon: z.string().nullable().optional(),
});

// GET handler - List all skills
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
    
    // Fetch skills with count of related projects
    const { data: skills, error } = await supabase
      .from('skills')
      .select(`
        *,
        projects:project_skills(
          project:projects(id)
        )
      `)
      .order('category')
      .order('name');
    
    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json(
        { error: 'Failed to fetch skills' },
        { status: 500 }
      );
    }
    
    // Process the data to add project count
    const processedSkills = skills.map((skill: Skill) => ({
      ...skill,
      projectCount: skill.projects ? skill.projects.length : 0,
    }));
    
    return NextResponse.json({ skills: processedSkills });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new skill
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
    const validationResult = skillSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Insert the skill
    const { data: skill, error } = await supabase
      .from('skills')
      .insert(validationResult.data)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    
    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT handler - Update an existing skill
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
    const { id, ...skillData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }
    
    const validationResult = skillSchema.safeParse(skillData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Update the skill
    const { data: skill, error } = await supabase
      .from('skills')
      .update(validationResult.data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating skill:', error);
      return NextResponse.json(
        { error: 'Failed to update skill' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    
    return NextResponse.json({ skill });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a skill
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
    
    // Get the skill ID from URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }
    
    // Check if the skill is associated with any projects
    const { data: projectSkills, error: checkError } = await supabase
      .from('project_skills')
      .select('project_id')
      .eq('skill_id', id);
    
    if (checkError) {
      console.error('Error checking skill usage:', checkError);
      return NextResponse.json(
        { error: 'Failed to check if skill is in use' },
        { status: 500 }
      );
    }
    
    if (projectSkills && projectSkills.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete skill that is in use', 
          projects: projectSkills.map((ps: { project_id: string }) => ps.project_id) 
        },
        { status: 409 }
      );
    }
    
    // Delete the skill
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting skill:', error);
      return NextResponse.json(
        { error: 'Failed to delete skill' },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 