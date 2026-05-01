// pages/sitemap.xml.js
// Генерирует sitemap.xml динамически — включает все товары

const DOMAIN = 'https://velando24.de'
const TOTAL_CHUNKS = 8

export default function Sitemap() {
  return null
}

export async function getServerSideProps({ res }) {
  // Загружаем все товары
  let productIds = []
  try {
    const chunks = await Promise.all(
      Array.from({ length: TOTAL_CHUNKS }, (_, i) =>
        fetch(`${DOMAIN}/products/${i}.json`).then(r => r.json()).catch(() => [])
      )
    )
    productIds = chunks.flat().map(p => p.id).filter(Boolean)
  } catch (e) {
    productIds = []
  }

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/impressum', priority: '0.3', changefreq: 'monthly' },
    { url: '/datenschutz', priority: '0.3', changefreq: 'monthly' },
    { url: '/agb', priority: '0.3', changefreq: 'monthly' },
    { url: '/bewertungen', priority: '0.5', changefreq: 'weekly' },
  ]

  const productUrls = productIds.map(id => ({
    url: `/product/${id}`,
    priority: '0.8',
    changefreq: 'weekly',
  }))

  const allPages = [...staticPages, ...productUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(({ url, priority, changefreq }) => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}
