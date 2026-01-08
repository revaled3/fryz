import type { Metadata } from 'next';
import { Section, Container, Heading, Text, SectionLabel } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import type { Locale } from '@/types';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'pl' ? 'Regulamin' : 'Terms of Service',
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  const content = {
    pl: {
      title: 'Regulamin',
      lastUpdated: 'Ostatnia aktualizacja: Styczeń 2026',
      sections: [
        {
          title: '1. Postanowienia ogólne',
          content: 'Niniejszy regulamin określa zasady korzystania z usług oferowanych przez Luxury Hair Artist w salonach w Warszawie i Los Angeles.',
        },
        {
          title: '2. Rezerwacje',
          content: 'Rezerwacje można dokonywać telefonicznie, mailowo lub poprzez formularz kontaktowy. Potwierdzenie rezerwacji następuje po kontakcie zwrotnym z naszej strony.',
        },
        {
          title: '3. Odwoływanie wizyt',
          content: 'Prosimy o odwoływanie wizyt z co najmniej 48-godzinnym wyprzedzeniem. W przypadku późniejszego odwołania lub niestawienia się, możemy naliczyć opłatę.',
        },
        {
          title: '4. Płatności',
          content: 'Akceptujemy płatności gotówką, kartą oraz przelewem. Ceny usług podane są orientacyjnie i mogą ulec zmianie w zależności od złożoności zabiegu.',
        },
        {
          title: '5. Odpowiedzialność',
          content: 'Dokładamy wszelkich starań, aby świadczyć usługi najwyższej jakości. W przypadku niezadowolenia, prosimy o kontakt w ciągu 7 dni od wizyty.',
        },
        {
          title: '6. Kontakt',
          content: 'W przypadku pytań dotyczących regulaminu, prosimy o kontakt pod adresem: legal@luxuryhairartist.com',
        },
      ],
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 2026',
      sections: [
        {
          title: '1. General Provisions',
          content: 'These terms of service govern the use of services offered by Luxury Hair Artist at our salons in Warsaw and Los Angeles.',
        },
        {
          title: '2. Bookings',
          content: 'Bookings can be made by phone, email, or through our contact form. Confirmation is provided upon our follow-up contact.',
        },
        {
          title: '3. Cancellations',
          content: 'Please cancel appointments at least 48 hours in advance. Late cancellations or no-shows may incur a fee.',
        },
        {
          title: '4. Payments',
          content: 'We accept cash, card, and bank transfer payments. Service prices are indicative and may vary based on treatment complexity.',
        },
        {
          title: '5. Liability',
          content: 'We strive to provide the highest quality services. If you are unsatisfied, please contact us within 7 days of your visit.',
        },
        {
          title: '6. Contact',
          content: 'For questions about these terms, please contact us at: legal@luxuryhairartist.com',
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
