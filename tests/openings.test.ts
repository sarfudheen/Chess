import { describe, expect, test } from 'bun:test'
import { Chess } from 'chess.js'
import {
  LEVELS,
  OPENINGS,
  STARTER_PATH,
  levelFor,
  nextLesson,
  positionKey,
} from '../src/shared/openings'
import { identifyOpening, openingsAt, searchPosition } from '../src/shared/openings/book'
import {
  REVIEW_DAYS,
  dueSteps,
  emptyProgress,
  mergeProgress,
  recordAttempt,
  sanitizeProgress,
} from '../src/shared/openings/progress'

function chessAfter(moves: string[]) {
  const chess = new Chess()
  for (const san of moves) chess.move(san)
  return chess
}

describe('opening lessons', () => {
  test('every main line is legal and ends on the learner’s move', () => {
    for (const opening of OPENINGS) {
      const chess = new Chess()
      for (const step of opening.steps) chess.move(step.san)
      expect(chess.history()).toEqual(opening.moves)
      expect(opening.steps.every((step) => step.san === step.san.trim())).toBe(
        true,
      )
      // Lessons close on the side they teach, so the last card is "your move".
      expect(opening.moves.length % 2 === 0 ? 'b' : 'w').toBe(opening.side)
    }
  })

  test('every step explains itself and every sideline reply is playable', () => {
    for (const opening of OPENINGS) {
      const chess = new Chess()
      for (const [index, step] of opening.steps.entries()) {
        expect(step.title.trim().length).toBeGreaterThan(0)
        expect(step.why.trim().length).toBeGreaterThan(0)
        chess.move(step.san)
        for (const reply of step.replies ?? []) {
          const answered = new Chess(chess.fen())
          expect(() => answered.move(reply.san)).not.toThrow()
          expect(() => new Chess(answered.fen()).move(reply.answer)).not.toThrow()
          expect(reply.note.trim().length).toBeGreaterThan(0)
        }
        expect(index).toBeLessThan(opening.moves.length)
      }
    }
  })

  test('lessons have unique ids, real levels and a valid starter path', () => {
    const ids = OPENINGS.map((opening) => opening.id)
    expect(new Set(ids).size).toBe(ids.length)
    const levelIds = LEVELS.map((level) => level.id)
    for (const opening of OPENINGS) {
      expect(levelIds).toContain(levelFor(opening))
      expect(opening.goal.trim().length).toBeGreaterThan(0)
      expect(opening.nextPlan.trim().length).toBeGreaterThan(0)
      expect(opening.remember.trim().length).toBeGreaterThan(0)
    }
    for (const [index, id] of STARTER_PATH.entries()) {
      expect(ids).toContain(id)
      const next = nextLesson(id)
      if (index < STARTER_PATH.length - 1) expect(next?.id).toBe(STARTER_PATH[index + 1])
      else expect(next).not.toBeNull()
    }
  })

  test('searching a move list finds the lessons that reach the position', () => {
    const sicilian = searchPosition('1.e4 c5')
    expect('error' in sicilian).toBe(false)
    if ('error' in sicilian) return
    expect(sicilian.plies).toBe(2)
    expect(sicilian.matches.map((entry) => entry.opening.id)).toContain('najdorf')
    expect(
      sicilian.matches.every((entry) => entry.opening.moves[1] === 'c5'),
    ).toBe(true)

    const italian = searchPosition('1. e4 e5 2. Nf3 Nc6 3. Bc4')
    if ('error' in italian) throw new Error(italian.error)
    expect(italian.matches.map((entry) => entry.opening.id)).toContain('italian')
    // A FEN and the move list describe the same position.
    const byFen = searchPosition(chessAfter(['e4', 'e5', 'Nf3', 'Nc6', 'Bc4']).fen())
    if ('error' in byFen) throw new Error(byFen.error)
    expect(positionKey(byFen.fen)).toBe(positionKey(italian.fen))
    expect(byFen.matches.map((entry) => entry.opening.id)).toEqual(
      italian.matches.map((entry) => entry.opening.id),
    )
  })

  test('search rejects junk and reports positions no lesson reaches', () => {
    expect(searchPosition('')).toHaveProperty('error')
    expect(searchPosition('1.e4 z9')).toHaveProperty('error')
    expect(searchPosition('not/a/fen')).toHaveProperty('error')
    const odd = searchPosition('1.e4 e5 2.Qh5')
    if ('error' in odd) throw new Error(odd.error)
    expect(odd.matches).toEqual([])
  })

  test('the coach follows the book, names the next move and spots a deviation', () => {
    const inBook = chessAfter(['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'])
    const match = identifyOpening(inBook.pgn(), 'w', 'italian')
    expect(match?.opening.id).toBe('italian')
    expect(match?.inBook).toBe(true)
    expect(match?.expectedSan).toBe('Bc5')
    expect(match?.leftAt).toBeNull()

    // 3.d4 is the Scotch, a real lesson: the coach should follow that book.
    const scotch = identifyOpening(chessAfter(['e4', 'e5', 'Nf3', 'Nc6', 'd4']).pgn(), 'w')
    expect(scotch?.opening.id).toBe('scotch')
    expect(scotch?.inBook).toBe(true)

    // 3.a3 belongs to no lesson, so the Italian is the line we left.
    const deviation = chessAfter(['e4', 'e5', 'Nf3', 'Nc6', 'a3'])
    const left = identifyOpening(deviation.pgn(), 'w', 'italian')
    expect(left?.opening.id).toBe('italian')
    expect(left?.inBook).toBe(false)
    expect(left?.leftAt).toBe(4)
    expect(left?.expectedSan).toBe('Bc4')

    expect(identifyOpening('', 'w')).toBeNull()
    expect(identifyOpening(chessAfter(['a4']).pgn(), 'w')).toBeNull()
  })

  test('every lesson can be found at its own final position', () => {
    for (const opening of OPENINGS) {
      const last = chessAfter(opening.moves)
      const entries = openingsAt(last.fen())
      expect(entries.map((entry) => entry.opening.id)).toContain(opening.id)
      const entry = entries.find((item) => item.opening.id === opening.id)
      expect(entry?.ply).toBe(opening.moves.length)
    }
  })
})

describe('spaced review progress', () => {
  test('a first-try answer schedules a review, a miss brings it back sooner', () => {
    const now = 1_700_000_000_000
    const first = recordAttempt(emptyProgress(), 'italian', 3, true, now)
    const stat = first.steps.italian['3']
    expect(stat.tries).toBe(1)
    expect(stat.ok).toBe(1)
    expect(stat.due).toBe(now + REVIEW_DAYS[1] * 86400000)
    expect(dueSteps(first, now)).toEqual([])
    expect(dueSteps(first, now + REVIEW_DAYS[1] * 86400000)).toHaveLength(1)

    const missed = recordAttempt(first, 'italian', 3, false, now + 1000)
    expect(missed.steps.italian['3'].ok).toBe(0)
    expect(missed.steps.italian['3'].tries).toBe(2)
    expect(missed.steps.italian['3'].due).toBe(now + 1000 + 10 * 60000)
  })

  test('merging two devices keeps the furthest progress for each step', () => {
    const now = 1_700_000_000_000
    const phone = recordAttempt(emptyProgress(), 'scotch', 4, true, now)
    const laptop = recordAttempt(emptyProgress(), 'scotch', 4, true, now + 50_000)
    laptop.steps.scotch['6'] = { tries: 1, ok: 2, last: now, due: now + 3 * 86400000 }
    const merged = mergeProgress(phone, laptop)
    expect(merged.steps.scotch['4'].tries).toBe(1)
    expect(merged.steps.scotch['4'].last).toBe(now + 50_000)
    expect(merged.steps.scotch['6'].ok).toBe(2)
    expect(merged.updated).toBe(now + 50_000)
  })

  test('sanitises stored payloads and bounds their size', () => {
    expect(sanitizeProgress(null)).toEqual(emptyProgress())
    expect(sanitizeProgress({ steps: { '../etc': { 1: { tries: 1 } } } })).toEqual(
      emptyProgress(),
    )
    const clean = sanitizeProgress({
      updated: 5,
      steps: {
        italian: {
          3: { tries: 2, ok: 99, last: 10, due: 20, junk: true },
          nope: { tries: 1 },
        },
      },
    })
    expect(clean.steps.italian['3']).toEqual({ tries: 2, ok: REVIEW_DAYS.length - 1, last: 10, due: 20 })
    expect(clean.steps.italian['nope']).toBeUndefined()
    const big = sanitizeProgress({
      steps: Object.fromEntries(
        Array.from({ length: 200 }, (_, i) => [
          `opening-${i}`,
          Object.fromEntries(
            Array.from({ length: 200 }, (_, ply) => [String(ply), { tries: 1 }]),
          ),
        ]),
      ),
    })
    expect(Object.keys(big.steps).length).toBeLessThanOrEqual(80)
    expect(Object.keys(big.steps['opening-0']).length).toBeLessThanOrEqual(60)
  })
})
