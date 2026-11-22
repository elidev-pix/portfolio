import { Link } from 'react-router-dom'
import { nav, profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-in">
          <div>
            <p className="big">Un projet, un stage, une question ?</p>
            <a className="link-u" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <h2>Navigation</h2>
            <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Me retrouver</h2>
            <ul>
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={profile.cv} download>CV en PDF</a></li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.status}, ESMT Ouagadougou</span>
        </div>
      </div>
    </footer>
  )
}
