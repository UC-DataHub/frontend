export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/verify-users/', '/admin/', '/api/'],
    },
    sitemap: 'https://multiphasehub.org/sitemap.xml',
  }
}