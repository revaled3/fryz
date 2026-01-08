'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { Section, Heading, SectionLabel, Button } from '@/components/ui';
import { ScrollReveal } from '@/components/motion';
import { getTranslations } from '@/lib/i18n';
import { getServices } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface ContactProps {
  locale: Locale;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function Contact({ locale }: ContactProps) {
  const t = getTranslations(locale);
  const services = getServices(locale);
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState('success');

    // Reset after 3 seconds
    setTimeout(() => setFormState('idle'), 3000);
  };

  const inputStyles = cn(
    'w-full bg-transparent border-b border-charcoal-200 py-3 font-body text-charcoal-900',
    'placeholder:text-charcoal-400 focus:border-gold-400 focus:outline-none transition-colors'
  );

  return (
    <Section id="contact" className="bg-cream-50">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div>
          <ScrollReveal>
            <SectionLabel>{t.contact.sectionLabel}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Heading as="h2" size="display" className="mt-4">
              {t.contact.title}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 font-body text-charcoal-600 max-w-md">
              {t.contact.subtitle}
            </p>
          </ScrollReveal>

          {/* Decorative Image */}
          <ScrollReveal delay={0.3} className="mt-12 hidden lg:block">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden bg-cream-200">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/contact/salon-interior.jpg)' }}
                />
                {/* Fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-cream-200 -z-10" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 border border-gold-400/30 -z-10" />
            </div>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t.contact.form.name}
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t.contact.form.email}
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="sr-only">
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t.contact.form.phone}
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  {t.contact.form.location}
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  className={cn(inputStyles, 'cursor-pointer')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t.contact.selectLocation}
                  </option>
                  <option value="warsaw">{t.locations.warsaw}</option>
                  <option value="los-angeles">{t.locations.losAngeles}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="service" className="sr-only">
                {t.contact.form.service}
              </label>
              <select
                id="service"
                name="service"
                className={cn(inputStyles, 'cursor-pointer')}
                defaultValue=""
              >
                <option value="" disabled>
                  {t.contact.selectService}
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t.contact.form.message}
                className={cn(inputStyles, 'resize-none')}
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={formState === 'loading' || formState === 'success'}
                whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-8 py-4',
                  'font-body font-medium tracking-wide transition-all duration-300',
                  formState === 'success'
                    ? 'bg-green-600 text-white'
                    : formState === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-charcoal-900 text-cream-50 hover:bg-charcoal-800',
                  'disabled:cursor-not-allowed'
                )}
              >
                {formState === 'loading' && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-5 w-5 border-2 border-cream-50/30 border-t-cream-50 rounded-full"
                    />
                    {t.contact.form.sending}
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <Check className="h-5 w-5" />
                    {t.contact.form.success}
                  </>
                )}
                {formState === 'error' && (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    {t.contact.form.error}
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    <Send className="h-5 w-5" />
                    {t.contact.form.submit}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </Section>
  );
}
