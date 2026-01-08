import type { SiteConfig, LocationInfo } from '@/types';

export const siteConfig: SiteConfig = {
  name: {
    pl: 'Luxury Hair Artist',
    en: 'Luxury Hair Artist',
  },
  description: {
    pl: 'Ekskluzywne usługi fryzjerskie w Warszawie i Los Angeles. Światowej klasy artystka włosów dla najbardziej wymagających klientek.',
    en: 'Exclusive hair services in Warsaw and Los Angeles. World-class hair artist for the most discerning clients.',
  },
  artistName: 'Alexandra Kowalska',
  url: 'https://luxuryhairartist.com',
  keywords: {
    pl: [
      'fryzjer warszawa',
      'luksusowy fryzjer',
      'koloryzacja włosów',
      'stylista włosów VIP',
      'fryzjer celebrytów',
      'ekskluzywny salon fryzjerski',
      'balayage warszawa',
      'strzyżenie premium',
    ],
    en: [
      'luxury hair stylist',
      'celebrity hair artist',
      'los angeles hair colorist',
      'warsaw hair salon',
      'VIP hair services',
      'exclusive hair styling',
      'balayage specialist',
      'premium hair care',
    ],
  },
  social: {
    instagram: 'https://instagram.com/luxuryhairartist',
    pinterest: 'https://pinterest.com/luxuryhairartist',
    tiktok: 'https://tiktok.com/@luxuryhairartist',
  },
};

export const locations: Record<'warsaw' | 'los-angeles', LocationInfo> = {
  warsaw: {
    id: 'warsaw',
    name: {
      pl: 'Warszawa',
      en: 'Warsaw',
    },
    address: {
      street: 'ul. Mokotowska 55',
      city: 'Warszawa',
      postalCode: '00-542',
      country: 'Polska',
    },
    coordinates: {
      lat: 52.2214,
      lng: 21.0189,
    },
    phone: '+48 22 123 45 67',
    email: 'warsaw@luxuryhairartist.com',
    hours: [
      { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '20:00' },
      { days: ['Saturday'], opens: '09:00', closes: '18:00' },
    ],
    images: ['/images/locations/warsaw-1.jpg', '/images/locations/warsaw-2.jpg'],
  },
  'los-angeles': {
    id: 'los-angeles',
    name: {
      pl: 'Los Angeles',
      en: 'Los Angeles',
    },
    address: {
      street: '8424 Melrose Place',
      city: 'Los Angeles',
      postalCode: 'CA 90069',
      country: 'USA',
    },
    coordinates: {
      lat: 34.0837,
      lng: -118.3695,
    },
    phone: '+1 310 123 4567',
    email: 'la@luxuryhairartist.com',
    hours: [
      { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
      { days: ['Saturday'], opens: '10:00', closes: '17:00' },
    ],
    images: ['/images/locations/la-1.jpg', '/images/locations/la-2.jpg'],
  },
};

export const CONTACT_EMAIL = 'hello@luxuryhairartist.com';
