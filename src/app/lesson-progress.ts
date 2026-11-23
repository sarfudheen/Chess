import { useCallback, useEffect, useRef, useState } from 'react'
import {
  emptyProgress,
  mergeProgress,
  recordAttempt,
  sanitizeProgress,
  type Progress,
} from '../shared/openings/progress'

const KEY = 'rook-openings-progress'

function read(): Progress {
  try {
    return sanitizeProgress(JSON.parse(localStorage.getItem(KEY) || 'null'))
  } catch {
    return emptyProgress()
  }
}

function write(progress: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    /* Progress is a convenience; a blocked store is not an error. */
  }
}

/**
 * Step progress lives on this device immediately and is merged with the
 * account's copy when the API is reachable, so a guest and a signed-in player
 * share one code path.
 */
export function useLessonProgress() {
  const latest = useRef<Progress>(read())
  const [progress, setProgress] = useState(latest.current)
  const timer = useRef<number | null>(null)
  const queued = useRef<Progress | null>(null)

  const commit = useCallback((next: Progress) => {
    latest.current = next
    write(next)
    setProgress(next)
  }, [])

  const flush = useCallback(() => {
    const body = queued.current
    if (!body) return
    queued.current = null
    void fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: body }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('offline')
        return (await response.json()) as { progress?: unknown }
      })
      .then((data) => {
        if (data?.progress)
          commit(mergeProgress(latest.current, sanitizeProgress(data.progress)))
      })
      .catch(() => {
        queued.current ??= body
      })
  }, [commit])

  useEffect(() => {
    let live = true
    let retry: number | undefined
    const pull = (attempt: number) => {
      void fetch('/api/progress', { cache: 'no-store' })
        .then(async (response) => {
          // The session cookie is created by the app's own first request, so a
          // 401 right after mount only means "try once more in a moment".
          if (response.status === 401 && attempt === 0) {
            retry = window.setTimeout(() => pull(1), 1600)
            return null
          }
          if (!response.ok) return null
          return (await response.json()) as { progress?: unknown }
        })
        .then((data) => {
          if (!live || !data?.progress) return
          commit(mergeProgress(latest.current, sanitizeProgress(data.progress)))
        })
        .catch(() => {
          /* Local progress keeps working while the API is unreachable. */
        })
    }
    pull(0)
    const onHide = () => flush()
    window.addEventListener('pagehide', onHide)
    return () => {
      live = false
      if (retry) window.clearTimeout(retry)
      window.removeEventListener('pagehide', onHide)
    }
  }, [commit, flush])

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const record = useCallback(
    (openingId: string, ply: number, firstTry: boolean) => {
      commit(recordAttempt(latest.current, openingId, ply, firstTry, Date.now()))
      queued.current = latest.current
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(flush, 1500)
    },
    [commit, flush],
  )

  return { progress, record, flush }
}
