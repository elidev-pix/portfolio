import { Link } from 'react-router-dom'
import Cover from '../components/Covers'
import { PageHead, Status, Tags } from '../components/Bits'
import { projects } from '../data/content'
import { useSeo } from '../hooks/useSeo'

export default function Projects() {
  useSeo({ title: 'Projets', description: 'Projets d’Eliel Sawadogo : Solidarity Group, BK Coffee Shop, portail captif openNDS, services FTP/SFTP, virtualisation et Docker.', path: '/projets' })
  return (
    <div className="page-main">
      <PageHead title="Projets" lead="Applications web et travaux d’infrastructure. Chaque fiche indique le contexte, ma contribution et l’état réel du projet." />
      <section className="section">
        <div className="container p-grid">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projets/${p.slug}`} className="p-card">
              <Cover type={p.cover} />
              <div>
                <h3>{p.title}</h3>
                <p className="kind">{p.kind}</p>
              </div>
              <p className="sum">{p.summary}</p>
              <Status value={p.status} />
              <Tags items={p.tech.slice(0, 4)} soft />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
