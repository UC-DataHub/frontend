'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/redux/authSlice';
import toast from 'react-hot-toast';
import LoadingOverlay from '../Datasets/LoadingOverlay';
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nx4f.onrender.com/';
  const dispatch = useDispatch();

  //when the password or confirm password changes, clear the password error
  useEffect(() => {
    setPasswordError('');
  }, [password, confirmPassword]);

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setPasswordError('');
  //   if (password !== confirmPassword) {
  //     // toast.error("Passwords do not match");
  //     setPasswordError('Passwords do not match.');
  //     return;
  //   }

  //   if (password.length < 8) {
  //     setPasswordError('Password must be at least 8 characters long.');
  //     // toast.error("Password must be at least 8 characters long");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${backendURL}/api/auth/register/`, {
  //       name,
  //       email,
  //       password,
  //     }, { withCredentials: true });

  //     if (response.status === 201 || response.status === 200) {
  //       await dispatch(fetchUser());
  //       toast.success(response?.data?.message || 'Registration successful 👋');
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.log('Registration failed:', error.response?.data);
  //     toast.error(error.response?.data?.email[0] || 'Registration failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    try {
      const response = await axiosInstance.post('/api/auth/register/', {
        name,
        email,
        password,
      });

      const token = response.data?.access;
      const refreshToken = response.data?.refresh;
      if (token) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      await dispatch(fetchUser());
      toast.success('Registration successful 👋');
      router.push('/');
    } catch (error) {
      console.log('Registration failed:', error.response?.data);
      toast.error(error.response?.data?.email?.[0] || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <button
        onClick={() => router.push('/')}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
      >
        ✕
      </button>
      {loading && <LoadingOverlay message="Creating account..." />}
      <form className="flex flex-col items-center justify-center h-screen" onSubmit={submit}>
        <h1 className="text-2xl mb-4">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          className="mb-2 p-2 border rounded w-80"
          required
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-2 p-2 border rounded w-80"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <div className="relative w-80 mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (min 8 chars)"
            className="p-2 border rounded w-full pr-10"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative w-80 mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="p-2 border rounded w-full pr-10"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {passwordError && (
          <p className="text-red-600 text-sm mb-4">{passwordError}</p>
        )}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-blue-500">
            Sign In
          </a>
        </p>
      </form>
    </>
  );
};

export default Signup;
