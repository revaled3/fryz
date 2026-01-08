# Luxury Hair Artist

Premium website for a world-class hair artist with salons in Warsaw and Los Angeles.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom design system)
- **Animations**: Framer Motion + Lenis (smooth scroll)
- **Content**: JSON + MDX ready
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The site runs on `http://localhost:3000` by default.

## Project Structure

```
├── src/
│   ├── app/[locale]/        # Pages with i18n
│   ├── components/
│   │   ├── ui/              # Base components
│   │   ├── layout/          # Header, Footer, Nav
│   │   ├── sections/        # Page sections
│   │   ├── motion/          # Animation components
│   │   └── seo/             # Schema.org components
│   ├── lib/
│   │   ├── content/         # Content loaders
│   │   ├── i18n/            # Internationalization
│   │   ├── fonts/           # Font configuration
│   │   ├── motion/          # Animation variants
│   │   └── utils/           # Utilities
│   ├── config/              # Site configuration
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── content/                 # JSON content files
└── public/                  # Static assets
```

## Features

- **Bilingual**: Polish (default) + English
- **SEO Optimized**: Full metadata, Schema.org, sitemap
- **Performance**: Core Web Vitals optimized
- **Animations**: Smooth scroll, scroll-triggered animations
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant

## Content Management

Content is managed via JSON files in `/content`:

- `portfolio.json` - Portfolio projects
- `services.json` - Services & pricing
- `testimonials.json` - Client testimonials
- `press.json` - Press logos & features

## Adding Images

Place images in `/public/images/`:

```
public/images/
├── hero/           # Hero backgrounds
├── about/          # About section
├── portfolio/      # Portfolio items
├── services/       # Service images
├── locations/      # Salon photos
├── testimonials/   # Client photos
├── press/          # Press logos (SVG)
└── og/             # OpenGraph images
```

Recommended sizes:
- Hero: 1920x1080px
- Portfolio: 1200x1600px (3:4 ratio)
- Services: 800x600px (4:3 ratio)
- OG: 1200x630px

## Deployment

The project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy

Environment variables (optional):
- None required for static deployment

## Customization

### Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  cream: { ... },
  charcoal: { ... },
  gold: { ... },
  rose: { ... },
}
```

### Fonts

Edit `src/lib/fonts/index.ts` to change fonts.

### Site Config

Edit `src/config/site.ts` for:
- Site name
- Artist name
- Contact info
- Social links
- Location details

## License

Private project. All rights reserved.
