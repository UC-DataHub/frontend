// app/how-to-cite/page.jsx

/* prettier-ignore-file */
/* eslint-disable */

export const metadata = {
  title: 'How to Cite',
};

export default function HowToCitePage() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">How to Cite</h1>

      <section className="space-y-4">
        <p>
          <strong>MultiphaseHUB</strong> is developed by the Complex Fluids and Multiphase Transport Laboratory and the Data-Centric Intelligence Laboratory at the University of Cincinnati, in collaboration with the Nano Energy and Data-Driven Discovery Laboratory at the University of Arkansas. It hosts datasets generously contributed by the multiphase transport research community.
        </p>

        <p>
          All data and models shared through MultiphaseHUB are licensed under the{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            className="text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)
          </a>
          . This means the content may be used, shared, and adapted for non-commercial purposes, provided appropriate credit is given.
        </p>

        <p>
          Continued support for this database depends on its demonstrated impact. We kindly request that you cite the database in your publications and presentations. To do so, please reference the relevant journal articles listed in the README file of each dataset and include the following acknowledgment:
        </p>

        <blockquote className="border-l-4 border-purple-500 pl-4 italic bg-gray-100 dark:bg-gray-800 p-3 rounded">
          “Data provided by the MultiphaseHUB at multiphasehub.org.”
        </blockquote>

        <p>
          By downloading or using content from MultiphaseHUB, you agree to the terms of the CC BY-NC 4.0 license.
        </p>
      </section>
    </main>
  );
}
