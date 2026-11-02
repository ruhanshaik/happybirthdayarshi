import { useCallback, useEffect, useRef } from 'react'

/** Schedules timeouts that are all cancelled automatically on unmount. */
export function useTimeouts() {
  const ids = useRef(new Set<number>())

  useEffect(() => {
    const set = ids.current
    return () => {
      set.forEach((id) => window.clearTimeout(id))
      set.clear()
    }
  }, [])

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      ids.current.delete(id)
      fn()
    }, ms)
    ids.current.add(id)
    return id
  }, [])

  const cancelAll = useCallback(() => {
    ids.current.forEach((id) => window.clearTimeout(id))
    ids.current.clear()
  }, [])

  return { later, cancelAll }
}
