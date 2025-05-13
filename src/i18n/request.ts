import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is not undefined
  const localeToUse = locale || defaultLocale;
  
  // Load messages for the current locale
  const messages = (await import(`../messages/${localeToUse}.json`)).default;

  return {
    locale: localeToUse,
    messages,
    timeZone: 'UTC',
    now: new Date(),
    defaultLocale,
  };
}); 