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
    await jwtVerify(jwt, new TextEncoder().encode('secret'))  // must match Django JWT key
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}
