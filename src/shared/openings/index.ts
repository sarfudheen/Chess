import { Chess } from 'chess.js'
import type { Opening, OpeningSource, Side } from './types'
import { OPEN_GAMES } from './open-games'
import { SEMI_OPEN } from './semi-open'
import { CLOSED_GAMES } from './closed-games'
import { INDIAN } from './indian'
import { FLANK } from './flank'

export type { Opening, OpeningStep, OpeningReply, Side } from './types'

const sources: OpeningSource[] = [
  ...OPEN_GAMES,
  ...SEMI_OPEN,
  ...CLOSED_GAMES,
  ...INDIAN,
  ...FLANK,
]

export const OPENINGS: Opening[] = sources.map((source) => ({
  ...source,
  moves: source.steps.map((step) => step.san),
}))

export const FAMILIES = [
  'Open games',
  'Semi-open games',
  'Closed games',
  'Indian defences',
  'Flank openings',
] as const

export function sideName(side: Side) {
  return side === 'w' ? 'White' : 'Black'
}

/** FEN prefix used to compare positions: pieces, turn, castling, en passant. */
export function positionKey(fen: string) {
  return fen.split(' ').slice(0, 4).join(' ')
}

export type Level = 'starter' | 'club' | 'sharp'

export const LEVELS: { id: Level; label: string; note: string }[] = [
  { id: 'starter', label: 'Starter', note: 'Friendly lines to learn first' },
  { id: 'club', label: 'Club', note: 'Standard repertoire' },
  { id: 'sharp', label: 'Sharp', note: 'Theory-heavy or tactical' },
]

/** Hand-set levels for lessons whose length alone would mislabel them. */
const LEVEL_OVERRIDES: Record<string, Level> = {
  italian: 'starter',
  scotch: 'starter',
  'four-knights': 'starter',
  'bishops-opening': 'starter',
  london: 'starter',
  qgd: 'starter',
  philidor: 'starter',
  petroff: 'starter',
  'caro-kann': 'starter',
  'kings-gambit': 'sharp',
  'fried-liver': 'sharp',
  najdorf: 'sharp',
  dragon: 'sharp',
  'sicilian-yugoslav': 'sharp',
  benoni: 'sharp',
  benko: 'sharp',
  grunfeld: 'sharp',
  budapest: 'sharp',
  'nimzo-larsen': 'sharp',
}

export function levelFor(opening: Opening): Level {
  const override = LEVEL_OVERRIDES[opening.id]
  if (override) return override
  if (opening.moves.length <= 12) return 'starter'
  if (opening.moves.length <= 16) return 'club'
  return 'sharp'
}

/** A short, ordered first course through the section. */
export const STARTER_PATH = [
  'italian',
  'scotch',
  'four-knights',
  'london',
  'qgd',
  'caro-kann',
  'philidor',
  'kid',
]

export function pathPosition(id: string) {
  return STARTER_PATH.indexOf(id)
}

/** The next lesson to study: the next step on the path, else a family neighbour. */
export function nextLesson(id: string): Opening | null {
  const at = pathPosition(id)
  if (at >= 0 && at < STARTER_PATH.length - 1)
    return OPENINGS.find((opening) => opening.id === STARTER_PATH[at + 1]) ?? null
  const current = OPENINGS.find((opening) => opening.id === id)
  if (!current) return null
  const family = OPENINGS.filter(
    (opening) => opening.family === current.family && opening.id !== current.id,
  )
  return family[0] ?? null
}

/** The board after `plies` moves of the main line, plus the PGN for animation. */
export function positionAfter(opening: Opening, plies: number) {
  const chess = new Chess()
  for (const san of opening.moves.slice(0, plies)) chess.move(san)
  return { fen: chess.fen(), pgn: chess.pgn(), turn: chess.turn() }
}

/** Legal moves available in the position before a given ply (1-based). */
export function legalBefore(opening: Opening, ply: number) {
  const chess = new Chess()
  for (const san of opening.moves.slice(0, ply - 1)) chess.move(san)
  return chess.moves().sort()
}
