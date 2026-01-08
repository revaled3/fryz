'use client';

import { motion } from 'framer-motion';
import { Section, Heading, Text, SectionLabel, Button } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/types';

interface AboutProps {
  locale: Locale;
}

const stats = [
  { value: '20+', key: 'experience' },
  { value: '5000+', key: 'clients' },
  { value: '15', key: 'awards' },
  { value: '100+', key: 'publications' },
];

export function About({ locale }: AboutProps) {
  const t = getTranslations(locale);

  return (
    <Section id="about" className="bg-cream-50">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Image */}
        <ScrollReveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-cream-200">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-elegant hover:scale-105"
                style={{ backgroundImage: 'url(/images/about/artist-portrait.jpg)' }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-200 -z-10" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 border border-gold-400/30 -z-10" />
            <div className="absolute -top-4 -left-4 h-32 w-32 border border-gold-400/30 -z-10" />
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <SectionLabel>{t.about.sectionLabel}</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Heading as="h2" size="display" className="mt-4">
              {t.about.title}
            </Heading>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Text className="mt-6 text-charcoal-700">
              {t.about.subtitle}
            </Text>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Text className="mt-4 text-charcoal-600">
              {locale === 'pl'
                ? 'Przez ponad dwie dekady doskonaliłam sztukę kreowania piękna. Moja podróż rozpoczęła się w Warszawie, gdzie odkryłam pasję do koloryzacji i stylizacji włosów. Dziś mam przywilej pracować z najbardziej wymagającymi klientkami na dwóch kontynentach.'
                : 'For over two decades, I have been perfecting the art of creating beauty. My journey began in Warsaw, where I discovered my passion for hair coloring and styling. Today, I have the privilege of working with the most discerning clients on two continents.'}
            </Text>
          </ScrollReveal>

          {/* Stats */}
          <StaggerContainer className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.key}>
                <div className="text-center sm:text-left">
                  <div className="font-display text-3xl font-light text-gold-500">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-body text-sm text-charcoal-600">
                    {t.about[stat.key as keyof typeof t.about]}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.4}>
            <div className="mt-10">
              <Button href={`/${locale}/about`} variant="secondary">
                {t.about.cta}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
