'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function EmailVerificationBanner() {
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const result = searchParams.get('verification')
    if (result === 'success' || result === 'failed') {
      setShow(true)
      setStatus(result)
      setTimeout(() => setShow(false), 15000)
    }
  }, [searchParams])

  if (!show) return null

  return (
    <div className={`text-white py-2 px-4 text-center ${status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {status === 'success' ? '✅ Your email was successfully verified!' : '❌ Verification link invalid or expired'}
      <button onClick={() => setShow(false)} className="ml-4 underline">Dismiss</button>
    </div>
  )
}
