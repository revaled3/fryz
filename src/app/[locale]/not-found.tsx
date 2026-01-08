import Link from 'next/link';
import { Container, Heading, Text, Button } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream-50">
      <Container className="text-center">
        <span className="font-display text-9xl font-light text-gold-400/30">
          404
        </span>
        <Heading as="h1" size="display" className="mt-4">
          Page Not Found
        </Heading>
        <Text className="mt-4 text-charcoal-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <div className="mt-8">
          <Button href="/">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
