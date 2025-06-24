import { Suspense } from 'react';
import Signin from '@/components/Auth/Signin';

export const metadata = {
  title: 'Login Page',
  description: 'This is Login page for datahub',
};

const SigninPage = () => {
  return (
    // <Suspense fallback={<div className="text-center p-8">Loading sign-in form...</div>}>
      <Signin />
    // </Suspense>
  );
};

export default SigninPage;
