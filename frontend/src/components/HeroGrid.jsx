import { lazy, Suspense, useEffect, useState } from 'react'

const DottedGrid = lazy(() => import('./DottedGrid'))

// Three.js est chargé après le premier affichage ; le motif CSS sert de repli et de placeholder.
export default function HeroGrid() {
  const [mount, setMount] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 120))
    const cic = window.cancelIdleCallback || clearTimeout
    const id = ric(() => setMount(true), { timeout: 800 })
    return () => cic(id)
  }, [])
  return (
    <div className={`grid-bg${ready ? ' ready' : ''}`} aria-hidden="true">
      <div className="grid-fallback" />
      {mount && !failed && (
        <Suspense fallback={null}>
          <DottedGrid onReady={() => setReady(true)} onFail={() => setFailed(true)} />
        </Suspense>
      )}
    </div>
  )
}
