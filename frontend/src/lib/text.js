export const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

// Texte brut d'un document Tiptap (pour le temps de lecture).
export function tiptapText(node) {
  if (!node) return ''
  if (node.text) return node.text
  return (node.content || []).map(tiptapText).join(' ')
}
export const readingTime = (doc) => Math.max(1, Math.round(tiptapText(doc).split(/\s+/).filter(Boolean).length / 200))
