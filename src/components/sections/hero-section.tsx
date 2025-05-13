'use client';

import React from 'react';
import Image from 'next/image'; // Import Image
import { personalInfo, summary } from '@/data/resume-data';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react'; // Assuming you'll add lucide-react

const HeroSection: React.FC = () => {
  // Correct path for images in the public directory
  const profileImage = '/profilePic.jpg'; 

  return (
    <section id="hero" className="flex flex-col items-center justify-center text-center py-24 md:py-32">
      <div className="mb-8">
        <Image
          src={profileImage}
          alt={`Photo of ${personalInfo.name}`}
          width={150}
          height={150}
          className="rounded-full mx-auto shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          priority
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-3">
        {personalInfo.name}
      </h1>
      <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
        {summary.currentTitle}
      </h2>
      <p className="max-w-xl text-md md:text-lg mb-8">
        {summary.main}
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button asChild variant="outline" size="default">
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail className="mr-2 h-4 w-4" /> Email Me
          </a>
        </Button>
        <Button asChild variant="outline" size="default">
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
          </a>
        </Button>
        {personalInfo.githubUrl !== "https://github.com/ivanrubin10" && (
          <Button asChild variant="outline" size="default">
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        )}
      </div>
      {/* Optional: Add a down arrow or scroll indicator here */}
    </section>
  );
};

export default HeroSection; 