import type { Metadata } from 'next';
import { Section, Container, Heading, Text, SectionLabel } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import type { Locale } from '@/types';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'pl' ? 'Polityka prywatności' : 'Privacy Policy',
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  const content = {
    pl: {
      title: 'Polityka prywatności',
      lastUpdated: 'Ostatnia aktualizacja: Styczeń 2026',
      sections: [
        {
          title: '1. Informacje ogólne',
          content: 'Niniejsza polityka prywatności opisuje, w jaki sposób zbieramy, używamy i chronimy Twoje dane osobowe podczas korzystania z naszej strony internetowej oraz usług.',
        },
        {
          title: '2. Zbierane dane',
          content: 'Zbieramy dane, które podajesz nam bezpośrednio, takie jak imię, adres e-mail i numer telefonu podczas rezerwacji wizyty lub kontaktu z nami.',
        },
        {
          title: '3. Wykorzystanie danych',
          content: 'Twoje dane wykorzystujemy do obsługi rezerwacji, odpowiadania na zapytania, wysyłania potwierdzeń i informacji o usługach.',
        },
        {
          title: '4. Bezpieczeństwo danych',
          content: 'Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieuprawnionym dostępem.',
        },
        {
          title: '5. Twoje prawa',
          content: 'Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Aby skorzystać z tych praw, skontaktuj się z nami.',
        },
        {
          title: '6. Kontakt',
          content: 'W przypadku pytań dotyczących polityki prywatności, prosimy o kontakt pod adresem: privacy@luxuryhairartist.com',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. General Information',
          content: 'This privacy policy describes how we collect, use, and protect your personal data when you use our website and services.',
        },
        {
          title: '2. Data Collection',
          content: 'We collect data that you provide directly to us, such as name, email address, and phone number when booking an appointment or contacting us.',
        },
        {
          title: '3. Data Usage',
          content: 'We use your data to process bookings, respond to inquiries, send confirmations, and provide information about our services.',
        },
        {
          title: '4. Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal data from unauthorized access.',
        },
        {
          title: '5. Your Rights',
          content: 'You have the right to access, rectify, delete, and restrict the processing of your data. To exercise these rights, please contact us.',
        },
        {
          title: '6. Contact',
          content: 'For questions about our privacy policy, please contact us at: privacy@luxuryhairartist.com',
        },
      ],
    },
  };

  const pageContent = content[validLocale];

  return (
    <section className="pt-32 pb-20 bg-cream-50">
      <Container size="narrow">
        <ScrollReveal>
          <Heading as="h1" size="display">
            {pageContent.title}
          </Heading>
          <Text className="mt-4 text-charcoal-500">
            {pageContent.lastUpdated}
          </Text>
        </ScrollReveal>

        <div className="mt-12 space-y-8">
          {pageContent.sections.map((section, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div>
                <Heading as="h2" size="subheading" className="text-charcoal-900">
                  {section.title}
                </Heading>
                <Text className="mt-3 text-charcoal-600">
                  {section.content}
                </Text>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
