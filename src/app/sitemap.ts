import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { getProjects } from '@/lib/content';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ['', '/about', '/portfolio', '/services', '/locations', '/contact'];

  for (const locale of locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            pl: `${baseUrl}/pl${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }

    // Portfolio pages
    const projects = getProjects(locale);
    for (const project of projects) {
      routes.push({
        url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    // Location pages
    routes.push({
      url: `${baseUrl}/${locale}/locations/warsaw`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    routes.push({
      url: `${baseUrl}/${locale}/locations/los-angeles`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return routes;
}
