export type Locale = 'pl' | 'en';

export interface LocalizedString {
  pl: string;
  en: string;
}

export interface NavigationItem {
  label: LocalizedString;
  href: string;
  children?: NavigationItem[];
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: 'editorial' | 'bridal' | 'celebrity' | 'transformation';
  client?: string;
  year: number;
  images: ProjectImage[];
  featured: boolean;
  order: number;
}

export interface ProjectImage {
  src: string;
  alt: LocalizedString;
  width: number;
  height: number;
}

export interface Service {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  priceFrom: {
    pln: number;
    usd: number;
  };
  duration: string;
  features: LocalizedString[];
  image: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: LocalizedString;
  content: LocalizedString;
  image?: string;
  rating: number;
  location: 'warsaw' | 'los-angeles';
}

export interface LocationInfo {
  id: 'warsaw' | 'los-angeles';
  name: LocalizedString;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  hours: BusinessHours[];
  images: string[];
}

export interface BusinessHours {
  days: string[];
  opens: string;
  closes: string;
}

export interface SiteConfig {
  name: LocalizedString;
  description: LocalizedString;
  artistName: string;
  url: string;
  keywords: {
    pl: string[];
    en: string[];
  };
  social: {
    instagram: string;
    facebook?: string;
    pinterest?: string;
    tiktok?: string;
  };
}
