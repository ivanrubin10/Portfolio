-- Drop triggers
DROP TRIGGER IF EXISTS update_projects_modtime ON public.projects;
DROP TRIGGER IF EXISTS update_skills_modtime ON public.skills;
DROP TRIGGER IF EXISTS update_contents_modtime ON public.contents;

-- Drop functions
DROP FUNCTION IF EXISTS update_modified_column();

-- Drop policies
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Projects can be inserted by authenticated users" ON public.projects;
DROP POLICY IF EXISTS "Projects can be updated by authenticated users" ON public.projects;
DROP POLICY IF EXISTS "Projects can be deleted by authenticated users" ON public.projects;

DROP POLICY IF EXISTS "Public skills are viewable by everyone" ON public.skills;
DROP POLICY IF EXISTS "Skills can be inserted by authenticated users" ON public.skills;
DROP POLICY IF EXISTS "Skills can be updated by authenticated users" ON public.skills;
DROP POLICY IF EXISTS "Skills can be deleted by authenticated users" ON public.skills;

DROP POLICY IF EXISTS "Public project_skills are viewable by everyone" ON public.project_skills;
DROP POLICY IF EXISTS "Project_skills can be inserted by authenticated users" ON public.project_skills;
DROP POLICY IF EXISTS "Project_skills can be updated by authenticated users" ON public.project_skills;
DROP POLICY IF EXISTS "Project_skills can be deleted by authenticated users" ON public.project_skills;

DROP POLICY IF EXISTS "Public contents are viewable by everyone" ON public.contents;
DROP POLICY IF EXISTS "Contents can be inserted by authenticated users" ON public.contents;
DROP POLICY IF EXISTS "Contents can be updated by authenticated users" ON public.contents;
DROP POLICY IF EXISTS "Contents can be deleted by authenticated users" ON public.contents;

DROP POLICY IF EXISTS "Users can view own record" ON public.users;
DROP POLICY IF EXISTS "Users can update own record" ON public.users;

-- Disable RLS
ALTER TABLE IF EXISTS public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.project_skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;

-- Drop indexes
DROP INDEX IF EXISTS idx_skills_category;
DROP INDEX IF EXISTS idx_projects_featured;
DROP INDEX IF EXISTS idx_contents_language;
DROP INDEX IF EXISTS idx_contents_section;

-- Drop tables (in order to handle foreign key dependencies)
DROP TABLE IF EXISTS public.project_skills;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.skills;
DROP TABLE IF EXISTS public.contents;
DROP TABLE IF EXISTS public.users; 