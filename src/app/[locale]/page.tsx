import MainLayout from '@/components/layout/main-layout';
import { getTranslations } from 'next-intl/server';

type Params = { locale: string };

interface PageProps {
  params: Params;
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function Home({
  params
}: PageProps) {
  const { locale } = params;
  
  const t = await getTranslations({ locale, namespace: 'HomePage' });

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