import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  variant?: 'default' | 'gold' | 'subtle';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  className,
  variant = 'default',
  orientation = 'horizontal',
}: DividerProps) {
  const variants = {
    default: 'bg-charcoal-900/10',
    gold: 'bg-gradient-to-r from-transparent via-gold-400 to-transparent',
    subtle: 'bg-charcoal-900/5',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px h-full',
          variants[variant],
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={cn(
        'h-px w-full',
        variants[variant],
        className
      )}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/50" />
      <div className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/50" />
    </div>
  );
}
