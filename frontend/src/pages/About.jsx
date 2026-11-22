import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHead } from '../components/Bits'
import { aboutText, certifications, education, motivations, timeline } from '../data/content'
import { useSeo } from '../hooks/useSeo'

export default function About() {
  useSeo({ title: 'À propos', description: 'Parcours d’Eliel Sawadogo : ESMT Ouagadougou (LTI, option ASR), stages en développement web, Data Science et objectif InDIA à l’ESMT Dakar.', path: '/a-propos' })
  const [open, setOpen] = useState(() => timeline.findIndex((t) => t.kind === 'now'))
  return (
    <div className="page-main">
      <PageHead title="À propos" lead="Un parcours à la frontière du logiciel, des réseaux et des données." />
      <section className="section">
        <div className="container about-grid">
          <figure className="portrait" style={{ margin: 0 }}>
            <img src="/eliel.jpg" alt="Portrait d’Eliel Sawadogo" width="400" height="400" loading="eager" decoding="async" />
          </figure>
          <div className="prose-about">{aboutText.map((t, i) => <p key={i}>{t}</p>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Chronologie</h2><p>Cliquez sur une étape pour afficher le détail.</p></div>
          <ol className="tl">
            {timeline.map((t, i) => (
              <li key={t.title} className={`tl-item ${t.kind}`}>
                <button className="tl-btn" aria-expanded={open === i} aria-controls={`tl-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="tl-date">{t.date}{t.kind === 'now' ? ' · en cours' : t.kind === 'next' ? ' · objectif' : ''}</span>
                  <span className="tl-title">{t.title}<ChevronDown size={18} aria-hidden="true" /></span>
                </button>
                <div id={`tl-${i}`} className={`tl-panel${open === i ? ' open' : ''}`} role="region" aria-label={t.title}>
                  <div><p className="place">{t.place}</p><p>{t.text}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Ce qui me motive</h2></div>
          <ul className="motiv">{motivations.map((m) => <li key={m.title}><h3>{m.title}</h3><p>{m.text}</p></li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Formation et certification</h2></div>
          <ul className="edu">
            {education.map((e) => (
              <li key={e.title}><span className="when">{e.period}{e.note ? ` · ${e.note}` : ''}</span><div><h3>{e.title}</h3><p className="muted">{e.place}</p></div></li>
            ))}
            {certifications.map((c) => (
              <li key={c.title}><span className="when">{c.date} · certification</span><div><h3>{c.title}</h3><p className="muted">{c.issuer}</p></div></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
