import { Cormorant, Inter, Playfair_Display } from 'next/font/google';

export const cormorant = Cormorant({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
});

export const fontVariables = `${cormorant.variable} ${inter.variable} ${playfair.variable}`;
