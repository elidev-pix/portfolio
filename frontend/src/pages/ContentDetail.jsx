import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Copy } from 'lucide-react'
import RichContent, { headingsOf } from '../components/RichContent'
import { Empty, Tags } from '../components/Bits'
import { LinkedinIcon } from '../components/Icons'
import { useFetch } from '../hooks/useFetch'
import { useSeo } from '../hooks/useSeo'
import { formatDate, readingTime } from '../lib/text'
import NotFound from './NotFound'

const BASE = { post: '/blog', tutorial: '/tutoriels' }
const API = { post: '/api/posts', tutorial: '/api/tutorials' }

function Share({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* presse-papiers indisponible */ }
  }
  return (
    <div className="share">
      <span className="muted">Partager</span>
      <a className="btn btn-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer"><LinkedinIcon width="15" height="15" /> LinkedIn</a>
      <a className="btn btn-sm" href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button className="btn btn-sm" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Lien copié' : 'Copier le lien'}</button>
    </div>
  )
}

export default function ContentDetail({ kind }) {
  const { slug } = useParams()
  const { data: item, loading, error } = useFetch(`${API[kind]}/${slug}`, null)
  const { data: all } = useFetch(API[kind], [])
  const base = BASE[kind]
  const isPost = kind === 'post'

  const doc = isPost ? item?.content : null
  const toc = useMemo(() => headingsOf(doc), [doc])
  const related = useMemo(() => {
    if (!item || !all) return []
    const keys = new Set([item.category, ...(item.tags || []), ...(item.technologies || [])].filter(Boolean))
    return all.filter((o) => o.slug !== item.slug && [o.category, ...(o.tags || []), ...(o.technologies || [])].some((k) => keys.has(k))).slice(0, 3)
  }, [item, all])

  const minutes = item?.readingTime || (isPost && doc ? readingTime(doc) : null)
  useSeo({
    title: item?.seoTitle || item?.title,
    description: item?.seoDescription || item?.excerpt,
    path: `${base}/${slug}`,
    image: item?.coverUrl,
    type: 'article',
    jsonLd: item ? { '@context': 'https://schema.org', '@type': isPost ? 'BlogPosting' : 'TechArticle', headline: item.title, description: item.excerpt, datePublished: item.publishedAt, image: item.coverUrl, author: { '@type': 'Person', name: 'Eliel Sawadogo' }, inLanguage: 'fr' } : undefined,
  })

  if (loading) return <div className="container" style={{ padding: '4rem var(--pad)' }} aria-busy="true"><div className="skeleton" /><div className="skeleton" /></div>
  if (error && !item) return <div className="container" style={{ paddingBlock: '4rem' }}><Empty title="Contenu momentanément indisponible" text="Le serveur ne répond pas pour l’instant." cta={{ to: base, label: 'Retour à la liste' }} /></div>
  if (!item) return <NotFound />

  return (
    <div className="page-main">
      <section className="page-head">
        <div className="container">
          <p className="muted" style={{ marginBottom: '1rem' }}><Link className="link-u" to={base}>{isPost ? 'Blog' : 'Tutoriels'}</Link></p>
          <h1 style={{ maxWidth: '20ch', fontSize: 'clamp(2.2rem, 6vw, 4.2rem)' }}>{item.title}</h1>
          <p className="lead" style={{ marginBottom: '1rem' }}>{item.excerpt}</p>
          <p className="muted">{[formatDate(item.publishedAt), minutes ? `${minutes} min de lecture` : null, item.category, item.difficulty].filter(Boolean).join(' · ')}</p>
        </div>
      </section>
      <div className="container">
        <div className="article-wrap">
          <article>
            {item.coverUrl && <img src={item.coverUrl} alt={item.coverAlt || ''} style={{ borderRadius: 14, marginBottom: '2rem', border: '1px solid var(--line)' }} />}
            {isPost ? <RichContent doc={doc} /> : (
              <div className="proj-main" style={{ maxWidth: '70ch', gap: '2.4rem' }}>
                {item.objective && <div className="block"><h2>Objectif pédagogique</h2><p>{item.objective}</p></div>}
                {item.prerequisites?.length > 0 && <div className="block"><h2>Prérequis</h2><ul className="check">{item.prerequisites.map((p) => <li key={p}>{p}</li>)}</ul></div>}
                {item.technologies?.length > 0 && <div className="block"><h2>Technologies utilisées</h2><Tags items={item.technologies} /></div>}
                <div className="steps">
                  {(item.steps || []).map((s, i) => <section key={i} className="step"><h3>{s.title}</h3><RichContent doc={s.content} /></section>)}
                </div>
                {item.result && <div className="block"><h2>Résultat</h2><RichContent doc={item.result} /></div>}
                {item.troubleshooting?.length > 0 && (
                  <div className="block"><h2>Erreurs rencontrées et solutions</h2>
                    <ul className="trouble">{item.troubleshooting.map((t, i) => <li key={i}><b>{t.error}</b><span className="muted">{t.solution}</span></li>)}</ul>
                  </div>
                )}
              </div>
            )}
            <div style={{ marginTop: '3rem' }}><Share title={item.title} /></div>
          </article>
          {toc.length > 0 && (
            <nav className="toc" aria-label="Sommaire">
              <h2>Sommaire</h2>
              {toc.map((h) => <a key={h.id} href={`#${h.id}`} className={h.level === 3 ? 'l3' : ''}>{h.text}</a>)}
            </nav>
          )}
        </div>
        {related.length > 0 && (
          <section style={{ borderTop: '1px solid var(--line)', paddingBlock: '3rem 4rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>À lire aussi</h2>
            <div className="posts">
              {related.map((r) => <Link key={r.slug} to={`${base}/${r.slug}`} className="post-item"><span className="meta">{formatDate(r.publishedAt)}</span><div><h3>{r.title}</h3><p className="muted">{r.excerpt}</p></div></Link>)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
