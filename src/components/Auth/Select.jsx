'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Select = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/signup');
  }, [router]);

  return null;
};

export default Select;
