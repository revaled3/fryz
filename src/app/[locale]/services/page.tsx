import type { Metadata } from 'next';
import { Clock, Check } from 'lucide-react';
import { Section, Container, Heading, Text, SectionLabel, Button, GoldDivider } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { getServices } from '@/lib/content';
import { formatPrice } from '@/lib/utils';
import type { Locale } from '@/types';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: t.nav.services,
    description: locale === 'pl'
      ? 'Odkryj nasze ekskluzywne usługi fryzjerskie. Koloryzacja, stylizacja ślubna, metamorfozy i więcej.'
      : 'Discover our exclusive hair services. Coloring, bridal styling, transformations and more.',
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);
  const services = getServices(validLocale);
  const currency = validLocale === 'pl' ? 'PLN' : 'USD';

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-50">
        <Container>
          <ScrollReveal>
            <SectionLabel>{t.services.sectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Heading as="h1" size="display" className="mt-4">
              {t.services.title}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Text className="mt-4 max-w-2xl text-charcoal-600 text-lg">
              {t.services.subtitle}
            </Text>
          </ScrollReveal>
        </Container>
      </section>

      {/* Services List */}
      <Section className="bg-cream-100">
        <StaggerContainer className="space-y-16">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <div
                id={service.slug}
                className="scroll-mt-32 grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
              >
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="font-display text-6xl font-light text-gold-400/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Heading as="h2" size="heading" className="mt-4">
                    {service.title}
                  </Heading>
                  <Text className="mt-4 text-charcoal-600">
                    {service.description}
                  </Text>

                  {/* Features */}
                  <div className="mt-6 space-y-2">
                    <p className="font-body text-xs uppercase tracking-widest text-charcoal-400">
                      {t.services.includes}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-gold-500" />
                          <span className="font-body text-sm text-charcoal-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Duration */}
                  <div className="mt-8 flex items-center gap-8">
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-charcoal-400">
                        {t.services.priceFrom}
                      </p>
                      <p className="font-display text-2xl text-gold-500">
                        {formatPrice(
                          validLocale === 'pl' ? service.priceFrom.pln : service.priceFrom.usd,
                          currency,
                          validLocale
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-charcoal-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-body text-sm">{service.duration}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button href={`/${validLocale}/contact`}>
                      {t.services.booking}
                    </Button>
                  </div>
                </div>
              </div>

              {index < services.length - 1 && (
                <GoldDivider className="mt-16" />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <Section className="bg-charcoal-900 text-cream-50">
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <Heading as="h2" size="heading" className="text-cream-50">
              {validLocale === 'pl'
                ? 'Nie wiesz, która usługa jest dla Ciebie?'
                : 'Not sure which service is right for you?'}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Text className="mt-4 text-cream-100/70">
              {validLocale === 'pl'
                ? 'Zacznij od bezpłatnej konsultacji. Porozmawiamy o Twoich oczekiwaniach i zaproponuję najlepsze rozwiązanie.'
                : "Start with a free consultation. We'll discuss your expectations and I'll suggest the best solution."}
            </Text>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <Button
                href={`/${validLocale}/contact`}
                className="bg-gold-500 text-charcoal-900 border-gold-500 hover:bg-gold-400"
              >
                {t.hero.cta}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
