'use client';

import React from 'react';
import { projects } from '@/data/resume-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl mb-1">{project.name}</CardTitle>
              <CardDescription className="text-sm min-h-[40px]">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <h4 className="text-xs uppercase text-muted-foreground mb-2 font-semibold">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`}>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              {project.homepage && (
                <Button asChild variant="default" size="sm">
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.name}`}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection; 