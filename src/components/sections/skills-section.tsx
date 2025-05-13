'use client';

import React from 'react';
import { skills } from '@/data/resume-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Lightbulb, Users, Languages as LanguagesIcon } from 'lucide-react'; // Renamed Languages to LanguagesIcon to avoid conflict

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  items: string[];
}

const SkillsSection: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    { title: 'Technical', icon: Cpu, items: skills.technical },
    { title: 'Methodologies', icon: Lightbulb, items: skills.methodologies },
    { title: 'Design & UX', icon: Users, items: skills.design },
    { title: 'Languages', icon: LanguagesIcon, items: skills.languages },
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          category.items.length > 0 && (
            <Card key={category.title} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <category.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-4">
                {category.items.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </section>
  );
};

export default SkillsSection; 