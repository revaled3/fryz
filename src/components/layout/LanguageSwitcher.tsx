'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, createLocalizedPath } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

const localeLabels: Record<Locale, string> = {
  pl: 'PL',
  en: 'EN',
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale, index) => {
        const href = createLocalizedPath(pathname, locale);
        const isActive = locale === currentLocale;

        return (
          <span key={locale} className="flex items-center">
            <Link
              href={href}
              className={cn(
                'font-body text-sm font-medium transition-colors duration-300',
                isActive
                  ? 'text-gold-500'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              )}
            >
              {localeLabels[locale]}
            </Link>
            {index < locales.length - 1 && (
              <span className="ml-2 text-charcoal-300">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
