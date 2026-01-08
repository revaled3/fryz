import {
  Hero,
  About,
  Portfolio,
  Services,
  Testimonials,
  Locations,
  Press,
  Contact,
} from '@/components/sections';
import { locales } from '@/lib/i18n';
import type { Locale } from '@/types';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const validLocale = locale as Locale;

  return (
    <>
      <Hero locale={validLocale} />
      <About locale={validLocale} />
      <Portfolio locale={validLocale} />
      <Services locale={validLocale} />
      <Testimonials locale={validLocale} />
      <Locations locale={validLocale} />
      <Press locale={validLocale} />
      <Contact locale={validLocale} />
    </>
  );
}
