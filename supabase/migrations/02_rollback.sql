-- Rollback script for portfolio database

-- Drop tables with dependencies first
DROP TABLE IF EXISTS project_skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS contents;

-- Disable UUID extension if it's no longer needed
-- DROP EXTENSION IF EXISTS "uuid-ossp"; 