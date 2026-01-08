'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-charcoal-900 text-cream-50 hover:bg-charcoal-800 border border-charcoal-900',
  secondary: 'bg-transparent text-charcoal-900 border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50',
  ghost: 'bg-transparent text-charcoal-900 hover:bg-charcoal-900/5',
  link: 'bg-transparent text-charcoal-900 underline-offset-4 hover:underline p-0',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-body font-medium tracking-wide',
      'transition-all duration-500 ease-elegant',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      variant !== 'link' && sizes[size],
      variants[variant],
      className
    );

    if ('href' in props && props.href) {
      const { href, ...linkProps } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          className={baseStyles}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonAsButton;
    return (
      <button
        className={baseStyles}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
