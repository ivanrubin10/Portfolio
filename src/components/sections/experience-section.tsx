'use client';

import React from 'react';
import { experiences } from '@/data/resume-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
      <div className="relative space-y-8 before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-muted">
        {experiences.map((exp, index) => (
          <div key={index} className="relative flex items-start space-x-4 group pl-12">
            <div className="absolute left-5 top-1 transform -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow ring-4 ring-background group-hover:scale-110 transition-transform duration-200">
              <Briefcase className="h-5 w-5" />
            </div>
            <Card className="flex-grow shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">{exp.title}</CardTitle>
                <CardDescription className="text-md">
                  {exp.company} | {exp.dates} | {exp.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection; 