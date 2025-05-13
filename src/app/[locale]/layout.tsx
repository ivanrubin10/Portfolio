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

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  // In Next.js 15, we need to properly await params
  const locale = (await params).locale;
  
  const t = await getTranslations({
    locale,
    namespace: 'HomePage'
  });
  
  return {
    title: `Ivan Eric Rubin - ${t('title')}`,
    description: `${t('subtitle')} - ${t('latestProjects')}`,
  };
}

export default async function LocaleLayout({ 
  children, 
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // In Next.js 15, we need to properly await params
  const locale = (await params).locale;

  // Validate the locale
  if (!locales.includes(locale)) notFound();
  
  // Enable static rendering
  setRequestLocale(locale);
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}> 
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
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
      </body>
    </html>
  );
} 