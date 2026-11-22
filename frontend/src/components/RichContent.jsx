import { Fragment, useEffect, useRef } from 'react'
import { slugify, tiptapText } from '../lib/text'

// Rend un document Tiptap (JSON) en HTML sémantique. Les ids de titres alimentent le sommaire.
function applyMarks(text, marks = [], key) {
  return marks.reduce((child, m) => {
    switch (m.type) {
      case 'bold': return <strong key={key}>{child}</strong>
      case 'italic': return <em key={key}>{child}</em>
      case 'underline': return <u key={key}>{child}</u>
      case 'code': return <code key={key}>{child}</code>
      case 'link': {
        const href = m.attrs?.href || '#'
        const ext = /^https?:/.test(href)
        return <a key={key} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{child}</a>
      }
      default: return child
    }
  }, text)
}

function renderNode(node, i) {
  const kids = (node.content || []).map(renderNode)
  switch (node.type) {
    case 'text': return <Fragment key={i}>{applyMarks(node.text, node.marks, i)}</Fragment>
    case 'paragraph': return <p key={i}>{kids}</p>
    case 'heading': {
      const Tag = `h${Math.min(3, Math.max(1, node.attrs?.level || 2))}`
      return <Tag key={i} id={slugify(tiptapText(node))}>{kids}</Tag>
    }
    case 'bulletList': return <ul key={i}>{kids}</ul>
    case 'orderedList': return <ol key={i}>{kids}</ol>
    case 'listItem': return <li key={i}>{kids}</li>
    case 'blockquote': return <blockquote key={i}>{kids}</blockquote>
    case 'horizontalRule': return <hr key={i} />
    case 'hardBreak': return <br key={i} />
    case 'codeBlock': return <pre key={i}><code data-lang={node.attrs?.language || ''}>{tiptapText(node)}</code></pre>
    case 'image': return (
      <figure key={i}>
        <img src={node.attrs?.src} alt={node.attrs?.alt || ''} loading="lazy" decoding="async" />
        {node.attrs?.title && <figcaption>{node.attrs.title}</figcaption>}
      </figure>
    )
    case 'table': return <div className="tbl" key={i}><table><tbody>{kids}</tbody></table></div>
    case 'tableRow': return <tr key={i}>{kids}</tr>
    case 'tableHeader': return <th key={i}>{kids}</th>
    case 'tableCell': return <td key={i}>{kids}</td>
    default: return kids.length ? <Fragment key={i}>{kids}</Fragment> : null
  }
}

export default function RichContent({ doc }) {
  const ref = useRef(null)
  useEffect(() => {
    const blocks = ref.current?.querySelectorAll('pre code')
    if (!blocks?.length) return undefined
    let cancelled = false
    import('../lib/highlight').then(({ default: hljs }) => {
      if (cancelled) return
      blocks.forEach((el) => {
        const lang = el.dataset.lang
        const text = el.textContent
        const res = lang && hljs.getLanguage(lang) ? hljs.highlight(text, { language: lang }) : hljs.highlightAuto(text)
        el.innerHTML = res.value
      })
    })
    return () => { cancelled = true }
  }, [doc])
  if (!doc) return null
  return <div className="prose" ref={ref}>{(doc.content || []).map(renderNode)}</div>
}

export const headingsOf = (doc) =>
  (doc?.content || []).filter((n) => n.type === 'heading' && n.attrs?.level >= 2).map((n) => ({ id: slugify(tiptapText(n)), text: tiptapText(n), level: n.attrs.level }))
