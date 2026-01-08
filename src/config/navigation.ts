import type { NavigationItem } from '@/types';

export const mainNavigation: NavigationItem[] = [
  {
    label: { pl: 'O mnie', en: 'About' },
    href: '/about',
  },
  {
    label: { pl: 'Portfolio', en: 'Portfolio' },
    href: '/portfolio',
  },
  {
    label: { pl: 'Usługi', en: 'Services' },
    href: '/services',
  },
  {
    label: { pl: 'Lokalizacje', en: 'Locations' },
    href: '/locations',
    children: [
      {
        label: { pl: 'Warszawa', en: 'Warsaw' },
        href: '/locations/warsaw',
      },
      {
        label: { pl: 'Los Angeles', en: 'Los Angeles' },
        href: '/locations/los-angeles',
      },
    ],
  },
  {
    label: { pl: 'Kontakt', en: 'Contact' },
    href: '/contact',
  },
];

export const footerNavigation = {
  main: mainNavigation,
  legal: [
    {
      label: { pl: 'Polityka prywatności', en: 'Privacy Policy' },
      href: '/privacy',
    },
    {
      label: { pl: 'Regulamin', en: 'Terms of Service' },
      href: '/terms',
    },
  ],
};
