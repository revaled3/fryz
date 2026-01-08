import { translations } from './translations';
import type { Locale } from '@/types';

export { translations } from './translations';

export const locales: Locale[] = ['pl', 'en'];
export const defaultLocale: Locale = 'pl';

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Locale;

  if (locales.includes(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

export function createLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = cleanPath.split('/').filter(Boolean);

  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  const newPath = segments.length > 0 ? `/${segments.join('/')}` : '';
  return `/${locale}${newPath}`;
}

export function getLocalizedValue<T>(
  value: { pl: T; en: T } | T,
  locale: Locale
): T {
  if (typeof value === 'object' && value !== null && 'pl' in value && 'en' in value) {
    return (value as { pl: T; en: T })[locale];
  }
  return value as T;
}
