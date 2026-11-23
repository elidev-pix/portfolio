import { useState } from 'react'
import { PageHead, Tags } from '../components/Bits'
import { experiences } from '../data/content'
import { useSeo } from '../hooks/useSeo'

function Logo({ src }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <span className="xp-logo">
      <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </span>
  )
}

export default function Experiences() {
  useSeo({ title: 'Expériences', description: 'Stages d’Eliel Sawadogo : développeur web full stack chez YIRMEA (2026) et initiation au développement backend chez SWITCH-MAKER (2025).', path: '/experiences' })
  return (
    <div className="page-main">
      <PageHead title="Expériences" lead="Deux stages en développement, pendant les vacances universitaires." />
      <section className="section">
        <div className="container">
          {experiences.map((x) => (
            <article key={x.company} className="xp">
              <div className="xp-meta">
                <Logo src={x.logo} />
                <h2>{x.company}</h2>
                <p className="period">{x.period}</p>
              </div>
              <div>
                <h3>{x.role}</h3>
                <ul className="check">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <Tags items={x.tech} soft />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}