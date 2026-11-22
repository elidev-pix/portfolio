import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/content'
import { useTheme } from '../hooks/useTheme'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > last && y > 160)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])

  const themeLabel = theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}${hidden && !open ? ' hidden' : ''}`}>
        <div className="container header-in">
          <Link to="/" className="brand" aria-label="Eliel Sawadogo, accueil">
            <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
              <rect width="64" height="64" rx="14" fill="var(--ink)" />
              <g fill="var(--accent)"><circle cx="18" cy="18" r="3.4" /><circle cx="32" cy="18" r="3.4" /><circle cx="46" cy="18" r="3.4" /><circle cx="18" cy="32" r="3.4" /><circle cx="18" cy="46" r="3.4" /><circle cx="32" cy="46" r="3.4" /><circle cx="46" cy="46" r="3.4" /></g>
              <circle cx="32" cy="32" r="4.4" fill="var(--bg)" />
            </svg>
            Eliel Sawadogo
          </Link>
          <nav className="nav-links" aria-label="Navigation principale">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <a className="icon-btn social" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (nouvel onglet)"><GithubIcon /></a>
            <a className="icon-btn social" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (nouvel onglet)"><LinkedinIcon /></a>
            <button className="icon-btn" onClick={toggle} aria-label={themeLabel} title={themeLabel}>{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
            <a className="btn btn-sm btn-primary" href={profile.cv} download><Download size={16} /> Télécharger le CV</a>
            <button className="icon-btn burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <nav aria-label="Navigation mobile">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>)}
          </nav>
          <div className="row">
            <a className="btn btn-primary" href={profile.cv} download><Download size={16} /> Télécharger le CV</a>
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (nouvel onglet)"><GithubIcon /></a>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (nouvel onglet)"><LinkedinIcon /></a>
          </div>
        </div>
      )}
    </>
  )
}
