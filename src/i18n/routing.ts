import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es"];
export const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Adds prefix only when needed (e.g., /es/about for Spanish)
}); 