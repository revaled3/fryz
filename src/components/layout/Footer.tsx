import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Container, GoldDivider } from '@/components/ui';
import { mainNavigation, footerNavigation } from '@/config/navigation';
import { siteConfig, locations } from '@/config/site';
import { getTranslations, getLocalizedValue } from '@/lib/i18n';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <Container>
        <div className="py-16 lg:py-24">
          {/* Top Section */}
          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                href={`/${locale}`}
                className="inline-block font-display text-2xl font-light tracking-tight text-cream-50"
              >
                Luxury Hair Artist
              </Link>
              <p className="mt-4 font-body text-sm text-cream-200/70 leading-relaxed">
                {t.footer.tagline}
              </p>
              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-200/70 transition-colors hover:text-gold-400"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-200/70 transition-colors hover:text-gold-400"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-body text-xs font-medium uppercase tracking-widest text-gold-400">
                {t.nav.home}
              </h3>
              <ul className="mt-4 space-y-3">
                {mainNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="font-body text-sm text-cream-200/70 transition-colors hover:text-cream-50"
                    >
                      {getLocalizedValue(item.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warsaw */}
            <div>
              <h3 className="font-body text-xs font-medium uppercase tracking-widest text-gold-400">
                {t.locations.warsaw}
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2 text-sm text-cream-200/70">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    {locations.warsaw.address.street}<br />
                    {locations.warsaw.address.postalCode} {locations.warsaw.address.city}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream-200/70">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${locations.warsaw.phone.replace(/\s/g, '')}`} className="hover:text-cream-50 transition-colors">
                    {locations.warsaw.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream-200/70">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href={`mailto:${locations.warsaw.email}`} className="hover:text-cream-50 transition-colors">
                    {locations.warsaw.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Los Angeles */}
            <div>
              <h3 className="font-body text-xs font-medium uppercase tracking-widest text-gold-400">
                {t.locations.losAngeles}
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2 text-sm text-cream-200/70">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    {locations['los-angeles'].address.street}<br />
                    {locations['los-angeles'].address.city}, {locations['los-angeles'].address.postalCode}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream-200/70">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${locations['los-angeles'].phone.replace(/\s/g, '')}`} className="hover:text-cream-50 transition-colors">
                    {locations['los-angeles'].phone}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream-200/70">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href={`mailto:${locations['los-angeles'].email}`} className="hover:text-cream-50 transition-colors">
                    {locations['los-angeles'].email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12">
            <GoldDivider />
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="font-body text-xs text-cream-200/50">
              © {currentYear} Luxury Hair Artist. {t.footer.rights}.
            </p>
            <div className="flex gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="font-body text-xs text-cream-200/50 transition-colors hover:text-cream-50"
                >
                  {getLocalizedValue(item.label, locale)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
