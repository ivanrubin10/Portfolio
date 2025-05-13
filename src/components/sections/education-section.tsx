'use client';

import React from 'react';
import { education } from '@/data/resume-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 bg-muted/50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <GraduationCap className="h-8 w-8 mr-3 text-primary" />
                <CardTitle className="text-xl md:text-2xl">{edu.qualification}</CardTitle>
              </div>
              <CardDescription className="text-md">
                {edu.institution} | {edu.dates} | {edu.location}
              </CardDescription>
            </CardHeader>
            {edu.description && edu.description.length > 0 && (
              <CardContent>
                <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
                  {edu.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EducationSection; 