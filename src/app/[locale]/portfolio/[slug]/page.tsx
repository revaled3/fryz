import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Container, Heading, Text, SectionLabel, Button, GoldDivider } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { getProjects, getProjectBySlug } from '@/lib/content';
import type { Locale } from '@/types';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const projects = getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);

  if (!project) {
    return { title: 'Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const validLocale = locale as Locale;
  const project = getProjectBySlug(slug, validLocale);
  const t = getTranslations(validLocale);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-50">
        <Container>
          <ScrollReveal>
            <Link
              href={`/${validLocale}/portfolio`}
              className="inline-flex items-center gap-2 font-body text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.common.back}
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionLabel className="mt-8">
              {project.client || t.portfolio.categories[project.category as keyof typeof t.portfolio.categories]}
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Heading as="h1" size="display" className="mt-4 max-w-4xl">
              {project.title}
            </Heading>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-6 text-charcoal-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold-500" />
                <span className="font-body text-sm">{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gold-500" />
                <span className="font-body text-sm">
                  {t.portfolio.categories[project.category as keyof typeof t.portfolio.categories]}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Text className="mt-8 max-w-2xl text-charcoal-700 text-lg">
              {project.description}
            </Text>
          </ScrollReveal>
        </Container>
      </section>

      {/* Images */}
      <section className="py-16 bg-cream-100">
        <Container>
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="overflow-hidden bg-cream-200">
                  <div
                    className="aspect-[16/9] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.src})` }}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-50">
        <Container>
          <GoldDivider className="mb-16" />
          <div className="text-center">
            <ScrollReveal>
              <Heading as="h2" size="heading">
                {validLocale === 'pl'
                  ? 'Chcesz podobny efekt?'
                  : 'Want a similar result?'}
              </Heading>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Text className="mt-4 text-charcoal-600">
                {validLocale === 'pl'
                  ? 'Umów się na konsultację i porozmawiajmy o Twoich włosach.'
                  : "Book a consultation and let's talk about your hair."}
              </Text>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-8">
                <Button href={`/${validLocale}/contact`}>
                  {t.hero.cta}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
