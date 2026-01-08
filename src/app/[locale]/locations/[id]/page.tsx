import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Section, Container, Heading, Text, SectionLabel, Button, GoldDivider } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { getTestimonialsByLocation } from '@/lib/content';
import { locations } from '@/config/site';
import type { Locale } from '@/types';

interface LocationPageProps {
  params: Promise<{ locale: string; id: string }>;
}

const validLocationIds = ['warsaw', 'los-angeles'] as const;

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];

  for (const locale of locales) {
    for (const id of validLocationIds) {
      params.push({ locale, id });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const location = locations[id as keyof typeof locations];

  if (!location) {
    return { title: 'Not Found' };
  }

  return {
    title: location.name[locale as Locale],
    description: locale === 'pl'
      ? `Odwiedź nasz ekskluzywny salon w ${location.name.pl}. Luksusowe usługi fryzjerskie.`
      : `Visit our exclusive salon in ${location.name.en}. Luxury hair services.`,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locale, id } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  if (!validLocationIds.includes(id as typeof validLocationIds[number])) {
    notFound();
  }

  const location = locations[id as keyof typeof locations];
  const testimonials = getTestimonialsByLocation(id as 'warsaw' | 'los-angeles', validLocale);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel>{t.locations.sectionLabel}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Heading as="h1" size="display" className="mt-4">
                  {location.name[validLocale]}
                </Heading>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-8 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 text-gold-500 flex-shrink-0" />
                    <div>
                      <p className="font-body text-charcoal-800">
                        {location.address.street}
                      </p>
                      <p className="font-body text-charcoal-600">
                        {location.address.postalCode} {location.address.city}
                      </p>
                      <p className="font-body text-charcoal-600">
                        {location.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="font-body text-charcoal-800 hover:text-gold-500 transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <a
                      href={`mailto:${location.email}`}
                      className="font-body text-charcoal-800 hover:text-gold-500 transition-colors"
                    >
                      {location.email}
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="mt-8 flex gap-4">
                  <Button href={`/${validLocale}/contact`}>
                    {t.hero.cta}
                  </Button>
                  <Button
                    variant="secondary"
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${location.address.street}, ${location.address.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t.locations.getDirections}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Image */}
            <ScrollReveal>
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/locations/${id}-interior.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Opening Hours */}
      <Section className="bg-charcoal-900 text-cream-50">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <Clock className="h-8 w-8 text-gold-400 mx-auto" />
            <Heading as="h2" size="heading" className="mt-4 text-cream-50">
              {t.locations.openingHours}
            </Heading>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 space-y-3">
              {location.hours.map((h, i) => (
                <div key={i} className="flex justify-between text-cream-100/80">
                  <span>{h.days.join(', ')}</span>
                  <span>{h.opens} - {h.closes}</span>
                </div>
              ))}
              <div className="flex justify-between text-cream-100/50">
                <span>{validLocale === 'pl' ? 'Niedziela, Poniedziałek' : 'Sunday, Monday'}</span>
                <span>{t.locations.closed}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="bg-cream-100">
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <StaggerItem key={i}>
              <div className="aspect-square overflow-hidden bg-cream-200">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-elegant hover:scale-105"
                  style={{ backgroundImage: `url(/images/locations/${id}-gallery-${i}.jpg)` }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section className="bg-rose-50">
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionLabel>{t.testimonials.sectionLabel}</SectionLabel>
              <Heading as="h2" size="heading" className="mt-4">
                {validLocale === 'pl' ? 'Opinie naszych klientek' : 'What Our Clients Say'}
              </Heading>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {testimonials.slice(0, 2).map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <blockquote className="bg-white p-8 shadow-sm">
                  <p className="font-display text-xl font-light text-charcoal-800 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-cream-200 overflow-hidden">
                      {testimonial.image && (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      )}
                    </div>
                    <div>
                      <cite className="font-display text-lg font-medium text-charcoal-900 not-italic">
                        {testimonial.name}
                      </cite>
                      <p className="font-body text-sm text-charcoal-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-cream-50">
        <GoldDivider className="mb-16" />
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <Heading as="h2" size="heading">
              {validLocale === 'pl'
                ? 'Gotowa na wizytę?'
                : 'Ready to Visit?'}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Text className="mt-4 text-charcoal-600">
              {validLocale === 'pl'
                ? 'Zarezerwuj swoją wizytę już dziś i doświadcz luksusu.'
                : 'Book your appointment today and experience luxury.'}
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
      </Section>
    </>
  );
}
