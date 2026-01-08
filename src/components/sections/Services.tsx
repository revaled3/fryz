'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, Heading, SectionLabel, GoldDivider } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { getServices } from '@/lib/content';
import { formatPrice } from '@/lib/utils';
import type { Locale } from '@/types';

interface ServicesProps {
  locale: Locale;
}

export function Services({ locale }: ServicesProps) {
  const t = getTranslations(locale);
  const services = getServices(locale).slice(0, 4);
  const currency = locale === 'pl' ? 'PLN' : 'USD';

  return (
    <Section id="services" className="bg-charcoal-900 text-cream-50">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel className="text-gold-400">{t.services.sectionLabel}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Heading as="h2" size="display" className="mt-4 text-cream-50">
            {t.services.title}
          </Heading>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 mx-auto max-w-2xl font-body text-cream-100/70">
            {t.services.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Services List */}
      <div className="mt-16">
        <StaggerContainer className="divide-y divide-cream-100/10">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link
                href={`/${locale}/services#${service.slug}`}
                className="group block py-8 first:pt-0 last:pb-0"
              >
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-sm text-gold-400/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-2xl font-light text-cream-50 transition-colors group-hover:text-gold-400">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-2 ml-10 font-body text-sm text-cream-100/60 max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-8 ml-10 sm:ml-0">
                    <div className="flex items-center gap-2 text-sm text-cream-100/60">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-cream-100/40">{t.services.priceFrom}</span>
                      <div className="font-display text-xl text-gold-400">
                        {formatPrice(
                          locale === 'pl' ? service.priceFrom.pln : service.priceFrom.usd,
                          currency,
                          locale
                        )}
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-all group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-charcoal-900">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Divider */}
      <div className="mt-16">
        <GoldDivider />
      </div>
    </Section>
  );
}
