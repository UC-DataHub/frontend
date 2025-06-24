import axios from 'axios'
import toast from 'react-hot-toast'


export async function tryRefreshToken() {
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    const data = await res.json()
    return data.success
  } catch (e) {
    console.error('Token refresh failed:', e)
    return false
  }
}


export const resendVerificationEmail = async () => {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    const res = await axios.post(
      `${backendURL}/api/auth/resend-verification-email/`,
      {},
      { withCredentials: true }
    )
    toast.success(res?.data?.message || 'Verification email sent')
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Failed to resend email')
  }
}

