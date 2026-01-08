import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F5EDE0',
          300: '#EDE3D0',
          400: '#E5D9C0',
        },
        charcoal: {
          600: '#4A4541',
          700: '#383430',
          800: '#2C2825',
          900: '#1A1816',
          950: '#0F0E0D',
        },
        gold: {
          300: '#D4B872',
          400: '#C9A962',
          500: '#B8945A',
          600: '#A67F4B',
          700: '#8A6A3F',
        },
        rose: {
          50: '#FDF8F7',
          100: '#F8F0EE',
          200: '#F0E0DC',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-playfair)', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
      },
      spacing: {
        'section': 'clamp(6rem, 12vh, 10rem)',
        'container-x': 'clamp(1.5rem, 5vw, 8rem)',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'slow': '700ms',
        'elegant': '1200ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'line-expand': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'line-expand': 'line-expand 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A962 0%, #B8945A 50%, #A67F4B 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.3), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
