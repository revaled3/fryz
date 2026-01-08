import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Section, Container, Heading, Text, SectionLabel } from '@/components/ui';
import { Contact as ContactForm } from '@/components/sections/Contact';
import { ScrollReveal } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { locations, siteConfig } from '@/config/site';
import type { Locale } from '@/types';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: t.nav.contact,
    description: locale === 'pl'
      ? 'Skontaktuj się z nami i umów wizytę w naszym salonie w Warszawie lub Los Angeles.'
      : 'Get in touch and book an appointment at our salon in Warsaw or Los Angeles.',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream-50">
        <Container>
          <div className="max-w-2xl">
            <ScrollReveal>
              <SectionLabel>{t.contact.sectionLabel}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Heading as="h1" size="display" className="mt-4">
                {t.contact.title}
              </Heading>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Text className="mt-4 text-charcoal-600 text-lg">
                {t.contact.subtitle}
              </Text>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Contact Form Section - Reusing the component */}
      <ContactForm locale={validLocale} />

      {/* Contact Info */}
      <Section className="bg-charcoal-900 text-cream-50">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Warsaw */}
          <ScrollReveal>
            <div>
              <h3 className="font-display text-xl font-light text-cream-50">
                {t.locations.warsaw}
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-gold-400 flex-shrink-0" />
                  <div className="text-sm text-cream-100/70">
                    <p>{locations.warsaw.address.street}</p>
                    <p>{locations.warsaw.address.postalCode} {locations.warsaw.address.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <a
                    href={`tel:${locations.warsaw.phone.replace(/\s/g, '')}`}
                    className="text-sm text-cream-100/70 hover:text-cream-50 transition-colors"
                  >
                    {locations.warsaw.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <a
                    href={`mailto:${locations.warsaw.email}`}
                    className="text-sm text-cream-100/70 hover:text-cream-50 transition-colors"
                  >
                    {locations.warsaw.email}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Los Angeles */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-display text-xl font-light text-cream-50">
                {t.locations.losAngeles}
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-gold-400 flex-shrink-0" />
                  <div className="text-sm text-cream-100/70">
                    <p>{locations['los-angeles'].address.street}</p>
                    <p>{locations['los-angeles'].address.city}, {locations['los-angeles'].address.postalCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <a
                    href={`tel:${locations['los-angeles'].phone.replace(/\s/g, '')}`}
                    className="text-sm text-cream-100/70 hover:text-cream-50 transition-colors"
                  >
                    {locations['los-angeles'].phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <a
                    href={`mailto:${locations['los-angeles'].email}`}
                    className="text-sm text-cream-100/70 hover:text-cream-50 transition-colors"
                  >
                    {locations['los-angeles'].email}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-display text-xl font-light text-cream-50">
                {t.footer.followUs}
              </h3>
              <div className="mt-6 space-y-4">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-cream-100/70 hover:text-cream-50 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-gold-400" />
                  <span>@luxuryhairartist</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
