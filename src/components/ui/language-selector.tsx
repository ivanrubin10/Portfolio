'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from '@/i18n/client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from './button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { GlobeIcon } from 'lucide-react';

const LOCALES = {
  en: { flag: '🇺🇸' },
  es: { flag: '🇪🇸' }
};

export function LanguageSelector() {
  const t = useTranslations('LanguageSelector');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('label')}>
          <GlobeIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72">
        <SheetHeader>
          <SheetTitle>{t('label')}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {Object.entries(LOCALES).map(([key, { flag }]) => (
            <Button
              key={key}
              variant={locale === key ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 text-left"
              disabled={isPending}
              onClick={() => handleLocaleChange(key)}
            >
              <span className="text-lg">{flag}</span>
              <span>{t(key)}</span>
              {locale === key && (
                <span className="ml-auto rounded-full bg-green-500 h-2 w-2" />
              )}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 