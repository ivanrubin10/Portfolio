'use client';

import React from 'react';
import { personalInfo } from '@/data/resume-data';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <div className="max-w-md mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-8">
          I&apos;m currently looking for new opportunities, and my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <Button asChild size="lg" className="mb-8">
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail className="mr-2 h-5 w-5" /> Email Me
          </a>
        </Button>
        
        <div className="flex justify-center space-x-6">
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-8 w-8" />
          </a>
          {personalInfo.githubUrl !== "https://github.com/ivanrubin10" && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-8 w-8" />
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} aria-label="Phone" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-8 w-8" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 