import createMiddleware from 'next-intl/middleware';
import { availableLocales } from './constants/locales';

export default createMiddleware({
  // A list of all locales that are supported
  locales: availableLocales,

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
