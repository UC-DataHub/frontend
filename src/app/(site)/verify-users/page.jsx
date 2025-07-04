// app/how-to-cite/page.jsx

/* prettier-ignore-file */
/* eslint-disable */

export const metadata = {
  title: 'Verify Users',
};

export default function VerifyUsersPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">Verify Users</h1>

      <section className="space-y-4">
        <p>
          This page is for administrators to verify user accounts. If you are a user trying to access the platform, please contact your administrator for assistance.
        </p>

        <p>
          If you are an administrator, please log in to your admin account to manage user verifications.
        </p>

        <p>
          For any issues or questions, please reach out to our support team using the Contact Us form at the bottom of the page.
        </p>
      </section>
    </main>
  );
}
