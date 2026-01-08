import { siteConfig, locations } from '@/config/site';
import type { Locale } from '@/types';

interface SchemaOrgProps {
  locale: Locale;
}

export function LocalBusinessSchema({ locale }: SchemaOrgProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name[locale],
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/images/logo.png`,
        },
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.pinterest,
          siteConfig.social.tiktok,
        ].filter(Boolean),
      },
      // Warsaw Salon
      {
        '@type': 'HairSalon',
        '@id': `${siteConfig.url}/#warsaw`,
        name: `${siteConfig.name[locale]} - Warsaw`,
        image: `${siteConfig.url}/images/locations/warsaw-1.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: locations.warsaw.address.street,
          addressLocality: locations.warsaw.address.city,
          postalCode: locations.warsaw.address.postalCode,
          addressCountry: 'PL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: locations.warsaw.coordinates.lat,
          longitude: locations.warsaw.coordinates.lng,
        },
        url: `${siteConfig.url}/${locale}/locations/warsaw`,
        telephone: locations.warsaw.phone,
        email: locations.warsaw.email,
        priceRange: '$$$$$',
        openingHoursSpecification: locations.warsaw.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      },
      // LA Salon
      {
        '@type': 'HairSalon',
        '@id': `${siteConfig.url}/#los-angeles`,
        name: `${siteConfig.name[locale]} - Los Angeles`,
        image: `${siteConfig.url}/images/locations/la-1.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: locations['los-angeles'].address.street,
          addressLocality: locations['los-angeles'].address.city,
          postalCode: locations['los-angeles'].address.postalCode,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: locations['los-angeles'].coordinates.lat,
          longitude: locations['los-angeles'].coordinates.lng,
        },
        url: `${siteConfig.url}/${locale}/locations/los-angeles`,
        telephone: locations['los-angeles'].phone,
        email: locations['los-angeles'].email,
        priceRange: '$$$$$',
        openingHoursSpecification: locations['los-angeles'].hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      },
      // Person (Artist)
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#artist`,
        name: siteConfig.artistName,
        jobTitle: locale === 'pl' ? 'Artystka włosów' : 'Hair Artist',
        worksFor: {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ locale }: SchemaOrgProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name[locale],
    description: siteConfig.description[locale],
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: locale === 'pl' ? 'pl-PL' : 'en-US',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
