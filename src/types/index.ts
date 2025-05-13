/**
 * Common types for the portfolio project
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  technologies: string[];
  skills: string[];
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
  level: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
  icon?: string;
}

export type Locale = 'en' | 'es';

export interface Dictionary {
  [key: string]: string | Dictionary;
} 