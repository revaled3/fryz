import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
  size?: 'default' | 'narrow' | 'wide';
}

const sizes = {
  default: 'max-w-[1440px]',
  narrow: 'max-w-[1024px]',
  wide: 'max-w-[1920px]',
};

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'container-luxury',
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface SectionProps extends ContainerProps {
  id?: string;
}

export function Section({
  children,
  className,
  id,
  size = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('section-spacing', className)}
    >
      <Container size={size}>
        {children}
      </Container>
    </section>
  );
}
