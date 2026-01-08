'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/config/navigation';
import { getLocalizedValue } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface MobileNavProps {
  locale: Locale;
  onClose: () => void;
}

export function MobileNav({ locale, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-cream-50 lg:hidden"
    >
      <div className="flex h-full flex-col pt-24 px-6">
        <nav className="flex flex-col gap-6">
          {mainNavigation.map((item, index) => {
            const href = `/${locale}${item.href}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            const label = getLocalizedValue(item.label, locale);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    'block font-display text-3xl font-light transition-colors duration-300',
                    isActive ? 'text-gold-500' : 'text-charcoal-900 hover:text-gold-500'
                  )}
                >
                  {label}
                </Link>
                {item.children && (
                  <div className="mt-3 ml-4 flex flex-col gap-2">
                    {item.children.map((child) => {
                      const childHref = `/${locale}${child.href}`;
                      const childLabel = getLocalizedValue(child.label, locale);

                      return (
                        <Link
                          key={child.href}
                          href={childHref}
                          onClick={onClose}
                          className="font-body text-lg text-charcoal-600 hover:text-gold-500 transition-colors"
                        >
                          {childLabel}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto pb-12">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </motion.div>
  );
}
