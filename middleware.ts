import { NextRequest, NextResponse } from 'next/server';

const apiPrefix = '/jira/';

const headerWhitelist = new Set([
  'Accept'.toLowerCase(),
  'User-Agent'.toLowerCase(),
  'Content-Type'.toLowerCase(),
  'content-length'.toLowerCase(),
  'Authorization'.toLowerCase(),
]);

/**
 * redirects api calls to the Jira tracker specified in X-Tracker-Url header
 */
export function middleware(request: NextRequest) {
  const redirectToTrackerUrl = request.headers.get('X-Tracker-Url');

  if (redirectToTrackerUrl) {
    const requestPath = request.nextUrl.pathname.slice(apiPrefix.length);
    const apiPath = `/rest/api/${requestPath}${request.nextUrl.search}`;
    const redirectToUrl = new URL(apiPath, redirectToTrackerUrl);

    const redirectHeaders = new Headers();

    request.headers.forEach((value, key) => {
      if (headerWhitelist.has(key.toLowerCase())) {
        redirectHeaders.set(key, value);
      }
    });

    // we have to set user agent to curl in order to evade Jira's CSRF protection
    redirectHeaders.set('User-Agent', 'curl/7.81.0');

    return NextResponse.rewrite(redirectToUrl, {
      headers: redirectHeaders,
    });
  }
}

export const config = {
  matcher: `${apiPrefix}/:path*`,
};
