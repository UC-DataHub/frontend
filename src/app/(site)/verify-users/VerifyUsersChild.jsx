'use client';

import { useSelector } from 'react-redux';
import VerifyUsersTable from './VerifyUsersTable';

export const metadata = {
  title: 'Verify Users',
};

export default function VerifyUsersChild() {
  const user = useSelector(state => state.auth.user);
  const isVerifier = user?.is_account_verifier;

  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">Verify Users</h1>

      {isVerifier ? (
        <VerifyUsersTable />
      ) : (
        <section className="space-y-4">
          <p>This page is for account verifiers only.</p>
          <p>Please log in with the appropriate permissions.</p>
        </section>
      )}
    </main>
  );
}
