/**
 * Step mastery and spaced review for the opening lessons.
 *
 * A step is one ply of a lesson. `ok` counts consecutive first-try successes,
 * which lengthens the interval before the step comes back for review. A miss
 * shortens it and brings the step back in ten minutes.
 */
export type StepStat = {
  /** Total attempts, correct or not. */
  tries: number
  /** Consecutive first-try successes, capped by the interval table. */
  ok: number
  /** Timestamp of the most recent attempt. */
  last: number
  /** Timestamp when this step should be reviewed again. */
  due: number
  /** The move the learner played instead, most recently. */
  miss?: string
  /** How many times in a row that same wrong move came up. */
  misses?: number
}

export type Progress = {
  steps: Record<string, Record<string, StepStat>>
  updated: number
}

export const DAY = 86400000
/** Review gaps in days, indexed by the number of first-try successes. */
export const REVIEW_DAYS = [0, 1, 3, 7, 16, 35] as const
const SOON = 10 * 60000
const MAX_OPENINGS = 80
const MAX_STEPS = 60

export function emptyProgress(): Progress {
  return { steps: {}, updated: 0 }
}

const finite = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.min(Math.floor(value), 1e15)
    : fallback

/** Keep stored progress to a shape and size the server will accept. */
export function sanitizeProgress(value: unknown): Progress {
  const result = emptyProgress()
  if (!value || typeof value !== 'object') return result
  const source = value as { steps?: unknown; updated?: unknown }
  result.updated = finite(source.updated)
  if (!source.steps || typeof source.steps !== 'object') return result
  for (const [openingId, raw] of Object.entries(
    source.steps as Record<string, unknown>,
  )) {
    if (!/^[a-z0-9-]{1,64}$/.test(openingId)) continue
    if (!raw || typeof raw !== 'object') continue
    const steps: Record<string, StepStat> = {}
    for (const [ply, stat] of Object.entries(raw as Record<string, unknown>)) {
      // Main-line steps are numbers; a sideline answer is "4r1" for reply 1.
      if (!/^\d{1,2}(?:r[0-2])?$/.test(ply)) continue
      if (!stat || typeof stat !== 'object') continue
      const entry = stat as Record<string, unknown>
      steps[ply] = {
        tries: Math.min(finite(entry.tries), 1000000),
        ok: Math.min(finite(entry.ok), REVIEW_DAYS.length - 1),
        last: finite(entry.last),
        due: finite(entry.due),
      }
      const miss =
        typeof entry.miss === 'string' && /^[A-Za-z0-9=+#-]{1,8}$/.test(entry.miss)
          ? entry.miss
          : undefined
      if (miss) {
        steps[ply].miss = miss
        steps[ply].misses = Math.min(finite(entry.misses, 1), 999)
      }
      if (Object.keys(steps).length >= MAX_STEPS) break
    }
    if (Object.keys(steps).length) result.steps[openingId] = steps
    if (Object.keys(result.steps).length >= MAX_OPENINGS) break
  }
  return result
}

/** Merge two stores, keeping the most advanced record of each step. */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const steps: Progress['steps'] = { ...a.steps }
  for (const [openingId, incoming] of Object.entries(b.steps)) {
    const existing = steps[openingId] ?? {}
    const merged: Record<string, StepStat> = { ...existing }
    for (const [ply, stat] of Object.entries(incoming)) {
      const current = merged[ply]
      if (!current) {
        merged[ply] = stat
        continue
      }
      // The newer attempt owns the mistake history, so a wrong move noted on
      // one device is not blended with an older one from another.
      const newer = stat.last >= current.last ? stat : current
      const mergedStep: StepStat = {
        tries: Math.max(current.tries, stat.tries),
        ok: Math.max(current.ok, stat.ok),
        last: Math.max(current.last, stat.last),
        due: stat.last >= current.last ? stat.due : current.due,
      }
      if (newer.miss) {
        mergedStep.miss = newer.miss
        mergedStep.misses = newer.misses ?? 1
      }
      merged[ply] = mergedStep
    }
    steps[openingId] = merged
  }
  return { steps, updated: Math.max(a.updated, b.updated) }
}

/** Storage key for a main-line step or one of its sideline answers. */
export function statKey(ply: number, reply?: number) {
  return reply === undefined ? String(ply) : `${ply}r${reply}`
}

export function stepStat(
  progress: Progress,
  openingId: string,
  ply: number,
  reply?: number,
): StepStat | undefined {
  return progress.steps[openingId]?.[statKey(ply, reply)]
}

/** Record one answer. `firstTry` is false when a hint or a miss came first. */
export function recordAttempt(
  progress: Progress,
  openingId: string,
  ply: number,
  firstTry: boolean,
  now: number,
  options: { miss?: string | null; reply?: number } = {},
): Progress {
  const key = statKey(ply, options.reply)
  const previous = progress.steps[openingId]?.[key]
  const ok = firstTry
    ? Math.min((previous?.ok ?? 0) + 1, REVIEW_DAYS.length - 1)
    : Math.max(0, (previous?.ok ?? 0) - 1)
  const stat: StepStat = {
    tries: (previous?.tries ?? 0) + 1,
    ok,
    last: now,
    due: now + (firstTry ? REVIEW_DAYS[ok] * DAY : SOON),
  }
  if (previous?.miss) {
    stat.miss = previous.miss
    stat.misses = previous.misses ?? 1
  }
  if (!firstTry && options.miss) {
    stat.misses = stat.miss === options.miss ? (stat.misses ?? 0) + 1 : 1
    stat.miss = options.miss
  }
  return {
    steps: {
      ...progress.steps,
      [openingId]: { ...(progress.steps[openingId] ?? {}), [key]: stat },
    },
    updated: now,
  }
}

export type DueStep = {
  openingId: string
  ply: number
  /** Set for a sideline answer: the index of the reply it answers. */
  reply?: number
  due: number
}

/** Steps whose review time has come, soonest first. */
export function dueSteps(progress: Progress, now: number): DueStep[] {
  const due: DueStep[] = []
  for (const [openingId, steps] of Object.entries(progress.steps)) {
    for (const [key, stat] of Object.entries(steps)) {
      if (!(stat.due > 0 && stat.due <= now)) continue
      const [ply, reply] = key.split('r')
      due.push({
        openingId,
        ply: Number(ply),
        ...(reply === undefined ? {} : { reply: Number(reply) }),
        due: stat.due,
      })
    }
  }
  return due.sort((a, b) => a.due - b.due)
}

/** How many steps of one opening are waiting for review. */
export function dueCount(progress: Progress, openingId: string, now: number) {
  return Object.values(progress.steps[openingId] ?? {}).filter(
    (stat) => stat.due > 0 && stat.due <= now,
  ).length
}
