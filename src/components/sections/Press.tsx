'use client';

import { motion } from 'framer-motion';
import { Section, Heading, SectionLabel, GoldDivider } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { getPressLogos } from '@/lib/content';
import type { Locale } from '@/types';

interface PressProps {
  locale: Locale;
}

export function Press({ locale }: PressProps) {
  const t = getTranslations(locale);
  const logos = getPressLogos();

  return (
    <Section id="press" className="bg-cream-100">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel>{t.press.sectionLabel}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Heading as="h2" size="display" className="mt-4">
            {t.press.title}
          </Heading>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 mx-auto max-w-2xl font-body text-charcoal-600">
            {t.press.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Logo Wall */}
      <StaggerContainer className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <StaggerItem key={logo.name}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex h-20 items-center justify-center opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              {/* Placeholder text until real logos are added */}
              <span className="font-display text-xl font-light text-charcoal-600 tracking-widest">
                {logo.name}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-16">
        <GoldDivider />
      </div>
    </Section>
  );
}
