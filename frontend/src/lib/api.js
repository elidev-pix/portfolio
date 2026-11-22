// Couche d'accès à l'API Spring Boot. Sans VITE_API_URL, le site utilise son contenu intégré.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export const hasApi = Boolean(API_URL)

export async function apiGet(path, signal) {
  if (!hasApi) throw new Error('API non configurée')
  const res = await fetch(`${API_URL}${path}`, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Erreur ${res.status}`)
  return res.json()
}

export async function apiPost(path, body) {
  if (!hasApi) throw new Error('API non configurée')
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    let message = `Erreur ${res.status}`
    try { message = (await res.json()).message || message } catch { /* corps vide */ }
    throw new Error(message)
  }
  return res.status === 204 ? null : res.json()
}
