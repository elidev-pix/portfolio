import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/data/content.js'

const STATIC_ROUTES = ['/', '/a-propos', '/experiences', '/projets', '/competences', '/blog', '/tutoriels', '/contact']

function siteUrl(env) {
  const raw =
    env.VITE_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'http://localhost:5173'
  return raw.replace(/\/$/, '')
}

// Injecte l'URL du site dans index.html et génère sitemap.xml + robots.txt au build.
function seoPlugin(env) {
  const base = siteUrl(env)
  return {
    name: 'portfolio-seo',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', base),
    generateBundle() {
      const urls = [...STATIC_ROUTES, ...projects.map((p) => `/projets/${p.slug}`)]
      const today = new Date().toISOString().slice(0, 10)
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
        `\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), seoPlugin(env)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'three'
            if (id.includes('node_modules/highlight.js')) return 'hljs'
          },
        },
      },
    },
  }
})
