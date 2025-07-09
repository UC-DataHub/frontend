export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/verify-users/', '/admin/', '/api/'],
    },
    sitemap: 'https://www.multiphasehub.org/sitemap.xml',
  }
}