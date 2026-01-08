import type { MDXComponents } from 'mdx/types';
import { Heading, Text } from '@/components/ui';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <Heading as="h1" size="display" className="mt-8 mb-4">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as="h2" size="heading" className="mt-8 mb-4">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="subheading" className="mt-6 mb-3">
        {children}
      </Heading>
    ),
    p: ({ children }) => (
      <Text as="p" className="mb-4">
        {children}
      </Text>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-gold-500 underline underline-offset-4 hover:text-gold-600 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-charcoal-700">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-gold-400 pl-6 italic text-charcoal-600">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
