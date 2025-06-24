'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, refreshToken } from '@/redux/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await res.json()
      console.log('Auto-refresh result:', data)

      if (data.access) {
        // Optional: update Redux or localStorage if needed
      }
    }, 23 * 60 * 60 * 1000) // Refresh every 23 hours

    return () => clearInterval(interval)
  }, [])


  return { user }
}

export default useAuth
