import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Cover from '../components/Covers'
import { Status, Tags } from '../components/Bits'
import { GithubIcon } from '../components/Icons'
import { projects } from '../data/content'
import { useSeo } from '../hooks/useSeo'
import NotFound from './NotFound'

const List = ({ title, items }) => items?.length ? <div className="block"><h2>{title}</h2><ul className="check">{items.map((i) => <li key={i}>{i}</li>)}</ul></div> : null

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const p = projects[idx]
  useSeo({ title: p?.title, description: p?.summary, path: `/projets/${slug}` })
  if (!p) return <NotFound />
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  return (
    <div className="page-main">
      <section className="page-head">
        <div className="container proj-head">
          <p className="muted"><Link className="link-u" to="/projets">Projets</Link></p>
          <h1>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}><Status value={p.status} /><span className="muted">{p.kind}</span></div>
          {(p.demo || p.repo) && (
            <div className="proj-links">
              {p.demo && <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">Voir la démonstration <ArrowUpRight size={16} /></a>}
              {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer"><GithubIcon width="16" height="16" /> Code source</a>}
            </div>
          )}
        </div>
      </section>
      <div className="container">
        <div style={{ paddingTop: '2.5rem' }}><Cover type={p.cover} /></div>
        <div className="proj-body">
          <aside className="proj-side">
            <div><h2>Technologies</h2><Tags items={p.tech} /></div>
            {p.skills?.length > 0 && <div><h2>Compétences développées</h2><ul className="check">{p.skills.map((s) => <li key={s}>{s}</li>)}</ul></div>}
          </aside>
          <div className="proj-main">
            {p.context && <div className="block"><h2>Contexte</h2><p>{p.context}</p></div>}
            {p.problem && <div className="block"><h2>Problématique</h2><p>{p.problem}</p></div>}
            <List title="Objectifs" items={p.objectives} />
            <List title="Fonctionnalités et réalisations" items={p.features} />
            <List title="Ma contribution" items={p.contributions} />
            <List title="Difficultés rencontrées" items={p.difficulties} />
            <List title="Solutions apportées" items={p.solutions} />
          </div>
        </div>
        <nav className="pager" aria-label="Autres projets">
          <Link className="link-u" to={`/projets/${prev.slug}`}>Précédent : {prev.title}</Link>
          <Link className="link-u" to={`/projets/${next.slug}`}>Suivant : {next.title}</Link>
        </nav>
        <div style={{ height: '4rem' }} />
      </div>
    </div>
  )
}
