import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextSize = 'hero' | 'display' | 'heading' | 'subheading' | 'body' | 'small';

interface HeadingProps {
  as?: HeadingLevel;
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}

const sizeStyles: Record<TextSize, string> = {
  hero: 'text-hero font-display font-light',
  display: 'text-display font-display font-light',
  heading: 'text-heading font-display font-normal',
  subheading: 'text-subheading font-display font-normal',
  body: 'text-base font-body font-normal leading-relaxed',
  small: 'text-sm font-body font-normal',
};

export function Heading({
  as: Component = 'h2',
  size = 'heading',
  className,
  children,
  gradient = false,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        sizeStyles[size],
        gradient && 'text-gradient-gold',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps {
  as?: 'p' | 'span' | 'div';
  size?: 'body' | 'small';
  className?: string;
  children: React.ReactNode;
  muted?: boolean;
}

export function Text({
  as: Component = 'p',
  size = 'body',
  className,
  children,
  muted = false,
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeStyles[size],
        muted && 'text-charcoal-600',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-body font-medium uppercase tracking-[0.2em] text-gold-500',
        className
      )}
    >
      {children}
    </span>
  );
}
