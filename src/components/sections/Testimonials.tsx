'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Section, Heading, SectionLabel } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { getTestimonials } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface TestimonialsProps {
  locale: Locale;
}

export function Testimonials({ locale }: TestimonialsProps) {
  const t = getTranslations(locale);
  const testimonials = getTestimonials(locale);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Section id="testimonials" className="bg-rose-50">
      <div className="text-center">
        <ScrollReveal>
          <SectionLabel>{t.testimonials.sectionLabel}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Heading as="h2" size="display" className="mt-4">
            {t.testimonials.title}
          </Heading>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 mx-auto max-w-2xl font-body text-charcoal-600">
            {t.testimonials.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Testimonial Slider */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative overflow-hidden py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-8">
                <p className="font-display text-2xl font-light leading-relaxed text-charcoal-800 md:text-3xl">
                  "{testimonials[current].content}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-8">
                <div className="inline-flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-cream-200">
                    {testimonials[current].image && (
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonials[current].image})` }}
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-display text-lg font-medium text-charcoal-900">
                      {testimonials[current].name}
                    </div>
                    <div className="font-body text-sm text-charcoal-600">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-charcoal-900 hover:text-charcoal-900"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(index);
                }}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  current === index ? 'w-8 bg-gold-500' : 'bg-charcoal-200'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-charcoal-900 hover:text-charcoal-900"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
