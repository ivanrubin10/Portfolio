'use client';

import { useTranslations } from '@/i18n/client';
import { Link } from '@/i18n/navigation';
import MainLayout from '@/components/layout/main-layout';

export default function NotFound() {
  const t = useTranslations('Common');

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          404 - {t('notFound')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-center">
          {t('pageNotFoundMessage')}
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {t('backToHome')}
        </Link>
      </div>
    </MainLayout>
  );
} 