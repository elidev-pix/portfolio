import { useState } from 'react'
import { PageHead } from '../components/Bits'
import { skillGroups } from '../data/content'
import { useSeo } from '../hooks/useSeo'

const levels = ['Tous', 'Pratiqué', 'En apprentissage', 'Notions']
const cls = { 'Pratiqué': 'p', 'En apprentissage': 'a', Notions: 'n' }

export default function Skills() {
  useSeo({ title: 'Compétences', description: 'Compétences techniques d’Eliel Sawadogo : programmation, web, bases de données, systèmes et réseaux, virtualisation, Data Science. Niveaux indiqués honnêtement.', path: '/competences' })
  const [level, setLevel] = useState('Tous')
  return (
    <div className="page-main">
      <PageHead title="Compétences" lead="Pas de pourcentages : chaque technologie porte un niveau lisible." />
      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filtrer par niveau">
            {levels.map((l) => <button key={l} className="chip" aria-pressed={level === l} onClick={() => setLevel(l)}>{l}</button>)}
          </div>
          <p className="legend" style={{ marginBottom: '2rem' }}>
            <span className="lvl p"><i /> Pratiqué : utilisé dans un projet ou un stage</span>
            <span className="lvl a"><i /> En apprentissage</span>
            <span className="lvl n"><i /> Notions : découvert</span>
          </p>
          {skillGroups.map((g) => {
            const items = g.items.filter((i) => level === 'Tous' || i.level === level)
            if (!items.length) return null
            return (
              <div key={g.name} className="sk-group">
                <h2>{g.name}</h2>
                <ul className="sk-list">
                  {items.map((i) => <li key={i.name} className="sk"><b>{i.name}</b><span className={`lvl ${cls[i.level]}`}><i />{i.level}</span></li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
