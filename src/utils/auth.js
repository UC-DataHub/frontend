import axios from 'axios'
import toast from 'react-hot-toast'
import axiosInstance from './axiosInstance'


export async function tryRefreshToken() {
  const refresh = localStorage.getItem('refreshToken')
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  try {
    const res = await fetch(`${backendURL}/api/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })

    const data = await res.json()
    if (res.ok && data.access) {
      localStorage.setItem('accessToken', data.access)
      return true
    }
  } catch (err) {
    console.error('Token refresh failed:', err)
  }
  return false
}


export const resendVerificationEmail = async () => {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    const res = await axiosInstance.post(
      `/api/auth/resend-verification/`,
      {}
    )
    toast.success(res?.data?.message || 'Verification email sent')
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Failed to resend email')
  }
}

