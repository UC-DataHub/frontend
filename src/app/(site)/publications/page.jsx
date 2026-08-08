// pages.jsx (server-side component)
/* prettier-ignore-file */
/* eslint-disable */

export const metadata = {
  title: 'Publications',
}


// Fetch publications, but never let a backend outage fail the whole build/deploy.
// Returns [] on any error; the page re-fetches within `revalidate` seconds.
async function getPublications() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-nx4f.onrender.com';
  try {
    const res = await fetch(`${backendURL}/api/publications/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`Publications API returned HTTP ${res.status}`);
      return [];
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.error(`Publications API returned ${contentType}, expected JSON`);
      return [];
    }
    const json = await res.json();
    return Array.isArray(json) ? json : (json.results ?? []);
  } catch (err) {
    console.error('Failed to load publications:', err);
    return [];
  }
}

export default async function PublicationsPage() {
  const data = await getPublications(); // <- flat list, [] if the API is unavailable

  // Group publications by year
  const grouped = data.reduce((acc, pub) => {
    const y = pub.year;
    if (!acc[y]) acc[y] = [];
    acc[y].push(pub);
    return acc;
  }, {}); // <- now grouped by year

  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      {data.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          Publications are temporarily unavailable. Please check back shortly.
        </p>
      )}
      {Object.entries(grouped).sort((a, b) => b[0] - a[0]).map(([year, entries]) => (
        <section key={year} className="mb-6">
          <h2 className="text-xl font-semibold mb-3">{year}</h2>
          <ul className="space-y-4">
            {entries.map((pub, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-4">
                <p className="font-medium">{pub.authors}</p>
                <p className="italic">{pub.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{pub.details}</p>
                <div className="mt-2 space-x-3">
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                    >
                      Journal Link
                    </a>
                  )}
                  {pub.dataset && (
                    <a
                      href={`/datasets#${pub.dataset.name}`}
                      className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                    >
                      View {pub.dataset.title} Dataset
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
