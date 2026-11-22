import { useEffect } from 'react'

const SITE = 'Eliel Sawadogo'
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}

// Met à jour titre, description, canonical, Open Graph et JSON-LD pour la page courante.
export function useSeo({ title, description, path, image, type = 'website', jsonLd }) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : `${SITE} — Télécommunications, développement et réseaux`
    document.title = full
    const url = `${window.location.origin}${path ?? window.location.pathname}`
    if (description) { setMeta('name', 'description', description); setMeta('property', 'og:description', description) }
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image || `${window.location.origin}/og.png`)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = url
    let ld = document.getElementById('ld-json')
    if (jsonLd) {
      if (!ld) { ld = document.createElement('script'); ld.id = 'ld-json'; ld.type = 'application/ld+json'; document.head.appendChild(ld) }
      ld.textContent = JSON.stringify(jsonLd)
    } else if (ld) ld.remove()
    return () => { document.getElementById('ld-json')?.remove() }
  }, [title, description, path, image, type, jsonLd])
}
