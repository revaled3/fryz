import type { Metadata } from 'next';
import { Section, Container, Heading, Text, SectionLabel, GoldDivider } from '@/components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getTranslations, locales } from '@/lib/i18n';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/types';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: t.nav.about,
    description: locale === 'pl'
      ? 'Poznaj historię światowej klasy artystki włosów z ponad 20-letnim doświadczeniem.'
      : 'Discover the story of a world-class hair artist with over 20 years of experience.',
  };
}

const timeline = [
  {
    year: '2004',
    title: { pl: 'Początek drogi', en: 'The Beginning' },
    description: {
      pl: 'Ukończenie prestiżowej szkoły fryzjerskiej w Warszawie i pierwsze kroki w branży.',
      en: 'Graduating from a prestigious hair school in Warsaw and taking first steps in the industry.',
    },
  },
  {
    year: '2010',
    title: { pl: 'Pierwsza nagroda', en: 'First Award' },
    description: {
      pl: 'Zdobycie pierwszej nagrody na międzynarodowym konkursie koloryzacji w Paryżu.',
      en: 'Winning first prize at an international coloring competition in Paris.',
    },
  },
  {
    year: '2015',
    title: { pl: 'Salon w Warszawie', en: 'Warsaw Salon' },
    description: {
      pl: 'Otwarcie własnego luksusowego salonu w sercu Warszawy.',
      en: 'Opening my own luxury salon in the heart of Warsaw.',
    },
  },
  {
    year: '2019',
    title: { pl: 'Ekspansja do LA', en: 'LA Expansion' },
    description: {
      pl: 'Otwarcie drugiego salonu w Los Angeles, rozpoczęcie współpracy z Hollywood.',
      en: 'Opening second salon in Los Angeles, beginning collaboration with Hollywood.',
    },
  },
  {
    year: '2024',
    title: { pl: 'Dziś', en: 'Today' },
    description: {
      pl: 'Praca z najbardziej wymagającymi klientkami na dwóch kontynentach.',
      en: 'Working with the most discerning clients on two continents.',
    },
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-cream-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel>{t.about.sectionLabel}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Heading as="h1" size="display" className="mt-4">
                  {siteConfig.artistName}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Text className="mt-6 text-charcoal-700 text-lg">
                  {validLocale === 'pl'
                    ? 'Światowej klasy artystka włosów z ponad 20-letnim doświadczeniem. Specjalizuję się w luksusowej koloryzacji i transformacjach, pracując z najbardziej wymagającymi klientkami w Warszawie i Los Angeles.'
                    : 'World-class hair artist with over 20 years of experience. I specialize in luxury coloring and transformations, working with the most discerning clients in Warsaw and Los Angeles.'}
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Text className="mt-4 text-charcoal-600">
                  {validLocale === 'pl'
                    ? 'Moja filozofia opiera się na przekonaniu, że każda kobieta zasługuje na fryzurę, która podkreśla jej indywidualne piękno. Łączę najnowsze techniki z głębokim zrozumieniem struktury włosów i kolorystyki.'
                    : 'My philosophy is based on the belief that every woman deserves a hairstyle that enhances her individual beauty. I combine the latest techniques with a deep understanding of hair structure and coloring.'}
                </Text>
              </ScrollReveal>
            </div>
            <ScrollReveal className="lg:order-first">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-cream-200">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/about/artist-full.jpg)' }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-40 w-40 border border-gold-400/30 -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section className="bg-charcoal-900 text-cream-50">
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: '20+', label: t.about.experience },
            { value: '5000+', label: t.about.clients },
            { value: '15', label: t.about.awards },
            { value: '100+', label: t.about.publications },
          ].map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="font-display text-5xl font-light text-gold-400">
                {stat.value}
              </div>
              <div className="mt-2 font-body text-sm uppercase tracking-widest text-cream-100/70">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Timeline */}
      <Section className="bg-cream-50">
        <div className="text-center mb-16">
          <ScrollReveal>
            <Heading as="h2" size="heading">
              {validLocale === 'pl' ? 'Moja droga' : 'My Journey'}
            </Heading>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="space-y-12">
            {timeline.map((item, index) => (
              <StaggerItem key={item.year}>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 font-display text-sm font-medium text-charcoal-900">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-gold-400 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-12">
                    <h3 className="font-display text-xl font-medium text-charcoal-900">
                      {item.title[validLocale]}
                    </h3>
                    <p className="mt-2 font-body text-charcoal-600">
                      {item.description[validLocale]}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="bg-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel>
              {validLocale === 'pl' ? 'Filozofia' : 'Philosophy'}
            </SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <blockquote className="mt-8">
              <p className="font-display text-3xl font-light leading-relaxed text-charcoal-800 md:text-4xl">
                {validLocale === 'pl'
                  ? '"Każda kobieta to czyste płótno. Moim zadaniem jest odkryć i podkreślić jej unikalne piękno, tworząc fryzurę, która stanie się częścią jej tożsamości."'
                  : '"Every woman is a blank canvas. My job is to discover and enhance her unique beauty, creating a hairstyle that becomes part of her identity."'}
              </p>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 font-display text-lg text-gold-500">
              — {siteConfig.artistName}
            </p>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
