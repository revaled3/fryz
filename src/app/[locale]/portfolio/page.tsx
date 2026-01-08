import type { Metadata } from 'next';
import { Container, Heading, SectionLabel } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { PortfolioGrid } from './PortfolioGrid';
import { getTranslations, locales } from '@/lib/i18n';
import { getProjects, getPortfolioCategories } from '@/lib/content';
import type { Locale } from '@/types';

interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: t.nav.portfolio,
    description: locale === 'pl'
      ? 'Zobacz moje najlepsze realizacje - koloryzacje, metamorfozy, sesje edytorialne i stylizacje ślubne.'
      : 'See my best work - colorings, transformations, editorial sessions and bridal styling.',
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);
  const projects = getProjects(validLocale);
  const categories = getPortfolioCategories(validLocale);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-50">
        <Container>
          <ScrollReveal>
            <SectionLabel>{t.portfolio.sectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Heading as="h1" size="display" className="mt-4">
              {t.portfolio.title}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 max-w-2xl font-body text-charcoal-600 text-lg">
              {t.portfolio.subtitle}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Portfolio Grid with Filters */}
      <PortfolioGrid
        projects={projects}
        categories={categories}
        locale={validLocale}
        translations={t.portfolio}
      />
    </>
  );
}
