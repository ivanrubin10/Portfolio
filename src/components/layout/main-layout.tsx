'use client';

import React from 'react';
import Footer from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that wraps content with consistent padding and structure
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 