import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/axiosInstance'
import { tryRefreshToken } from '@/utils/auth'
import toast from 'react-hot-toast'

const getAccessToken = () => localStorage.getItem('accessToken')
const setTokens = ({ access, refresh }) => {
  localStorage.setItem('accessToken', access)
  localStorage.setItem('refreshToken', refresh)
}
const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/auth/user/')
    return res.data
  } catch (err) {
    if (err.response?.status === 401) {
      console.log('Access token expired. Trying refresh...')
      const refreshed = await tryRefreshToken()
      if (refreshed) {
        try {
          const res = await axiosInstance.get('/api/auth/user/')
          return res.data
        } catch (retryErr) {
          return rejectWithValue(retryErr.response?.data || 'Retry failed after refresh')
        }
      }
    }

    return rejectWithValue(err.response?.data || 'Failed to fetch user')
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/auth/login/', { email, password })
      const { access, refresh } = res.data
      setTokens({ access, refresh })
      toast.success('Login successful 👋')
      const result = await dispatch(fetchUser())
      return result.payload
    } catch (err) {
      toast.error(err.response?.data?.detail ?? 'Login failed')
      return rejectWithValue(err.response?.data || 'Login failed')
    }
  }
)

export const refreshToken = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/api/auth/refresh/', {
      refresh: localStorage.getItem('refreshToken')
    })
    const { access } = res.data
    localStorage.setItem('accessToken', access)
    return res.data
  } catch (err) {
    clearTokens()
    return rejectWithValue(err.response?.data || 'Token refresh failed')
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  clearTokens()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.error = null
      })
  }
})

export default authSlice.reducer
