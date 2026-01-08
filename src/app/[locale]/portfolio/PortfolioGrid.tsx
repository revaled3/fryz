'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Locale, Project } from '@/types';

interface PortfolioGridProps {
  projects: Project[];
  categories: { id: string; label: string }[];
  locale: Locale;
  translations: {
    categories: {
      all: string;
      editorial: string;
      bridal: string;
      celebrity: string;
      transformation: string;
    };
  };
}

export function PortfolioGrid({ projects, categories, locale, translations }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter */}
      <section className="py-8 bg-cream-50 border-b border-charcoal-100">
        <Container>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-6 py-2 font-body text-sm transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-transparent text-charcoal-600 hover:bg-charcoal-100'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <Section className="bg-cream-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}/portfolio/${project.slug}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[3/4] overflow-hidden bg-cream-200"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      style={{
                        backgroundImage: project.images[0]
                          ? `url(${project.images[0].src})`
                          : undefined,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-300 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-body text-xs uppercase tracking-widest text-gold-400">
                            {project.client || translations.categories[project.category as keyof typeof translations.categories]}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-light text-cream-50">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors group-hover:bg-cream-100 group-hover:text-charcoal-900">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  );
}
