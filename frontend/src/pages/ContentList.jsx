import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Empty, PageHead, Tags } from '../components/Bits'
import { hasApi } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { useSeo } from '../hooks/useSeo'
import { formatDate } from '../lib/text'

const PAGE_SIZE = 6

const CONFIG = {
  post: {
    api: '/api/posts', base: '/blog', title: 'Blog',
    lead: 'Notes techniques sur le développement, les réseaux, Linux, la virtualisation et la Data Science.',
    description: 'Blog technique d’Eliel Sawadogo : développement web, Java, Linux, réseaux et sécurité, Docker, Python et IA.',
    facets: [{ key: 'category', label: 'Catégorie', pick: (i) => (i.category ? [i.category] : []) }, { key: 'tag', label: 'Tag', pick: (i) => i.tags || [] }],
    empty: { title: 'Les premiers articles arrivent bientôt', text: 'Je documente ici ce que j’apprends, au fil des travaux pratiques et des projets.' },
  },
  tutorial: {
    api: '/api/tutorials', base: '/tutoriels', title: 'Tutoriels',
    lead: 'Des pas-à-pas avec prérequis, commandes, résultats et erreurs rencontrées.',
    description: 'Tutoriels techniques d’Eliel Sawadogo : Linux, réseaux, Docker, virtualisation. Prérequis, commandes, captures et solutions aux erreurs.',
    facets: [{ key: 'tech', label: 'Technologie', pick: (i) => i.technologies || [] }, { key: 'level', label: 'Niveau', pick: (i) => (i.difficulty ? [i.difficulty] : []) }],
    empty: { title: 'Les premiers tutoriels arrivent bientôt', text: 'Chaque tutoriel suivra la même structure : objectif, prérequis, étapes, résultat et erreurs rencontrées.' },
  },
}

export default function ContentList({ kind }) {
  const cfg = CONFIG[kind]
  useSeo({ title: cfg.title, description: cfg.description, path: cfg.base })
  const { data, loading, error } = useFetch(cfg.api, [])
  const items = useMemo(() => data || [], [data])
  const [q, setQ] = useState('')
  const [sel, setSel] = useState({})
  const [page, setPage] = useState(1)

  const facets = cfg.facets.map((f) => ({ ...f, values: [...new Set(items.flatMap(f.pick))].sort((a, b) => a.localeCompare(b, 'fr')) }))
  const filtered = items.filter((i) => {
    const hay = `${i.title} ${i.excerpt || ''} ${(i.tags || []).join(' ')}`.toLowerCase()
    if (q && !hay.includes(q.toLowerCase())) return false
    return cfg.facets.every((f) => !sel[f.key] || f.pick(i).includes(sel[f.key]))
  })
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const toggle = (key, v) => { setSel((s) => ({ ...s, [key]: s[key] === v ? null : v })); setPage(1) }

  return (
    <div className="page-main">
      <PageHead title={cfg.title} lead={cfg.lead} />
      <section className="section">
        <div className="container">
          {items.length > 0 && (
            <div className="toolbar">
              <div className="search">
                <Search size={18} aria-hidden="true" />
                <label className="sr-only" htmlFor="q">Rechercher</label>
                <input id="q" type="search" placeholder="Rechercher" value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} />
              </div>
              {facets.filter((f) => f.values.length > 0).map((f) => (
                <div key={f.key} className="filters" role="group" aria-label={f.label} style={{ marginBottom: 0 }}>
                  {f.values.map((v) => <button key={v} className="chip" aria-pressed={sel[f.key] === v} onClick={() => toggle(f.key, v)}>{v}</button>)}
                </div>
              ))}
            </div>
          )}
          {loading && <div aria-busy="true"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div>}
          {!loading && error && <Empty title="Contenu momentanément indisponible" text="Le serveur ne répond pas pour l’instant. Réessayez dans quelques instants." />}
          {!loading && !error && items.length === 0 && <Empty title={cfg.empty.title} text={hasApi ? cfg.empty.text : `${cfg.empty.text} Le serveur de contenu sera branché prochainement.`} cta={{ to: '/projets', label: 'Voir mes projets' }} />}
          {!loading && items.length > 0 && filtered.length === 0 && <Empty title="Aucun résultat" text="Essayez un autre mot-clé ou retirez un filtre." />}
          {shown.length > 0 && (
            <div className="posts">
              {shown.map((i) => (
                <Link key={i.slug} to={`${cfg.base}/${i.slug}`} className="post-item">
                  <span className="meta">{formatDate(i.publishedAt)}{i.readingTime ? ` · ${i.readingTime} min` : ''}</span>
                  <div>
                    <h3>{i.title}</h3>
                    <p className="muted" style={{ marginBottom: '.7rem' }}>{i.excerpt}</p>
                    <Tags items={[...(i.category ? [i.category] : []), ...(i.difficulty ? [i.difficulty] : []), ...(i.tags || []), ...(i.technologies || [])].slice(0, 6)} soft />
                  </div>
                </Link>
              ))}
            </div>
          )}
          {pages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              {Array.from({ length: pages }, (_, n) => n + 1).map((n) => <button key={n} className="chip" aria-pressed={n === current} aria-label={`Page ${n}`} onClick={() => setPage(n)}>{n}</button>)}
            </nav>
          )}
        </div>
      </section>
    </div>
  )
}
