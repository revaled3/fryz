import { NextRequest, NextResponse } from 'next/server';

const locales = ['pl', 'en'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'pl';

function getLocale(request: NextRequest): Locale {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    if (locales.includes(preferred as Locale)) {
      return preferred as Locale;
    }
  }

  // Geo-based detection for Vercel
  const country = request.geo?.country;
  if (country === 'PL') return 'pl';
  if (country === 'US' || country === 'GB' || country === 'AU' || country === 'CA') return 'en';

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.') // files with extensions
  ) {
    return;
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Set locale cookie for future requests
    const response = NextResponse.next();
    const currentLocale = pathname.split('/')[1] as Locale;
    response.cookies.set('NEXT_LOCALE', currentLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    return response;
  }

  // Redirect to localized path
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|images|fonts|icons|.*\\..*).*)',],
};
