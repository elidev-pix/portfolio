import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Download, MapPin, GraduationCap } from 'lucide-react'
import HeroGrid from '../components/HeroGrid'
import { Status } from '../components/Bits'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { profile, projects, skillGroups } from '../data/content'
import { useSeo } from '../hooks/useSeo'
import { useFetch } from '../hooks/useFetch'
import { formatDate } from '../lib/text'

export default function Home() {
  useSeo({
    description: 'Portfolio d’Eliel Sawadogo, étudiant en Licence 3 Télécommunications et Informatique (option ASR) à l’ESMT : développement logiciel, réseaux, sécurité et Data Science.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Person', name: profile.fullName, alternateName: profile.name,
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
      jobTitle: 'Étudiant en Télécommunications et Informatique', email: profile.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Ouagadougou', addressCountry: 'BF' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'École Supérieure Multinationale des Télécommunications (ESMT)' },
      sameAs: [profile.github, profile.linkedin],
    },
  })
  const { data: posts } = useFetch('/api/posts', [])
  const latest = (posts || []).slice(0, 3)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroGrid />
        <div className="container hero-in">
          <h1 id="hero-title" className="hero-name" aria-label={profile.name}>
            <span>Eliel</span>
            <span class>Sawadogo</span>
          </h1>
          <div className="hero-cols">
            <div>
              <p className="hero-role">{profile.title}</p>
              <p className="hero-tag">{profile.tagline}</p>
              <p className="hero-hook">{profile.hook}</p>
              <p className="hero-intro">{profile.intro}</p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/projets">Découvrir mes projets</Link>
                <a className="btn" href={profile.cv} download><Download size={16} /> Télécharger mon CV</a>
                <Link className="btn" to="/contact">Me contacter</Link>
              </div>
            </div>
            <ul className="hero-meta">
              <li><MapPin size={18} /> {profile.location}</li>
              <li><GraduationCap size={18} /> {profile.status}</li>
              <li className="hero-links">
                <a className="link-u" href={profile.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', gap: '.5rem', alignItems: 'center' }}><GithubIcon width="18" height="18" /> GitHub</a>
                <a className="link-u" href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', gap: '.5rem', alignItems: 'center' }}><LinkedinIcon width="18" height="18" /> LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container hero-foot">
          <span className="scroll-cue"><i aria-hidden="true" /> Faites défiler</span>
          <ArrowDown size={18} aria-hidden="true" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Ce que je fais en ce moment</h2>
          </div>
          <div className="now-grid">
            <div>
              <h3>Administration et sécurité des réseaux</h3>
              <p>Licence 3 ASR à l’ESMT : portail captif, services Linux, virtualisation et conteneurs en travaux pratiques.</p>
            </div>
            <div>
              <h3>Applications web</h3>
              <p>BK Coffee Shop est en cours de développement, avec React, Spring Boot. Solidarity Group est déployé.</p>
            </div>
            <div>
              <h3>Data Science et IA</h3>
              <p>Python, NumPy, Pandas et mathématiques pour le Machine Learning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Projets</h2>
            <p>Des applications web et des travaux d’infrastructure, présentés avec leur contexte et ma contribution.</p>
          </div>
          <div className="p-rows">
            {projects.map((p) => (
              <Link key={p.slug} to={`/projets/${p.slug}`} className="p-row">
                <div>
                  <h3>{p.title}</h3>
                  <p className="kind">{p.kind}</p>
                </div>
                <p className="kind">{p.tech.slice(0, 4).join(', ')}</p>
                <span style={{ display: 'inline-flex', gap: '.8rem', alignItems: 'center' }}><Status value={p.status} /><ArrowUpRight size={18} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: '1.6rem' }}><Link className="link-u" to="/projets">Voir tous les projets</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Compétences</h2>
            <p>Classées par niveau réel : pratiqué, en apprentissage ou simples notions.</p>
          </div>
          <div className="p-rows">
            {skillGroups.map((g) => (
              <div key={g.name} className="p-row" style={{ gridTemplateColumns: undefined }}>
                <h3 style={{ fontSize: '1.3rem' }}>{g.name}</h3>
                <p className="kind">{g.items.map((i) => i.name).join(', ')}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.6rem' }}><Link className="link-u" to="/competences">Voir le détail par niveau</Link></p>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head"><h2>Dernières publications</h2></div>
            <div className="posts">
              {latest.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="post-item">
                  <span className="meta">{formatDate(p.publishedAt)}</span>
                  <div><h3>{p.title}</h3><p className="muted">{p.excerpt}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container cta-band">
          <h2>Un stage, un projet, une question ?</h2>
          <p className="lead">Je suis ouvert aux échanges sur le développement, les réseaux et les parcours en ingénierie.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/contact">Me contacter</Link>
            <Link className="btn" to="/a-propos">Mon parcours</Link>
          </div>
        </div>
      </section>
    </>
  )
}
