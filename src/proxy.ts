import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {  
  const response = intlMiddleware(request) as NextResponse;

  // const host = request.headers.get('host') || '';

  //if (!host.endsWith('.onion')) {
  //  const onionUrl =
  //    `https://korange.onion${request.nextUrl.pathname}${request.nextUrl.search}`;
  //
  //  response.headers.set('Onion-Location', onionUrl);
  //}

  return response;
}

export const config = {
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)'
};
