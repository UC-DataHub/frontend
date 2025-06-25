// // src/app/api/auth/refresh/route.js
// import { headers } from 'next/headers'

// export async function POST() {
//   const cookieStore = await headers()
//   const cookie = cookieStore.get('cookie') || ''
//   const refresh = cookie.split('; ').find(row => row.startsWith('refresh_token='))?.split('=')[1] || null

//   if (!refresh) {
//     return Response.json({ access: null }, { status: 401 })
//   }

//   const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

//   const res = await fetch(`${backendURL}/api/auth/refresh/`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ refresh }),
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     return Response.json({ access: null }, { status: res.status })
//   }

//   // Determine if request came via HTTPS
//   const proto = cookieStore.get('x-forwarded-proto') || ''
//   const isSecure = proto === 'https'

//   const cookieStr = `jwt=${data.access}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` + (isSecure ? '; Secure' : '')

//   return Response.json({ success: true }, {
//     status: 200,
//     headers: {
//       'Set-Cookie': cookieStr,
//       'Content-Type': 'application/json',
//     },
//   })
// }


// src/app/api/auth/refresh/route.js
import { headers } from 'next/headers'

export async function POST(request) {
  const body = await request.json()
  const refresh = body.refresh

  if (!refresh) {
    return Response.json({ access: null }, { status: 401 })
  }

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  const res = await fetch(`${backendURL}/api/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })

  const data = await res.json()

  if (!res.ok) {
    return Response.json({ access: null }, { status: res.status })
  }

  return Response.json({ access: data.access }, { status: 200 })
}
