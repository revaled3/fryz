import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fontVariables } from '@/lib/fonts';
import { locales } from '@/lib/i18n';
import { siteConfig } from '@/config/site';
import { Header, Footer } from '@/components/layout';
import { LenisProvider } from '@/components/motion';
import { LocalBusinessSchema, WebsiteSchema } from '@/components/seo';
import type { Locale } from '@/types';
import '@/styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'pl';

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name[validLocale],
      template: `%s | ${siteConfig.name[validLocale]}`,
    },
    description: siteConfig.description[validLocale],
    keywords: siteConfig.keywords[validLocale],
    authors: [{ name: siteConfig.artistName }],
    creator: siteConfig.artistName,
    openGraph: {
      type: 'website',
      locale: validLocale === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: validLocale === 'pl' ? 'en_US' : 'pl_PL',
      url: siteConfig.url,
      siteName: siteConfig.name[validLocale],
      images: [
        {
          url: '/images/og/default.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig.name[validLocale],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name[validLocale],
      description: siteConfig.description[validLocale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}/${validLocale}`,
      languages: {
        pl: `${siteConfig.url}/pl`,
        en: `${siteConfig.url}/en`,
      },
    },
  };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <html lang={validLocale} className={fontVariables}>
      <head>
        <LocalBusinessSchema locale={validLocale} />
        <WebsiteSchema locale={validLocale} />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          <Header locale={validLocale} />
          <main>{children}</main>
          <Footer locale={validLocale} />
        </LenisProvider>
      </body>
    </html>
  );
}
