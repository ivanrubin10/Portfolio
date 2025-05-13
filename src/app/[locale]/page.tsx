import MainLayout from '@/components/layout/main-layout';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { Suspense } from 'react';

type Params = { locale: string };

interface PageProps {
  params: Params;
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function Home({ params }: PageProps) {
  // For Next.js 15, use a safer approach that works in both dev and prod
  // Don't access params.locale directly - use spread/destructuring instead
  const { locale: localeParam = 'en' } = params || {};
  const localeString = String(localeParam);
  
  // Basic validation with error handling
  if (!locales.includes(localeString)) {
    return null; // Will be handled by notFound() from middleware
  }
  
  return (
    <Suspense fallback={<LoadingUI />}>
      <HomeContent locale={localeString} />
    </Suspense>
  );
}

// Loading UI component
function LoadingUI() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </MainLayout>
  );
}

// Async content component
async function HomeContent({ locale }: { locale: string }) {
  const t = await getTranslations({ 
    locale, 
    namespace: 'HomePage' 
  });

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-center">
          {t('subtitle')}
        </p>
        <div>
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </MainLayout>
  );
} 