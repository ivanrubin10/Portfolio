-- Create schema for portfolio database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 5),
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    repository_url VARCHAR(255),
    live_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for projects and skills (many-to-many)
CREATE TABLE IF NOT EXISTS project_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(project_id, skill_id)
);

-- Contents table for multilingual text
CREATE TABLE IF NOT EXISTS contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, language)
);

-- Index for faster language filtering
CREATE INDEX IF NOT EXISTS idx_contents_language ON contents(language);

-- Add RLS (Row Level Security) policies
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for skills" 
ON skills FOR SELECT USING (true);

CREATE POLICY "Allow public read access for projects" 
ON projects FOR SELECT USING (true);

CREATE POLICY "Allow public read access for project_skills" 
ON project_skills FOR SELECT USING (true);

CREATE POLICY "Allow public read access for contents" 
ON contents FOR SELECT USING (true);

-- Create policies for authenticated users to have full access
CREATE POLICY "Allow authenticated users to modify skills" 
ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to modify projects" 
ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to modify project_skills" 
ON project_skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to modify contents" 
ON contents FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create example storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Allow public access to storage
CREATE POLICY "Allow public access to portfolio storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow authenticated users to upload to storage
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update their files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio' AND owner = auth.uid());

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete their files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio' AND owner = auth.uid()); 