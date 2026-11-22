import { useRef, useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHead } from '../components/Bits'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { profile } from '../data/content'
import { apiPost, hasApi } from '../lib/api'
import { useSeo } from '../hooks/useSeo'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom (2 caractères minimum).'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Indiquez une adresse e-mail valide.'
  if (v.subject.trim().length < 3) e.subject = 'Indiquez un sujet (3 caractères minimum).'
  if (v.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.'
  else if (v.message.length > 3000) e.message = 'Votre message dépasse 3 000 caractères.'
  return e
}

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Contacter Eliel Sawadogo : e-mail, téléphone, LinkedIn, GitHub ou formulaire. Ouagadougou, Burkina Faso.', path: '/contact' })
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | mailto | error
  const [serverError, setServerError] = useState('')
  const openedAt = useRef(Date.now())
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) { document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus(); return }
    if (values.website) { setState('sent'); return } // piège à robots : champ invisible rempli
    if (!hasApi) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      setState('mailto')
      return
    }
    setState('sending'); setServerError('')
    try {
      await apiPost('/api/contact', { name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(), message: values.message.trim(), website: values.website, elapsedMs: Date.now() - openedAt.current })
      setState('sent')
      setValues({ name: '', email: '', subject: '', message: '', website: '' })
    } catch (err) {
      setServerError(err.message || 'Envoi impossible.')
      setState('error')
    }
  }

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      {k === 'message'
        ? <textarea id={`f-${k}`} value={values[k]} onChange={set(k)} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `e-${k}` : undefined} maxLength={3200} {...props} />
        : <input id={`f-${k}`} value={values[k]} onChange={set(k)} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />}
      {errors[k] && <span className="err" id={`e-${k}`} role="alert">{errors[k]}</span>}
    </div>
  )

  return (
    <div className="page-main">
      <PageHead title="Contact" lead="Pour un stage, une collaboration ou une simple question, écrivez-moi." />
      <div className="container contact-grid">
        <ul className="contact-list">
          <li><small>E-mail</small><a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a></li>
          <li><small>Téléphone</small>{profile.phones.map((p) => <a key={p.href} href={p.href}><Phone size={18} /> {p.label}</a>)}</li>
          <li><small>Localisation</small><span style={{ display: 'inline-flex', gap: '.6rem', alignItems: 'center', fontWeight: 500 }}><MapPin size={18} style={{ color: 'var(--accent)' }} /> {profile.location}</span></li>
          <li><small>Réseaux</small>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon width="18" height="18" /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon width="18" height="18" /> GitHub</a>
          </li>
        </ul>
        <div>
          {state === 'sent' && <div className="notice ok" role="status"><b>Message envoyé.</b> Merci, je vous répondrai dès que possible.</div>}
          {state === 'mailto' && <div className="notice ok" role="status"><b>Votre application de messagerie s’est ouverte.</b> Le message est prêt : il ne reste qu’à l’envoyer. Si rien ne s’ouvre, écrivez à {profile.email}.</div>}
          {state === 'error' && <div className="notice bad" role="alert"><b>Envoi impossible.</b> {serverError} Vous pouvez aussi écrire à {profile.email}.</div>}
          {state !== 'sent' && state !== 'mailto' && (
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="form-row">{field('name', 'Nom', { autoComplete: 'name' })}{field('email', 'Adresse e-mail', { type: 'email', autoComplete: 'email' })}</div>
              {field('subject', 'Sujet')}
              {field('message', 'Message')}
              <div className="hp" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label></div>
              <div><button className="btn btn-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Envoi en cours' : 'Envoyer le message'}</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
