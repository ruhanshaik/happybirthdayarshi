import { useCallback, useRef, useState } from 'react'
import { TIMING, type SceneId } from '../data/sceneConfig'

export type MemoriesOrigin = 'story' | 'finale'

/**
 * Central, predictable scene state machine.
 * - `go` ignores calls that arrive during the nav lock window (double taps, racing timers).
 * - Memory-room sub-scenes always return to 'memories' without touching the main story.
 */
export function useSceneNavigation() {
  const [scene, setScene] = useState<SceneId>('pin')
  const [memoriesOrigin, setMemoriesOrigin] = useState<MemoriesOrigin>('story')
  const [runId, setRunId] = useState(0)
  const sceneRef = useRef<SceneId>('pin')
  const lastNav = useRef(0)

  const go = useCallback((to: SceneId, origin?: MemoriesOrigin) => {
    const now = performance.now()
    if (to === sceneRef.current) return false
    if (now - lastNav.current < TIMING.navLock) return false
    lastNav.current = now
    sceneRef.current = to
    if (origin) setMemoriesOrigin(origin)
    setScene(to)
    return true
  }, [])

  /** Restart the whole experience from the PIN screen. */
  const reset = useCallback(() => {
    lastNav.current = performance.now()
    sceneRef.current = 'pin'
    setMemoriesOrigin('story')
    setRunId((n) => n + 1)
    setScene('pin')
  }, [])

  return { scene, go, reset, memoriesOrigin, runId }
}
