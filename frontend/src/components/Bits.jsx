import { Link } from 'react-router-dom'
import { statusTone } from '../data/content'

export const Tags = ({ items, soft }) => (
  <ul className="tags">{items.map((t) => <li key={t} className={`tag${soft ? ' soft' : ''}`}>{t}</li>)}</ul>
)
export const Status = ({ value }) => <span className={`badge ${statusTone(value) === 'wip' ? 'wip' : ''}`}>{value}</span>
export const PageHead = ({ title, lead, children }) => (
  <section className="page-head">
    <div className="container">
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  </section>
)
export const Empty = ({ title, text, cta }) => (
  <div className="empty">
    <h3>{title}</h3>
    <p>{text}</p>
    {cta && <Link className="btn" to={cta.to}>{cta.label}</Link>}
  </div>
)
