'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from '@/i18n/client';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              {t('copyright', { year: currentYear })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="https://github.com/ivanrubin10" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link 
              href="https://linkedin.com/in/ivan-rubin-dev" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="mailto:ivanrubin1@gmail.com"
              aria-label="Email Contact"
              className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 