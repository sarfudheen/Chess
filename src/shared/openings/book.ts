import { Chess } from 'chess.js'
import {
  OPENINGS,
  positionAfter,
  positionKey,
  type Opening,
  type OpeningReply,
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

/**
 * One node in a lesson's book. Children are keyed by the FEN prefix they lead
 * to, not by the move, so a game that reaches the same position by another
 * move order still follows the lesson.
 */
export type BookNode = {
  opening: Opening
  fen: string
  /** Main-line plies played to reach this node. */
  ply: number
  /** The move the lesson plays from here, if any. */
  expected: string | null
  /** Index of the step that plays `expected`. */
  step: number | null
  /** What the opponent may try instead of the main-line move. */
  replies: OpeningReply[]
  /** Set when the node only exists because the opponent chose a sideline. */
  sideline: { reply: OpeningReply; step: number } | null
  children: Map<string, BookNode>
}

export type LessonBook = {
  opening: Opening
  root: BookNode
  /** Every position of this lesson, main line and sidelines. */
  byKey: Map<string, BookNode[]>
}

let books: LessonBook[] | null = null

function buildBook(opening: Opening): LessonBook {
  const byKey = new Map<string, BookNode[]>()
  const make = (
    fen: string,
    ply: number,
    expected: string | null,
    step: number | null,
    replies: OpeningReply[],
    sideline: { reply: OpeningReply; step: number } | null = null,
  ): BookNode => {
    const node: BookNode = {
      opening,
      fen,
      ply,
      expected,
      step,
      replies,
      sideline,
      children: new Map(),
    }
    const list = byKey.get(positionKey(fen))
    if (list) list.push(node)
    else byKey.set(positionKey(fen), [node])
    return node
  }

  const root = make(
    new Chess().fen(),
    0,
    opening.moves[0] ?? null,
    opening.moves.length ? 0 : null,
    [],
  )
  const nodes: BookNode[] = [root]
  const chess = new Chess()
  for (let i = 0; i < opening.moves.length; i++) {
    chess.move(opening.moves[i])
    const node = make(
      chess.fen(),
      i + 1,
      opening.moves[i + 1] ?? null,
      i + 1 < opening.moves.length ? i + 1 : null,
      opening.steps[i]?.replies ?? [],
    )
    nodes.push(node)
    nodes[i].children.set(positionKey(node.fen), node)
  }

  // A sideline leaves the main line for one reply and answer. When the answer
  // reaches a main-line position again, the node is shared so coaching resumes.
  for (const node of nodes) {
    if (!node.replies.length) continue
    for (const reply of node.replies) {
      const board = new Chess(node.fen)
      try {
        board.move(reply.san)
      } catch {
        continue
      }
      const replyKey = positionKey(board.fen())
      if (node.children.has(replyKey)) continue
      const sideNode = make(board.fen(), node.ply, reply.answer, null, [], {
        reply,
        step: Math.max(0, node.ply - 1),
      })
      node.children.set(replyKey, sideNode)
      try {
        board.move(reply.answer)
      } catch {
        continue
      }
      const answerKey = positionKey(board.fen())
      const rejoin =
        byKey.get(answerKey)?.find((candidate) => !candidate.sideline) ?? null
      const tail =
        rejoin ??
        make(board.fen(), node.ply, null, null, [], {
          reply,
          step: Math.max(0, node.ply - 1),
        })
      sideNode.children.set(answerKey, tail)
    }
  }

  return { opening, root, byKey }
}

/** The lesson trees, built once. */
export function lessonBooks(): LessonBook[] {
  books ??= OPENINGS.map(buildBook)
  return books
}

const deepest = (nodes: BookNode[]) =>
  nodes.reduce((best, node) => (node.ply > best.ply ? node : best), nodes[0])

export type BookMatch = {
  opening: Opening
  /** Plies of the lesson's main line followed, including sideline detours. */
  ply: number
  /** The lesson's next move is still known from this position. */
  inBook: boolean
  /** The move the lesson plays from here, when there is one. */
  expectedSan: string | null
  /** Index of the step that plays `expectedSan`. */
  step: number | null
  /** The game left the lesson here, in game plies. */
  leftAt: number | null
  /** Set while the game is answering a recorded sideline. */
  sideline: { reply: OpeningReply; step: number } | null
  /** Sidelines the opponent could try from this position. */
  replies: OpeningReply[]
  /** The line (or a sideline) is complete and play continues freely. */
  complete: boolean
}

/**
 * Follow a game through the lessons and report the most relevant line.
 *
 * The walk is by position, so move-order transpositions count; when the game
 * steps off the book it reports the deepest position it did reach. `side`
 * prefers lessons for the learner's colour and `preferId` the lesson they chose.
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

  const keys: string[] = []
  const replay = new Chess()
  for (const san of played) {
    replay.move(san)
    keys.push(positionKey(replay.fen()))
  }

  let best: (BookMatch & { score: number }) | null = null
  for (const book of lessonBooks()) {
    let nodes: BookNode[] = [book.root]
    let last = book.root
    let followed = 0
    for (const [index, key] of keys.entries()) {
      const next: BookNode[] = []
      for (const node of nodes) {
        const child = node.children.get(key)
        if (child) next.push(child)
      }
      // A transposition can rejoin a lesson after a move order the tree does
      // not predict, so fall back to any position of this lesson. Keep scanning
      // after a gap: a line can transpose into the book several moves later.
      const branch = next.length ? next : book.byKey.get(key) ?? []
      if (!branch.length) {
        nodes = []
        continue
      }
      nodes = branch
      followed = index + 1
      for (const node of nodes) if (node.ply >= last.ply) last = node
    }
    if (!followed) continue

    const finalNode = nodes.length ? deepest(nodes) : null
    const complete = finalNode
      ? finalNode.expected === null
      : last.expected === null
    const inBook = !!finalNode?.expected
    const score =
      followed * 1000 +
      (finalNode?.ply ?? last.ply) * 10 +
      (inBook ? 60 : 0) +
      (side && book.opening.side === side ? 20 : 0) +
      (preferId && book.opening.id === preferId ? 200 : 0)
    if (best && score <= best.score) continue
    best = {
      opening: book.opening,
      ply: finalNode?.ply ?? last.ply,
      inBook,
      expectedSan: (finalNode ?? last).expected,
      step: (finalNode ?? last).step,
      leftAt: inBook || complete ? null : followed,
      sideline: (finalNode ?? last).sideline,
      replies: finalNode?.replies ?? [],
      complete,
      score,
    }
  }
  if (!best) return null
  const { score: _score, ...match } = best
  return match
}
