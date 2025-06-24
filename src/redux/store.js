import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const makeStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  })
}
