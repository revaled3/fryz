'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button, Container, Heading, Text } from '@/components/ui';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/types';

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-charcoal-900"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/20 to-charcoal-900/60 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero/hero-bg.jpg)',
          }}
        />
        {/* Fallback gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-950 -z-10" />
      </motion.div>

      {/* Content */}
      <Container className="relative z-20 h-full">
        <motion.div
          style={{ opacity }}
          className="flex h-full flex-col justify-center pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-body text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              {t.hero.subtitle}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <Heading as="h1" size="hero" className="text-cream-50 max-w-4xl">
              {t.hero.title}
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl"
          >
            <Text className="text-cream-100/80 text-lg">
              {t.hero.description}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex gap-4"
          >
            <Button
              href={`/${locale}/contact`}
              size="lg"
              className="bg-gold-500 text-charcoal-900 border-gold-500 hover:bg-gold-400 hover:border-gold-400"
            >
              {t.hero.cta}
            </Button>
            <Button
              href={`/${locale}/portfolio`}
              variant="secondary"
              size="lg"
              className="border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
            >
              {t.portfolio.viewAll}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs uppercase tracking-widest text-cream-100/50">
            {t.hero.scrollDown}
          </span>
          <ChevronDown className="h-5 w-5 text-cream-100/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
