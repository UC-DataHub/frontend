'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'

export default function StoreProvider({ children, preloadedState }) {
  const storeRef = useRef()

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}