import { useEffect, useState } from 'react'
import { apiGet, hasApi } from '../lib/api'

// Charge une ressource ; renvoie { data, loading, error }. Sans API, data = fallback.
export function useFetch(path, fallback = null) {
  const [state, setState] = useState({ data: hasApi ? null : fallback, loading: hasApi, error: null })
  useEffect(() => {
    if (!hasApi) return undefined
    const ctrl = new AbortController()
    setState((s) => ({ ...s, loading: true, error: null }))
    apiGet(path, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => { if (error.name !== 'AbortError') setState({ data: fallback, loading: false, error }) })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])
  return state
}
