'use client';

import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

export default function AuthWatcher() {
  useAuth(); // fetches user and refreshes token
  return null;
}