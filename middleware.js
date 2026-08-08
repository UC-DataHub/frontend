import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = ['/', '/auth/signin', '/auth/signup', '/_next', '/favicon.ico', '/api']

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const isPublic = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  const jwt = req.cookies.get('jwt')?.value

  if (isPublic) return NextResponse.next()

  if (!jwt) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  try {
    // Must match Django's SIMPLE_JWT signing key (its DJANGO_SECRET_KEY).
    // Set JWT_SIGNING_KEY in the environment to the same value on both sides.
    const signingKey = process.env.JWT_SIGNING_KEY || 'secret'
    await jwtVerify(jwt, new TextEncoder().encode(signingKey))
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}
