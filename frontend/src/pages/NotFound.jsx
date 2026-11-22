import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo({ title: 'Page introuvable', description: 'Cette page n’existe pas.' })
  return (
    <div className="container nf">
      <h1>404</h1>
      <p className="lead">Cette page n’existe pas ou a été déplacée.</p>
      <Link className="btn btn-primary" to="/">Retour à l’accueil</Link>
    </div>
  )
}
