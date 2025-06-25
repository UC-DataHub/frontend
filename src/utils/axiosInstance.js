// utils/axiosInstance.js
import axios from 'axios';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: backendURL,
});

// Add Authorization header if token is in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
