'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/config/navigation';
import { getLocalizedValue } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {mainNavigation.map((item) => {
        const href = `/${locale}${item.href}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        const label = getLocalizedValue(item.label, locale);

        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              'relative font-body text-sm font-medium tracking-wide transition-colors duration-300',
              'hover:text-gold-500',
              isActive ? 'text-gold-500' : 'text-charcoal-800'
            )}
          >
            {label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gold-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
