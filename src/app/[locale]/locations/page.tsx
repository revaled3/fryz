import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Text, SectionLabel, Button } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { locations } from '@/config/site';
import type { Locale } from '@/types';

interface LocationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: t.nav.locations,
    description: locale === 'pl'
      ? 'Odwiedź nasze ekskluzywne salony w Warszawie i Los Angeles.'
      : 'Visit our exclusive salons in Warsaw and Los Angeles.',
  };
}

export default async function LocationsPage({ params }: LocationsPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  const locationsList = [
    {
      key: 'warsaw' as const,
      data: locations.warsaw,
      image: '/images/locations/warsaw-exterior.jpg',
    },
    {
      key: 'los-angeles' as const,
      data: locations['los-angeles'],
      image: '/images/locations/la-exterior.jpg',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-50">
        <Container>
          <ScrollReveal>
            <SectionLabel>{t.locations.sectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Heading as="h1" size="display" className="mt-4">
              {t.locations.title}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Text className="mt-4 max-w-2xl text-charcoal-600 text-lg">
              {t.locations.subtitle}
            </Text>
          </ScrollReveal>
        </Container>
      </section>

      {/* Locations */}
      <Section className="bg-cream-100">
        <StaggerContainer className="space-y-24">
          {locationsList.map((location, index) => (
            <StaggerItem key={location.key}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${location.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Heading as="h2" size="display">
                    {location.data.name[validLocale]}
                  </Heading>

                  <div className="mt-8 space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-gold-500 flex-shrink-0" />
                      <div>
                        <p className="font-body text-charcoal-800">
                          {location.data.address.street}
                        </p>
                        <p className="font-body text-charcoal-600">
                          {location.data.address.postalCode} {location.data.address.city}
                        </p>
                        <p className="font-body text-charcoal-600">
                          {location.data.address.country}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                      <a
                        href={`tel:${location.data.phone.replace(/\s/g, '')}`}
                        className="font-body text-charcoal-800 hover:text-gold-500 transition-colors"
                      >
                        {location.data.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                      <a
                        href={`mailto:${location.data.email}`}
                        className="font-body text-charcoal-800 hover:text-gold-500 transition-colors"
                      >
                        {location.data.email}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-5 w-5 text-gold-500 flex-shrink-0" />
                      <div>
                        <p className="font-body text-xs uppercase tracking-widest text-charcoal-400 mb-2">
                          {t.locations.openingHours}
                        </p>
                        {location.data.hours.map((h, i) => (
                          <p key={i} className="font-body text-sm text-charcoal-700">
                            {h.days.join(', ')}: {h.opens} - {h.closes}
                          </p>
                        ))}
                        <p className="font-body text-sm text-charcoal-500 mt-1">
                          {validLocale === 'pl' ? 'Niedziela, Poniedziałek' : 'Sunday, Monday'}: {t.locations.closed}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Button href={`/${validLocale}/contact`}>
                      {t.hero.cta}
                    </Button>
                    <Button
                      variant="secondary"
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${location.data.address.street}, ${location.data.address.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.locations.getDirections}
                    </Button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
