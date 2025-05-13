'use client';

import { useCallback, useEffect } from 'react';

export default function RootPage() {
  // Use localStorage to remember language preference
  const handleLanguageSelect = useCallback((locale: string) => {
    // Store selected language in localStorage
    localStorage.setItem('preferredLanguage', locale);
    // Navigate to selected language
    window.location.href = `/${locale}`;
  }, []);

  // Auto-redirect to preferred language on page load
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    
    // If user has a saved preference, redirect to that language
    if (preferredLanguage) {
      window.location.href = `/${preferredLanguage}`;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to my Portfolio</h1>
      <p className="mb-6">Please select your preferred language:</p>
      <div className="flex gap-4">
        <button 
          onClick={() => handleLanguageSelect('en')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Switch to English"
        >
          English
        </button>
        <button 
          onClick={() => handleLanguageSelect('es')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Switch to Spanish"
        >
          Español
        </button>
      </div>
    </div>
  );
} 