'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Section, Heading, SectionLabel, Button } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { locations } from '@/config/site';
import type { Locale } from '@/types';

interface LocationsProps {
  locale: Locale;
}

export function Locations({ locale }: LocationsProps) {
  const t = getTranslations(locale);

  const locationsList = [
    {
      id: 'warsaw',
      ...locations.warsaw,
      image: '/images/locations/warsaw-salon.jpg',
    },
    {
      id: 'los-angeles',
      ...locations['los-angeles'],
      image: '/images/locations/la-salon.jpg',
    },
  ];

  return (
    <Section id="locations" className="bg-cream-50">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel>{t.locations.sectionLabel}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Heading as="h2" size="display" className="mt-4">
            {t.locations.title}
          </Heading>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 mx-auto max-w-2xl font-body text-charcoal-600">
            {t.locations.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Locations Grid */}
      <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-2">
        {locationsList.map((location) => (
          <StaggerItem key={location.id}>
            <Link
              href={`/${locale}/locations/${location.id}`}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden bg-white shadow-sm"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-elegant group-hover:scale-105"
                    style={{ backgroundImage: `url(${location.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/20 to-transparent" />
                  {/* Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-rose-100 -z-10" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-light text-charcoal-900">
                        {location.name[locale]}
                      </h3>
                      <div className="mt-3 flex items-start gap-2 text-charcoal-600">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-500" />
                        <span className="font-body text-sm">
                          {location.address.street}<br />
                          {location.address.city}, {location.address.postalCode}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-400 transition-all group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-charcoal-900">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-charcoal-100">
                    <div className="font-body text-xs uppercase tracking-widest text-charcoal-400">
                      {t.locations.openingHours}
                    </div>
                    <div className="mt-2 font-body text-sm text-charcoal-600">
                      {location.hours[0]?.days.slice(0, 2).join(', ')} — {location.hours[0]?.opens} - {location.hours[0]?.closes}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
