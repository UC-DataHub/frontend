export default async function sitemap() {
  const now = new Date().toISOString();

  // Example: fetch dynamic dataset slugs from your API or DB
  // const datasets = await fetch('https://api.multiphasehub.org/datasets').then(res => res.json());

  return [
    {
      url: 'https://www.multiphasehub.org',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.multiphasehub.org/datasets',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // ...datasets.map(ds => ({
    //   url: `https://multiphasehub.org/datasets/${ds.slug}`,
    //   lastModified: ds.updated_at || now,
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // })),
    {
      url: 'https://www.multiphasehub.org/publications',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.multiphasehub.org/how-to-cite',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://www.multiphasehub.org/signin',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.2,
    },
    {
      url: 'https://www.multiphasehub.org/signup',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.2,
    },
  ];
}
