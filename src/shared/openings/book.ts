import { Chess } from 'chess.js'
import {
  OPENINGS,
  positionAfter,
  positionKey,
  type Opening,
  type Side,
} from './index'

/** A position on a lesson's main line. */
export type BookEntry = { opening: Opening; ply: number }

let index: Map<string, BookEntry[]> | null = null

/**
 * Every main-line position of every lesson, keyed by FEN prefix. Built once:
 * 50 lessons and a few hundred positions are cheap to replay.
 */
export function bookIndex(): Map<string, BookEntry[]> {
  if (index) return index
  index = new Map()
  for (const opening of OPENINGS) {
    for (let ply = 1; ply <= opening.moves.length; ply++) {
      const key = positionKey(positionAfter(opening, ply).fen)
      const entries = index.get(key)
      const entry = { opening, ply }
      if (entries) entries.push(entry)
      else index.set(key, [entry])
    }
  }
  return index
}

/** Lessons that reach this exact position, one entry per lesson. */
export function openingsAt(fen: string): BookEntry[] {
  const key = positionKey(fen)
  const entries = bookIndex().get(key) ?? []
  const best = new Map<string, BookEntry>()
  for (const entry of entries) {
    const seen = best.get(entry.opening.id)
    if (!seen || entry.ply > seen.ply) best.set(entry.opening.id, entry)
  }
  return [...best.values()].sort(
    (a, b) =>
      Number(b.opening.side === 'w') - Number(a.opening.side === 'w') ||
      a.opening.name.localeCompare(b.opening.name),
  )
}

export type PositionSearch =
  | { fen: string; plies: number; matches: BookEntry[] }
  | { error: string }

/**
 * Accepts either a FEN or a move list (`1.e4 c5 2.Nf3`) and returns the
 * position it describes plus the lessons that reach it.
 */
export function searchPosition(input: string, side?: Side): PositionSearch {
  const text = input.trim()
  if (!text) return { error: 'Type a few moves or paste a FEN.' }
  const chess = new Chess()
  if (text.includes('/')) {
    try {
      chess.load(text)
    } catch {
      return { error: 'That FEN is not a valid position.' }
    }
  } else {
    const tokens = text
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/\([^)]*\)/g, ' ')
      .replace(/\d+\.{1,3}/g, ' ')
      .replace(/\b(1-0|0-1|1\/2-1\/2|\*)\b/g, ' ')
      .split(/[\s,;]+/)
      .filter(Boolean)
    if (!tokens.length) return { error: 'Type a few moves or paste a FEN.' }
    for (const token of tokens) {
      try {
        if (!chess.move(token)) throw new Error('no move')
      } catch {
        return { error: `“${token}” isn’t a legal move from the start.` }
      }
    }
  }
  const matches = openingsAt(chess.fen())
  return {
    fen: chess.fen(),
    plies: chess.history().length,
    matches: side ? matches.filter((entry) => entry.opening.side === side) : matches,
  }
}

export type BookMatch = {
  opening: Opening
  /** Plies that follow the lesson before the game diverges (or all of them). */
  ply: number
  inBook: boolean
  /** The lesson's move from here, when there is one. */
  expectedSan: string | null
  /** The ply where the game left the lesson, when it did. */
  leftAt: number | null
}

/**
 * Follow a game through the lessons and report the deepest line it matches.
 * `side` prefers lessons for the learner's colour when several lines share a
 * prefix (every 1.e4 lesson matches a game that opens 1.e4).
 */
export function identifyOpening(
  pgn: string,
  side?: Side,
  preferId?: string | null,
): BookMatch | null {
  const chess = new Chess()
  if (pgn) {
    try {
      chess.loadPgn(pgn)
    } catch {
      return null
    }
  }
  const played = chess.history()
  if (!played.length) return null

  let best: (BookMatch & { score: number }) | null = null
  for (const opening of OPENINGS) {
    let ply = 0
    while (
      ply < played.length &&
      ply < opening.moves.length &&
      played[ply] === opening.moves[ply]
    )
      ply++
    if (ply === 0) continue
    const inBook = ply === played.length
    const expectedSan = opening.moves[ply] ?? null
    if (!inBook && !expectedSan) continue
    const score =
      ply * 100 +
      (inBook ? 50 : 0) +
      (side && opening.side === side ? 20 : 0) +
      (preferId && opening.id === preferId ? 40 : 0)
    if (!best || score > best.score)
      best = {
        opening,
        ply,
        inBook,
        expectedSan,
        leftAt: inBook ? null : ply,
        score,
      }
  }
  if (!best) return null
  const { score: _score, ...match } = best
  return match
}
