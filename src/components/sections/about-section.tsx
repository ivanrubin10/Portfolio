'use client';

import React from 'react';
import { summary } from '@/data/resume-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>My Journey</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 text-sm">
            <p>{summary.narrative}</p>
            <p>{summary.main}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Stack & Focus</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Frontend:</strong> {summary.currentStack.frontend}</li>
              <li><strong>Backend:</strong> {summary.currentStack.backend}</li>
              <li><strong>Version Control:</strong> {summary.currentStack.versionControl}</li>
              <li><strong>Deployment:</strong> {summary.currentStack.deployment}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection; 