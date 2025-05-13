import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { AuthProvider } from "@/contexts/AuthContext";
import SkipLink from "@/components/ui/skip-link";
import Header from "@/components/header";
import { locales } from "@/i18n/routing";
import { setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

// Middleware redirects invalid locales, this is a fallback
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

type Params = { 
  locale: string 
};

export async function generateMetadata({ params }: {params: Params}): Promise<Metadata> {
  try {
    // For Next.js 15, use a safer approach that works in both dev and prod
    // Don't access params.locale directly - use spread/destructuring instead
    const { locale: localeParam = 'en' } = params || {};
    const localeString = String(localeParam);
    
    // Validate the locale
    if (!locales.includes(localeString)) {
      return {
        title: "Ivan Eric Rubin - Portfolio",
        description: "Full Stack Developer Portfolio",
      };
    }
    
    // Get translations with the explicit locale
    const t = await getTranslations({
      locale: localeString,
      namespace: 'HomePage'
    });
    
    return {
      title: `Ivan Eric Rubin - ${t('title')}`,
      description: `${t('subtitle')} - ${t('latestProjects')}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Ivan Eric Rubin - Portfolio",
      description: "Full Stack Developer Portfolio",
    };
  }
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Params;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // For Next.js 15, use a safer approach that works in both dev and prod
  // Don't access params.locale directly - use spread/destructuring instead
  const { locale: localeParam = 'en' } = params || {};
  const localeString = String(localeParam);
  
  // Return null or fallback for invalid locales
  if (!locales.includes(localeString)) {
    return null;
  }
  
  return <ClientLayout locale={localeString}>{children}</ClientLayout>;
}

// Separate client component
function ClientLayout({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <html lang={locale} suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}> 
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AsyncWrapper locale={locale}>
          {children}
        </AsyncWrapper>
      </body>
    </html>
  );
}

// Async wrapper to handle all async operations
async function AsyncWrapper({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // Enable static rendering
  setRequestLocale(locale);
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Error loading messages:", error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC" now={new Date()}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <SkipLink targetId="main-content" />
          <Header />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
} 