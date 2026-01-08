import portfolioData from '../../../content/portfolio.json';
import servicesData from '../../../content/services.json';
import testimonialsData from '../../../content/testimonials.json';
import pressData from '../../../content/press.json';
import type { Locale, Project, Service, Testimonial } from '@/types';

// Portfolio
export function getProjects(locale: Locale): Project[] {
  return portfolioData.projects.map((project) => ({
    ...project,
    title: project.title[locale],
    description: project.description[locale],
    images: project.images.map((img) => ({
      ...img,
      alt: img.alt[locale],
    })),
  })) as Project[];
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale)
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);
}

export function getProjectBySlug(slug: string, locale: Locale): Project | null {
  const projects = getProjects(locale);
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getPortfolioCategories(locale: Locale) {
  return portfolioData.categories.map((cat) => ({
    id: cat.id,
    label: cat.label[locale],
  }));
}

// Services
export function getServices(locale: Locale): Service[] {
  return servicesData.services.map((service) => ({
    ...service,
    title: service.title[locale],
    description: service.description[locale],
    features: service.features.map((f) => f[locale]),
  })) as unknown as Service[];
}

export function getServiceBySlug(slug: string, locale: Locale): Service | null {
  const services = getServices(locale);
  return services.find((s) => s.slug === slug) ?? null;
}

// Testimonials
export function getTestimonials(locale: Locale): Testimonial[] {
  return testimonialsData.testimonials.map((t) => ({
    ...t,
    role: t.role[locale],
    content: t.content[locale],
  })) as Testimonial[];
}

export function getTestimonialsByLocation(
  location: 'warsaw' | 'los-angeles',
  locale: Locale
): Testimonial[] {
  return getTestimonials(locale).filter((t) => t.location === location);
}

// Press
export function getPressLogos() {
  return pressData.pressLogos;
}

export function getPressFeatures(locale: Locale) {
  return pressData.features.map((f) => ({
    ...f,
    title: f.title[locale],
  }));
}
