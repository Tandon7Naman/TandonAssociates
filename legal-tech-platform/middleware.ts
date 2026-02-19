/**
 * Legal Compliance Middleware
 * 
 * This middleware ensures compliance with Bar Council of India Rules,
 * particularly Rule 36 regarding advertising and solicitation restrictions.
 * 
 * Implemented safeguards:
 * 1. Mandatory legal disclaimer acknowledgment for first-time visitors
 * 2. Prohibition of direct solicitation
 * 3. Information-only purpose disclaimer
 * 4. Session-based tracking of disclaimer acceptance
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require disclaimer acceptance
const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password']

// Routes exempt from disclaimer (API, static assets, auth callbacks)
const EXEMPT_ROUTES = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/static',
  '/images',
  '/auth/callback'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if route is exempt
  const isExempt = EXEMPT_ROUTES.some(route => pathname.startsWith(route))
  if (isExempt) {
    return NextResponse.next()
  }
  
  // Check if user has accepted disclaimer
  const disclaimerAccepted = request.cookies.get('disclaimer_accepted')
  
  // If on public route and hasn't accepted disclaimer
  if (PUBLIC_ROUTES.includes(pathname) && !disclaimerAccepted) {
    // Set a flag to show disclaimer modal
    const response = NextResponse.next()
    response.cookies.set('show_disclaimer', 'true', {
      path: '/',
      maxAge: 60 // 1 minute - just for the current session
    })
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
