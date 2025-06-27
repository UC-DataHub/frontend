'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '@/redux/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchUser())

    const interval = setInterval(() => {
      dispatch(fetchUser()) // Or custom refresh logic
    }, 23 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  return { user }
}

export default useAuth
