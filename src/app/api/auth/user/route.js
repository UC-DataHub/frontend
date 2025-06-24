// src/app/api/auth/user/route.js
import { headers } from 'next/headers'

export async function GET() {
  const incomingHeaders = await headers()
  const cookieHeader = incomingHeaders.get('cookie') || ''

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  const res = await fetch(`${backendURL}/api/auth/user/`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Backend rejected user:', await res.text())
    return new Response(JSON.stringify({ user: null }), { status: 401 })
  }

  const user = await res.json()
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
