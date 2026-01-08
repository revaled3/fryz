'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Heading, SectionLabel, Button } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { getFeaturedProjects } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface PortfolioProps {
  locale: Locale;
}

export function Portfolio({ locale }: PortfolioProps) {
  const t = getTranslations(locale);
  const projects = getFeaturedProjects(locale);

  return (
    <Section id="portfolio" className="bg-cream-100">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel>{t.portfolio.sectionLabel}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Heading as="h2" size="display" className="mt-4">
            {t.portfolio.title}
          </Heading>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 mx-auto max-w-2xl font-body text-charcoal-600">
            {t.portfolio.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Portfolio Grid */}
      <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <StaggerItem key={project.id}>
            <Link
              href={`/${locale}/portfolio/${project.slug}`}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'relative overflow-hidden bg-cream-200',
                  index === 0 ? 'aspect-[3/4] sm:col-span-2 sm:row-span-2' : 'aspect-[3/4]'
                )}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-elegant group-hover:scale-105"
                  style={{
                    backgroundImage: project.images[0]
                      ? `url(${project.images[0].src})`
                      : undefined,
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-gold-400">
                        {project.client || project.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-light text-cream-50">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors group-hover:bg-cream-100 group-hover:text-charcoal-900">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* CTA */}
      <ScrollReveal className="mt-12 text-center">
        <Button href={`/${locale}/portfolio`} variant="secondary">
          {t.portfolio.viewAll}
        </Button>
      </ScrollReveal>
    </Section>
  );
}
