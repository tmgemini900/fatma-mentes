import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en', 'it', 'ru'],
  defaultLocale: 'tr'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
