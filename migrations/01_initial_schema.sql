-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  repository_url VARCHAR(255),
  live_url VARCHAR(255),
  image_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
  icon VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_skills junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS public.project_skills (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- Create contents table for multilingual content
CREATE TABLE IF NOT EXISTS public.contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create users table for admin access
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_contents_language ON public.contents(language);
CREATE INDEX IF NOT EXISTS idx_contents_section ON public.contents(section);

-- Create functions for automatic updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_skills_modtime
BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_contents_modtime
BEFORE UPDATE ON public.contents
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Row Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public projects are viewable by everyone"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Projects can be inserted by authenticated users"
ON public.projects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Projects can be updated by authenticated users"
ON public.projects FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Projects can be deleted by authenticated users"
ON public.projects FOR DELETE
USING (auth.role() = 'authenticated');

-- Skills policies
CREATE POLICY "Public skills are viewable by everyone"
ON public.skills FOR SELECT
USING (true);

CREATE POLICY "Skills can be inserted by authenticated users"
ON public.skills FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Skills can be updated by authenticated users"
ON public.skills FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Skills can be deleted by authenticated users"
ON public.skills FOR DELETE
USING (auth.role() = 'authenticated');

-- Project_skills policies
CREATE POLICY "Public project_skills are viewable by everyone"
ON public.project_skills FOR SELECT
USING (true);

CREATE POLICY "Project_skills can be inserted by authenticated users"
ON public.project_skills FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Project_skills can be updated by authenticated users"
ON public.project_skills FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Project_skills can be deleted by authenticated users"
ON public.project_skills FOR DELETE
USING (auth.role() = 'authenticated');

-- Contents policies
CREATE POLICY "Public contents are viewable by everyone"
ON public.contents FOR SELECT
USING (true);

CREATE POLICY "Contents can be inserted by authenticated users"
ON public.contents FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Contents can be updated by authenticated users"
ON public.contents FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Contents can be deleted by authenticated users"
ON public.contents FOR DELETE
USING (auth.role() = 'authenticated');

-- Users policies
CREATE POLICY "Users can view own record"
ON public.users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own record"
ON public.users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id); 