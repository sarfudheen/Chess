import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Eye,
  Heart,
  Lightbulb,
  Lock,
  Play,
  RotateCcw,
  Search,
  Target,
} from 'lucide-react'
import { Board } from './Board'
import { Piece } from './Piece'
import { useLessonProgress } from './lesson-progress'
import {
  FAMILIES,
  LEVELS,
  OPENINGS,
  STARTER_PATH,
  legalBefore,
  levelFor,
  nextLesson,
  positionAfter,
  sideName,
  type Level,
  type Opening,
  type OpeningReply,
  type OpeningStep,
  type Side,
} from '../shared/openings'
import { searchPosition } from '../shared/openings/book'
import { dueCount, dueSteps, stepStat } from '../shared/openings/progress'

const LEARNED_KEY = 'rook-openings-learned'
const FAVORITES_KEY = 'rook-openings-favorites'
const RESUME_KEY = 'rook-openings-resume'

function readLearned(): string[] {
  try {
    const raw = localStorage.getItem(LEARNED_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

function saveLearned(ids: string[]) {
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify(ids))
  } catch {
    /* Learning progress is a convenience; a blocked store is not an error. */
  }
}

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

function saveFavorites(ids: string[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
  } catch {
    /* Favorites are a convenience; a blocked store is not an error. */
  }
}

function readResume(): { id: string; ply: number } | null {
  try {
    const raw = localStorage.getItem(RESUME_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as { id?: unknown; ply?: unknown; at?: unknown }
    if (typeof value.id !== 'string' || typeof value.ply !== 'number') return null
    if (!OPENINGS.some((opening) => opening.id === value.id)) return null
    if (typeof value.at === 'number' && Date.now() - value.at > 30 * 86400000)
      return null
    return { id: value.id, ply: Math.max(0, Math.floor(value.ply)) }
  } catch {
    return null
  }
}

function saveResume(id: string, ply: number) {
  try {
    localStorage.setItem(RESUME_KEY, JSON.stringify({ id, ply, at: Date.now() }))
  } catch {
    /* A blocked store only costs the shortcut. */
  }
}

/** Deep link into a lesson: #/openings/italian/4 */
function targetFromHash(): { id: string; ply: number } | null {
  const match = /^#\/openings\/([a-z0-9-]+)(?:\/(\d+))?$/.exec(location.hash)
  if (!match) return null
  const opening = OPENINGS.find((entry) => entry.id === match[1])
  if (!opening) return null
  const ply = Number(match[2] ?? 0)
  return {
    id: opening.id,
    ply: Number.isFinite(ply)
      ? Math.max(0, Math.min(ply, opening.moves.length))
      : 0,
  }
}

/** Three plausible answers, preferring the replies the lesson already names. */
function choicesFor(opening: Opening, index: number) {
  const correct = opening.steps[index].san
  const others = legalBefore(opening, index + 1).filter((move) => move !== correct)
  const named = (index > 0 ? opening.steps[index - 1].replies ?? [] : []).map(
    (reply) => reply.san,
  )
  const piece = correct[0]
  const preferred = named.filter((move) => others.includes(move))
  const samePiece = others.filter((move) => move[0] === piece)
  const pool = [...new Set([...preferred, ...samePiece, ...others])]
  const options = [correct, ...pool.slice(0, 2)]
  // Deterministic rotation keeps the answer from always sitting first.
  const shift = index % options.length
  return [...options.slice(shift), ...options.slice(0, shift)]
}

function wrongNote(opening: Opening, index: number, move: string) {
  const step = opening.steps[index]
  const reply =
    index > 0
      ? opening.steps[index - 1].replies?.find((item) => item.san === move)
      : undefined
  if (reply)
    return `${move} is a real reply — ${reply.note} — but this line does not play it here.`
  return `${move} is legal, but the move here has a different job: ${step.title}.`
}

const SQUARES = /\b[a-h][1-8]\b/g
/** The squares an explanation names, so the diagram can point at them. */
function focusSquares(step: OpeningStep) {
  const text = [
    step.title,
    step.why,
    ...(step.replies ?? []).map((reply) => `${reply.san} ${reply.note}`),
  ].join(' ')
  const found = new Set<string>()
  for (const match of text.matchAll(SQUARES)) found.add(match[0])
  return [...found]
}

const PIECE_NAMES = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king',
} as const

function moveFacts(fen: string, san: string) {
  try {
    const chess = new Chess(fen)
    const move = chess.move(san)
    return { piece: PIECE_NAMES[move.piece], from: move.from, to: move.to }
  } catch {
    return null
  }
}

const turnOf = (index: number) => (index % 2 === 0 ? 'w' : 'b')
const sideToMove = (plies: number) => (plies % 2 === 0 ? 'w' : 'b')
const FILES = 'abcdefgh'
const plyLabel = (index: number) =>
  index % 2 === 0 ? `${index / 2 + 1}.` : `${Math.ceil((index + 1) / 2)}...`

/** A small diagram of one step, so every explanation sits next to its position. */
const MiniBoard = memo(function MiniBoard({
  fen,
  pgn,
  orientation,
  label,
  focus = [],
}: {
  fen: string
  pgn: string
  orientation: Side
  label: string
  focus?: string[]
}) {
  const { pieces, last } = useMemo(() => {
    const replay = new Chess()
    if (pgn) replay.loadPgn(pgn)
    const move = replay.history({ verbose: true }).at(-1)
    const last: string[] = move ? [move.from, move.to] : []
    return { pieces: new Chess(fen).board().flat(), last }
  }, [fen, pgn])
  const focused = useMemo(() => new Set(focus), [focus])

  return (
    <div className="mini-board" role="img" aria-label={label}>
      {Array.from({ length: 64 }, (_, index) => {
        const file = orientation === 'w' ? index % 8 : 7 - (index % 8),
          rank =
            orientation === 'w' ? 8 - Math.floor(index / 8) : 1 + Math.floor(index / 8)
        const square = `${FILES[file]}${rank}`
        const piece = pieces.find((candidate) => candidate?.square === square)
        return (
          <div
            key={square}
            className={`mini-square ${(file + rank) % 2 === 0 ? 'light' : 'dark'}${
              last.includes(square) ? ' marked' : ''
            }${focused.has(square) ? ' focused' : ''}`}
          >
            {piece && <Piece type={piece.type} color={piece.color} />}
          </div>
        )
      })}
    </div>
  )
})

export type LessonTarget = { id: string; ply: number; nonce: number }

type ReviewItem = {
  opening: Opening
  ply: number
  /** Set when the review is a sideline answer rather than a main-line move. */
  reply?: OpeningReply
  replyIndex?: number
}

export function Openings({
  onPlay,
  onPractice,
  target,
  onTargetConsumed,
}: {
  onPlay: () => void
  onPractice: (id: string) => void
  target?: LessonTarget | null
  onTargetConsumed?: () => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    () => targetFromHash()?.id ?? null,
  )
  const [step, setStep] = useState(() => targetFromHash()?.ply ?? 0)
  const [query, setQuery] = useState('')
  const [positionQuery, setPositionQuery] = useState('')
  const [side, setSide] = useState<'all' | 'w' | 'b'>('all')
  const [level, setLevel] = useState<'all' | Level>('all')
  const [learned, setLearned] = useState<string[]>(readLearned)
  const [favorites, setFavorites] = useState<string[]>(readFavorites)
  const [resume, setResume] = useState<{ id: string; ply: number } | null>(
    readResume,
  )
  const [drill, setDrill] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [autoReply, setAutoReply] = useState(true)
  const [hint, setHint] = useState('')
  const [hintLevel, setHintLevel] = useState(0)
  const [wrong, setWrong] = useState('')
  const [wrongMoves, setWrongMoves] = useState<string[]>([])
  const [quiz, setQuiz] = useState({ asked: 0, correct: 0 })
  const [copied, setCopied] = useState(false)
  const [review, setReview] = useState<{ items: ReviewItem[]; index: number } | null>(
    null,
  )
  const [wrongReview, setWrongReview] = useState<{ opening: Opening; ply: number; miss: string } | null>(null)
  const [reviewDone, setReviewDone] = useState(0)
  const [dueCompact, setDueCompact] = useState(true)
  const [sideline, setSideline] = useState<{
    index: number
    reply: OpeningReply
    solved: boolean
  } | null>(null)
  const stepList = useRef<HTMLOListElement>(null)
  const failed = useRef(new Set<number>())
  const playMiss = useRef<string | null>(null)
  const sidelineMiss = useRef<string | null>(null)
  const appliedTarget = useRef<number | null>(null)
  const { progress, record } = useLessonProgress()

  const selected = OPENINGS.find((opening) => opening.id === selectedId) ?? null
  const position = useMemo(
    () => (selected ? positionAfter(selected, step) : null),
    [selected, step],
  )
  /** Every ply's position, so each step card can carry its own diagram. */
  const diagrams = useMemo(
    () =>
      selected
        ? selected.moves.map((_, index) => positionAfter(selected, index + 1))
        : [],
    [selected],
  )

  const now = Date.now()
  const due = useMemo(
    () =>
      dueSteps(progress, Date.now()).filter((item) =>
        OPENINGS.some((opening) => opening.id === item.openingId),
      ),
    [progress],
  )
  const dueByOpening = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of due)
      counts.set(item.openingId, (counts.get(item.openingId) ?? 0) + 1)
    return counts
  }, [due])
  const dueLessons = [...dueByOpening.entries()]
    .map(([id, count]) => ({ opening: OPENINGS.find((entry) => entry.id === id), count }))
    .filter((entry): entry is { opening: Opening; count: number } => !!entry.opening)

  const matches = useMemo(() => {
    const text = query.trim().toLowerCase()
    return OPENINGS.filter(
      (opening) =>
        (side === 'all' || opening.side === side) &&
        (level === 'all' || levelFor(opening) === level) &&
        (!text ||
          `${opening.name} ${opening.eco} ${opening.family} ${opening.summary}`
            .toLowerCase()
            .includes(text)),
    )
  }, [query, side, level])

  const positionResult = useMemo(
    () => (positionQuery.trim() ? searchPosition(positionQuery) : null),
    [positionQuery],
  )

  const mark = (id: string) => {
    setLearned((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
      saveLearned(next)
      return next
    })
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
      saveFavorites(next)
      return next
    })
  }

  function open(opening: Opening) {
    focusLesson(opening, 0)
  }

  function focusLesson(opening: Opening, ply: number) {
    setSelectedId(opening.id)
    setStep(Math.max(0, Math.min(ply, opening.moves.length)))
    setDrill(false)
    setInteractive(false)
    setAutoReply(true)
    setSideline(null)
    setHint('')
    setHintLevel(0)
    setWrong('')
    setWrongMoves([])
    setQuiz({ asked: 0, correct: 0 })
    failed.current = new Set()
    playMiss.current = null
    sidelineMiss.current = null
    window.scrollTo({ top: 0 })
  }

  function go(next: number) {
    if (!selected) return
    setStep(Math.max(0, Math.min(selected.moves.length, next)))
    setHint('')
    setHintLevel(0)
    setWrong('')
    setWrongMoves([])
    setSideline(null)
    playMiss.current = null
    sidelineMiss.current = null
  }

  function remember(index: number, firstTry: boolean, miss?: string | null) {
    if (!selected || turnOf(index) !== selected.side) return
    record(selected.id, index, firstTry, miss)
  }

  /** Open one review item: a main-line move, or a sideline the opponent tried. */
  function showReviewItem(item: ReviewItem) {
    focusLesson(item.opening, item.ply)
    setDrill(true)
    if (item.reply)
      setSideline({
        index: item.ply,
        reply: item.reply,
        solved: false,
      })
  }

  function startReview() {
    const items = dueSteps(progress, Date.now())
      .map((item): ReviewItem | null => {
        const opening = OPENINGS.find((entry) => entry.id === item.openingId)
        if (!opening) return null
        if (item.reply === undefined) return { opening, ply: item.ply }
        const reply = opening.steps[item.ply]?.replies?.[item.reply]
        return reply
          ? { opening, ply: item.ply, reply, replyIndex: item.reply }
          : null
      })
      .filter((item): item is ReviewItem => !!item)
    if (!items.length) return
    setReviewDone(0)
    setReview({ items, index: 0 })
    showReviewItem(items[0])
  }

  function nextReview() {
    if (!review) return
    const index = review.index + 1
    if (index >= review.items.length) {
      setReview(null)
      setDrill(false)
      setSideline(null)
      setReviewDone(review.items.length)
      return
    }
    const item = review.items[index]
    setReview({ ...review, index })
    showReviewItem(item)
  }

  /** In play-it-yourself mode the opponent answers a step behind, so the line flows. */
  useEffect(() => {
    if (!interactive || drill || sideline || !autoReply || !selected) return
    if (step >= selected.moves.length) return
    if (sideToMove(step) === selected.side) return
    const timer = setTimeout(() => {
      setStep((current) => Math.min(current + 1, selected.moves.length))
      setHint('')
    }, 650)
    return () => clearTimeout(timer)
  }, [interactive, drill, sideline, autoReply, selected, step])

  /** Play mode adds a card per move: keep the newest card's notes on screen. */
  useEffect(() => {
    const card = stepList.current?.querySelector<HTMLElement>('.step-card.current')
    if (!interactive || drill || sideline || !card) return
    // Beside the board the panel can reach past the fold; on its own rows the
    // reader is scrolling the page anyway, so leave their position alone.
    if (!window.matchMedia('(min-width: 981px)').matches) return
    const bottom = card.getBoundingClientRect().bottom
    if (bottom > window.innerHeight - 16) {
      window.scrollBy({ top: bottom - window.innerHeight + 16, behavior: 'smooth' })
    }
  }, [interactive, drill, sideline, step])

  /** Deep links and the resume shortcut. */
  useEffect(() => {
    if (!selectedId) return
    try {
      history.replaceState(
        null,
        '',
        `${location.pathname}${location.search}#/openings/${selectedId}/${step}`,
      )
    } catch {
      /* A sandboxed frame can refuse history updates; the lesson still works. */
    }
    saveResume(selectedId, step)
    setResume({ id: selectedId, ply: step })
  }, [selectedId, step])

  useEffect(() => {
    const sync = () => {
      const next = targetFromHash()
      if (!next) {
        setSelectedId(null)
        return
      }
      const opening = OPENINGS.find((entry) => entry.id === next.id)
      if (opening) focusLesson(opening, next.ply)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!target || appliedTarget.current === target.nonce) return
    appliedTarget.current = target.nonce
    const opening = OPENINGS.find((entry) => entry.id === target.id)
    if (opening) focusLesson(opening, target.ply)
    onTargetConsumed?.()
  }, [target, onTargetConsumed])

  const showOnboarding = !learned.length && !favorites.length && due.length === 0

  if (!selected)
    return (
      <div className="learn">
        <div className="learn-intro">
          <div>
            <span className="eyebrow">50 openings, step by step</span>
            <h2>Learn the openings properly.</h2>
            <p>
              Every lesson walks the main line move by move: why the move is
              played, what your opponent usually tries, and how you answer it.
              Switch on <strong>Play it yourself</strong> to move the pieces on
              the board and see each idea explained as you play it. Mark the
              ones you know and test yourself as you go.
            </p>
          </div>
          <div className="learn-progress">
            <strong>
              {learned.length}
              <span>/{OPENINGS.length}</span>
            </strong>
            <span>marked as learned</span>
            <div className="progress-track">
              <i style={{ width: `${(learned.length / OPENINGS.length) * 100}%` }} />
            </div>
            {due.length > 0 && (
              <span>
                {due.length} step{due.length === 1 ? '' : 's'} due for review
              </span>
            )}
          </div>
        </div>
        {showOnboarding && (
          <div className="onboarding-card">
            <h3>Get started</h3>
            <p>Pick a few openings to focus on. Add them to your favorites so you can find them quickly.</p>
            <div className="onboarding-actions">
              <button className="primary" onClick={() => { setSide('w'); setLevel('starter') }}>
                <Piece type="p" color="w" /> White openings
              </button>
              <button className="secondary" onClick={() => { setSide('b'); setLevel('starter') }}>
                <Piece type="p" color="b" /> Black openings
              </button>
            </div>
          </div>
        )}

        {resume && resume.ply > 0 && (
          <button
            className="resume-card"
            onClick={() => {
              const opening = OPENINGS.find((entry) => entry.id === resume.id)
              if (opening) focusLesson(opening, resume.ply)
            }}
          >
            <BookOpen size={16} />
            <span>Continue</span>
            <strong>
              {OPENINGS.find((entry) => entry.id === resume.id)?.name}
            </strong>
            <span>move {Math.ceil(resume.ply / 2)}</span>
            <ArrowRight size={15} />
          </button>
        )}

        {due.length > 0 && (
          <div className="due-banner">
            <div>
              <strong>
                {due.length} step{due.length === 1 ? '' : 's'} due
              </strong>
              <p>Reviews are short: one move at a time, then back to your day.</p>
            </div>
            <div className="due-openings">
              {dueLessons.slice(0, 4).map((entry) => (
                <span key={entry.opening.id}>
                  {entry.opening.name} · {entry.count}
                </span>
              ))}
            </div>
            <button className="primary" onClick={startReview}>
              <Target size={15} /> Review due
            </button>
            {due.length > 5 && (
              <button className="text-button muted" onClick={() => setDueCompact(!dueCompact)}>
                {dueCompact ? 'Expand view' : 'Compact view'}
              </button>
            )}
          </div>
        )}

        <div className="learn-toolbar">
          <label className="learn-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, ECO or idea"
              aria-label="Search openings"
            />
          </label>
          <div className="learn-filters" role="group" aria-label="Filter by side">
            {(
              [
                ['all', 'All'],
                ['w', 'As White'],
                ['b', 'As Black'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                className={side === value ? 'chosen' : ''}
                aria-pressed={side === value}
                onClick={() => setSide(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="learn-levels" role="group" aria-label="Filter by level">
            <span>Level</span>
            {(['all', ...LEVELS.map((entry) => entry.id)] as const).map((value) => (
              <button
                key={value}
                className={level === value ? 'chosen' : ''}
                aria-pressed={level === value}
                onClick={() => setLevel(value)}
              >
                {value === 'all'
                  ? 'Any'
                  : LEVELS.find((entry) => entry.id === value)?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="learn-position">
          <label className="learn-search">
            <Compass size={16} />
            <input
              value={positionQuery}
              onChange={(event) => setPositionQuery(event.target.value)}
              placeholder="Find by position: 1.e4 c5 — or paste a FEN"
              aria-label="Find openings by position"
            />
          </label>
          {positionResult && 'error' in positionResult && (
            <p className="learn-position-error">{positionResult.error}</p>
          )}
          {positionResult && !('error' in positionResult) && (
            <div className="learn-position-results">
              <p>
                {positionResult.plies
                  ? `After ${positionResult.plies} ${
                      positionResult.plies === 1 ? 'ply' : 'plies'
                    }`
                  : 'That position'}{' '}
                · {positionResult.matches.length} lesson
                {positionResult.matches.length === 1 ? '' : 's'} reach it
              </p>
              {positionResult.matches.slice(0, 10).map((entry) => (
                <button
                  className="position-result"
                  key={entry.opening.id}
                  onClick={() => focusLesson(entry.opening, entry.ply)}
                >
                  <strong>{entry.opening.name}</strong>
                  <span>
                    {sideName(entry.opening.side)} · {entry.opening.eco}
                  </span>
                  <em>
                    Next: {entry.opening.moves[entry.ply] ?? 'line complete'}
                  </em>
                </button>
              ))}
              {!positionResult.matches.length && (
                <p>No lesson reaches this position yet.</p>
              )}
              <button className="text-button" onClick={() => setPositionQuery('')}>
                Clear position search
              </button>
            </div>
          )}
        </div>

        {!query.trim() &&
          !positionQuery.trim() &&
          side === 'all' &&
          level === 'all' && (
            <section className="start-here">
              <h3>New to openings? Start here.</h3>
              <p>Eight lessons in order: centre, development, castling, then a plan.</p>
              <ol className="path-list">
                {STARTER_PATH.map((id, index) => {
                  const opening = OPENINGS.find((entry) => entry.id === id)
                  if (!opening) return null
                  return (
                    <li key={id}>
                      <button onClick={() => open(opening)}>
                        <i>{index + 1}</i>
                        {opening.name}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </section>
          )}

        {!positionQuery.trim() &&
          FAMILIES.map((family) => {
            const group = matches.filter((opening) => opening.family === family)
            if (!group.length) return null
            return (
              <section className="learn-group" key={family}>
                <h3>
                  {family} <span>{group.length}</span>
                </h3>
                <div className="opening-grid">
                  {group.map((opening) => {
                    const dueHere = dueByOpening.get(opening.id) ?? 0
                    return (
                      <button
                        className={`opening-card side-${opening.side}${favorites.includes(opening.id) ? ' favorited' : ''}`}
                        key={opening.id}
                        onClick={() => open(opening)}
                      >
                        <div className="opening-card-top">
                          <span className="favorite-toggle" onClick={(e) => { e.stopPropagation(); toggleFavorite(opening.id) }}>
                            {favorites.includes(opening.id) ? <Heart size={13} /> : <Heart size={13} />}
                          </span>
                          <span className={`side-badge ${opening.side}`}>
                            <Piece type="p" color={opening.side} />
                            {sideName(opening.side)}
                          </span>
                          <span className="eco-badge">{opening.eco}</span>
                          <span className={`level-badge ${levelFor(opening)}`}>
                            {LEVELS.find((entry) => entry.id === levelFor(opening))?.label}
                          </span>
                          {learned.includes(opening.id) && (
                            <span className="learned-badge" title="Marked as learned">
                              <Check size={12} /> Learned
                            </span>
                          )}
                          {dueHere > 0 && (
                            <span className="due-badge" title="Steps due for review">
                              {dueHere} due
                            </span>
                          )}
                        </div>
                        <strong>{opening.name}</strong>
                        <p>{opening.summary}</p>
                        <span className="opening-card-foot">
                          {opening.steps.length} moves
                          <ArrowRight size={14} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}

        {!positionQuery.trim() && !matches.length && (
          <div className="learn-empty">
            <BookOpen size={30} strokeWidth={1.3} />
            <p>No openings match “{query}”.</p>
            <button
              className="text-button"
              onClick={() => {
                setQuery('')
                setSide('all')
                setLevel('all')
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="learn-footer">
          <button className="primary" onClick={onPlay}>
            Play a game <ArrowRight size={17} />
          </button>
        </div>
      </div>
    )

  // `position` is derived from the selected lesson, so it is never null here.
  if (!position) return null
  const length = selected.moves.length
  const quizIndex = step < length ? step : null
  const isQuiz = drill && quizIndex !== null
  const quizStep = quizIndex === null ? null : selected.steps[quizIndex]
  const choices = quizIndex === null ? [] : choicesFor(selected, quizIndex)
  const sidelinePosition = (() => {
    if (!sideline) return null
    const board = new Chess(positionAfter(selected, sideline.index + 1).fen)
    try {
      board.move(sideline.reply.san)
    } catch {
      return null
    }
    return { fen: board.fen(), pgn: board.pgn(), turn: board.turn() }
  })()
  const view = sidelinePosition ?? position
  const canPlay =
    interactive &&
    !sideline &&
    step < length &&
    sideToMove(step) === selected.side
  const sidelineReady =
    !!sideline && !sideline.solved && !!sidelinePosition && sidelinePosition.turn === selected.side
  const boardEnabled = canPlay || sidelineReady || isQuiz
  const facts =
    step < length ? moveFacts(position.fen, selected.steps[step].san) : null
  const playHint =
    !facts || hintLevel === 0
      ? ''
      : hintLevel === 1
        ? `It’s a ${facts.piece} move.`
        : hintLevel === 2
          ? `The ${facts.piece} starts on ${facts.from}.`
          : `${selected.steps[step].san} — ${selected.steps[step].title}`
  const drillFacts =
    isQuiz && quizStep ? moveFacts(position.fen, quizStep.san) : null
  const drillHint =
    !drillFacts || hintLevel === 0
      ? ''
      : hintLevel === 1
        ? `It’s a ${drillFacts.piece} move.`
        : hintLevel === 2
          ? `The ${drillFacts.piece} starts on ${drillFacts.from}.`
          : quizStep
            ? `${quizStep.san} — ${quizStep.title}`
            : ''
  const dueHere = dueCount(progress, selected.id, now)
  const quizStat =
    quizIndex === null ? undefined : stepStat(progress, selected.id, quizIndex)
  const sidelineReplyIndex = sideline
    ? (selected.steps[sideline.index]?.replies?.indexOf(sideline.reply) ?? 0)
    : 0
  const sidelineStat = sideline
    ? stepStat(progress, selected.id, sideline.index, sidelineReplyIndex)
    : undefined
  const playStat =
    step < length ? stepStat(progress, selected.id, step) : undefined
  const next = nextLesson(selected.id)
  const turn = sideline
    ? 'Sideline'
    : interactive
      ? canPlay
        ? 'Your move'
        : step >= length
          ? 'Line complete'
          : 'Their reply'
      : drill
        ? 'Recall'
        : `Move ${Math.ceil(step / 2)}`

  function startSideline(index: number, reply: OpeningReply) {
    setSideline({ index, reply, solved: false })
    setHint('')
    setHintLevel(0)
    setWrong('')
    setWrongMoves([])
    sidelineMiss.current = null
  }

  function playMove(from: Square, to: Square, promotion?: string) {
    if (!selected || !position) return
    if (sideline && sidelinePosition && !sideline.solved) {
      const board = new Chess(sidelinePosition.fen)
      let played: { san: string } | null = null
      try {
        played = board.move({ from, to, promotion })
      } catch {
        return
      }
      if (!played) return
      const replyIndex =
        selected.steps[sideline.index]?.replies?.indexOf(sideline.reply) ?? 0
      if (played.san === sideline.reply.answer) {
        setSideline({ ...sideline, solved: true })
        setHint('')
        record(
          selected.id,
          sideline.index,
          !sidelineMiss.current && hintLevel === 0,
          sidelineMiss.current ?? undefined,
          replyIndex,
        )
      } else {
        sidelineMiss.current ??= played.san
        setHint(
          `${played.san} is legal, but the lesson answers ${sideline.reply.san} with ${sideline.reply.answer}.`,
        )
      }
      return
    }
    if (isQuiz) {
      const board = new Chess(position.fen)
      let played: { san: string } | null = null
      try {
        played = board.move({ from, to, promotion })
      } catch {
        return
      }
      if (!played) return
      submitAnswer(played.san)
      return
    }
    if (!interactive || !canPlay) return
    const board = new Chess(position.fen)
    let played: { san: string } | null = null
    try {
      played = board.move({ from, to, promotion })
    } catch {
      return
    }
    if (!played) return
    if (played.san === selected.steps[step].san) {
      remember(
        step,
        hintLevel === 0 && !failed.current.has(step),
        playMiss.current,
      )
      go(step + 1)
      return
    }
    failed.current.add(step)
    playMiss.current = played.san
    setHint(
      `${played.san} is legal, but this line plays ${selected.steps[step].san} — ${selected.steps[
        step
      ].title.toLowerCase()}. Use Hint for a nudge.`,
    )
  }

  function submitAnswer(move: string) {
    if (!selected || quizIndex === null || !quizStep) return
    const firstTry =
      !failed.current.has(quizIndex) && wrongMoves.length === 0 && hintLevel === 0
    setQuiz((current) => ({
      asked: current.asked + 1,
      correct: current.correct + (move === quizStep.san ? 1 : 0),
    }))
    if (move === quizStep.san) {
      remember(quizIndex, firstTry, wrongMoves.at(-1))
      setWrong('')
      setWrongMoves([])
      setHintLevel(0)
      if (review) nextReview()
      else go(quizIndex + 1)
      return
    }
    failed.current.add(quizIndex)
    setWrong(move)
    setWrongMoves((list) => (list.includes(move) ? list : [...list, move]))
  }

  function revealDrill() {
    if (quizIndex === null) return
    remember(quizIndex, false, wrongMoves.at(-1))
    setWrong('')
    setWrongMoves([])
    setHintLevel(0)
    if (review) nextReview()
    else go(quizIndex + 1)
  }

  function revealPlay() {
    if (step >= length) return
    remember(step, false, playMiss.current)
    failed.current.add(step)
    go(step + 1)
  }

  function copyPgn() {
    if (!selected) return
    const header = `[Event "Rook · ${selected.name}"]\n[ECO "${selected.eco}"]\n\n`
    const pgn = positionAfter(selected, selected.moves.length).pgn
    void navigator.clipboard
      .writeText(header + pgn)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        /* Clipboard access can be refused; the line is still on screen. */
      })
  }

  return (
    <div className={`learn-detail${interactive ? ' playing' : ''}`}>
      <div className="learn-detail-bar">
        <button
          className="text-button"
          onClick={() => {
            setSelectedId(null)
            setDrill(false)
            setInteractive(false)
            setSideline(null)
            setReview(null)
            setReviewDone(0)
            history.replaceState(null, '', location.pathname + location.search)
          }}
        >
          <ArrowLeft size={15} /> All openings
        </button>
        <div className="learn-detail-tags">
          <span className={`side-badge ${selected.side}`}>
            <Piece type="p" color={selected.side} />
            {sideName(selected.side)}
          </span>
          <span className="eco-badge">{selected.eco}</span>
          <span className="family-badge">{selected.family}</span>
          <span className={`level-badge ${levelFor(selected)}`}>
            {LEVELS.find((entry) => entry.id === levelFor(selected))?.label}
          </span>
          {dueHere > 0 && (
            <span className="due-badge">{dueHere} due</span>
          )}
          <button className="text-button copy-line" onClick={copyPgn}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy PGN'}
          </button>
        </div>
      </div>

      <div className="learn-layout">
        <section className="board-column" aria-label="Opening board">
          <div className="learn-board-title">
            <h2>{selected.name}</h2>
            <span>{selected.summary}</span>
          </div>
          <Board
            fen={view?.fen ?? ''}
            pgn={view?.pgn ?? ''}
            orientation={selected.side}
            turn={(view?.turn ?? 'w') as Side}
            enabled={boardEnabled}
            onMove={playMove}
          />
          <div className="learn-nav">
            <button
              className="icon-button"
              aria-label="Starting position"
              disabled={step === 0}
              onClick={() => go(0)}
            >
              <RotateCcw size={17} />
            </button>
            <button
              className="icon-button"
              aria-label="Previous move"
              disabled={step === 0}
              onClick={() => go(step - 1)}
            >
              <ChevronLeft size={19} />
            </button>
            <div className="learn-move-strip">
              {selected.moves.map((move, index) =>
                (interactive || drill) && index + 1 > step ? null : (
                  <button
                    key={`${move}-${index}`}
                    className={
                      index + 1 === step
                        ? 'learn-move current'
                        : index + 1 < step
                          ? 'learn-move done'
                          : 'learn-move'
                    }
                    onClick={() => go(index + 1)}
                  >
                    {index % 2 === 0 && <span>{index / 2 + 1}.</span>}
                    {move}
                  </button>
                ),
              )}
              {(interactive || drill) && (
                <span className="learn-move-count">
                  {step}/{length}
                </span>
              )}
            </div>
            <button
              className="icon-button"
              aria-label="Next move"
              disabled={step >= length}
              onClick={() => go(step + 1)}
            >
              <ChevronRight size={19} />
            </button>
          </div>
          <div className="learn-board-foot">
            <span>
              {sideline
                ? `Sideline · ${sideline.reply.san}`
                : interactive
                  ? canPlay
                    ? `Move ${Math.floor(step / 2) + 1} · your move`
                    : step >= length
                      ? 'Line complete'
                      : 'Their reply'
                  : drill
                    ? `Recall · move ${step} of ${length}`
                    : step === 0
                      ? 'Starting position'
                      : `Move ${Math.ceil(step / 2)} of ${Math.ceil(length / 2)}${
                          turnOf(step) === selected.side ? ' · your move' : ''
                        }`}
            </span>
            <div className="learn-modes">
              <button
                className={interactive ? 'drill-toggle on' : 'drill-toggle'}
                aria-pressed={interactive}
                onClick={() => {
                  const enabled = !interactive
                  setInteractive(enabled)
                  setDrill(false)
                  setSideline(null)
                  setWrong('')
                  setWrongMoves([])
                  setHint('')
                  setHintLevel(0)
                  if (enabled) {
                    setAutoReply(true)
                    setStep(0)
                  }
                }}
              >
                <Play size={15} />{' '}
                {interactive ? 'Playing it out' : 'Play it yourself'}
              </button>
              <button
                className={drill ? 'drill-toggle on' : 'drill-toggle'}
                aria-pressed={drill}
                onClick={() => {
                  const enabled = !drill
                  setDrill(enabled)
                  setInteractive(false)
                  setSideline(null)
                  setWrong('')
                  setWrongMoves([])
                  setHint('')
                  setHintLevel(0)
                  setQuiz({ asked: 0, correct: 0 })
                  failed.current = new Set()
                  if (!enabled) setReview(null)
                }}
              >
                <Target size={15} /> {drill ? 'Recall drill on' : 'Practice recall'}
              </button>
            </div>
          </div>
        </section>

        <aside className="game-panel learn-panel">
          <div className="learn-panel-head">
            <div>
              <span className="eyebrow">The plan</span>
              <p>{selected.goal}</p>
            </div>
            <div className="learn-panel-actions">
              <button
                className={learned.includes(selected.id) ? 'learned-toggle on' : 'learned-toggle'}
                aria-pressed={learned.includes(selected.id)}
                onClick={() => mark(selected.id)}
              >
                {learned.includes(selected.id) ? <Check size={15} /> : <BookOpen size={15} />}
                {learned.includes(selected.id) ? 'Learned' : 'Mark learned'}
              </button>
              <button
                className="text-button favorite-button"
                onClick={() => toggleFavorite(selected.id)}
                title={favorites.includes(selected.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorites.includes(selected.id) ? <Heart size={14} /> : <Heart size={14} />}
                {favorites.includes(selected.id) ? 'Favorite' : 'Favorite'}
              </button>
              <button className="text-button play-opening" onClick={() => onPractice(selected.id)}>
                <Play size={13} /> Play this opening
              </button>
            </div>
          </div>

          {review && (
            <div className="review-progress">
              <span className="eyebrow">Review</span>
              <strong>
                {review.index + 1} of {review.items.length}
              </strong>
              <button
                className="text-button"
                onClick={() => {
                  setReview(null)
                  setDrill(false)
                }}
              >
                Exit
              </button>
            </div>
          )}

          {reviewDone > 0 && !review && (
            <div className="review-complete">
              <span className="eyebrow">Review complete</span>
              <p>
                You reviewed {reviewDone} step{reviewDone === 1 ? '' : 's'}. Each one
                comes back when it is due again.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setReviewDone(0)
                  setSelectedId(null)
                  history.replaceState(null, '', location.pathname + location.search)
                }}
              >
                Back to all openings
              </button>
            </div>
          )}

          {wrongReview && (
            <div className="wrong-review-card">
              <span className="eyebrow">Reviewing a mistake</span>
              <p>
                You played <strong>{wrongReview.miss}</strong> here instead of the book move.
              </p>
              <div className="wrong-review-actions">
                <button
                  className="text-button"
                  onClick={() => {
                    setWrongReview(null)
                    setDrill(false)
                  }}
                >
                  Skip
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    const opening = wrongReview.opening
                    const ply = wrongReview.ply
                    setWrongReview(null)
                    focusLesson(opening, ply)
                    setDrill(true)
                  }}
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {sideline && (
            <div className="sideline-card">
              <span className="eyebrow">If they play it</span>
              <div className="sideline-line">
                <em>{Math.floor(sideline.index / 2) + 1}…</em>
                <strong>{sideline.reply.san}</strong>
              </div>
              <p>{sideline.reply.note}</p>
              {sidelineStat?.miss && (sidelineStat.misses ?? 0) >= 2 && (
                <p className="mistake-note">
                  You have answered this with{' '}
                  <strong>{sidelineStat.miss}</strong> {sidelineStat.misses}{' '}
                  times. The book answer is {sideline.reply.answer}.
                </p>
              )}
              {!sidelinePosition ? (
                <p>That reply is not available from this position.</p>
              ) : sideline.solved ? (
                <p className="sideline-answer">
                  <Check size={13} /> Yes — {sideline.reply.answer}. That is the book
                  answer to {sideline.reply.san}.
                </p>
              ) : (
                <p>
                  You are {sideName(selected.side)}: play the answer on the board, or
                  ask for it.
                </p>
              )}
              {hint && <p className="interactive-hint">{hint}</p>}
              <div className="sideline-actions">
                {!sideline.solved && (
                  <button
                    className="text-button"
                    onClick={() => {
                      record(
                        selected.id,
                        sideline.index,
                        false,
                        sidelineMiss.current ?? undefined,
                        selected.steps[sideline.index]?.replies?.indexOf(
                          sideline.reply,
                        ) ?? 0,
                      )
                      setSideline({ ...sideline, solved: true })
                    }}
                  >
                    Show the answer <ArrowRight size={13} />
                  </button>
                )}
                {review && sideline.solved ? (
                  <button className="text-button" onClick={nextReview}>
                    Next review <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    className="text-button"
                    onClick={() => setSideline(null)}
                  >
                    Back to the line
                  </button>
                )}
              </div>
            </div>
          )}

          {interactive && !sideline && (
            <div className="interactive-card">
              {step >= length ? (
                <>
                  <span className="eyebrow">Line complete</span>
                  <p>
                    You played the whole line. That is the position the lesson wants
                    you to reach — say the plan out loud once, then try it again from
                    the start.
                  </p>
                  <button className="text-button" onClick={() => go(0)}>
                    <RotateCcw size={13} /> Play it again
                  </button>
                </>
              ) : canPlay ? (
                <>
                  <span className="eyebrow">
                    Your move · {sideName(selected.side)} to play
                  </span>
                  <p>
                    Make the move on the board. Play the line's move and its reason
                    appears below; a different legal move gets a nudge.
                  </p>
                  {hint && (
                    <p className="interactive-hint" role="alert">
                      {hint}
                    </p>
                  )}
                  {playStat?.miss && (playStat.misses ?? 0) >= 2 && (
                    <p className="mistake-note">
                      You have played <strong>{playStat.miss}</strong> here{' '}
                      {playStat.misses} times. The line plays{' '}
                      {selected.steps[step].san}.
                    </p>
                  )}
                  <div className="hint-ladder">
                    <button
                      className="text-button"
                      onClick={() => setHintLevel((level) => Math.min(3, level + 1))}
                    >
                      <Lightbulb size={13} /> Hint
                    </button>
                    {playHint && <span>{playHint}</span>}
                    <button className="text-button" onClick={revealPlay}>
                      Show me the move <ArrowRight size={13} />
                    </button>
                  </div>
                  <button
                    className={autoReply ? 'drill-toggle on' : 'drill-toggle'}
                    aria-pressed={autoReply}
                    onClick={() => setAutoReply((current) => !current)}
                  >
                    <RotateCcw size={13} />{' '}
                    {autoReply ? 'Auto-reply on' : 'Auto-reply off'}
                  </button>
                </>
              ) : (
                <>
                  <span className="eyebrow">Their move</span>
                  <p>
                    {sideName(selected.side === 'w' ? 'b' : 'w')} answers the line
                    automatically — watch the board, then read why the move was played.
                  </p>
                  <button
                    className={autoReply ? 'drill-toggle on' : 'drill-toggle'}
                    aria-pressed={autoReply}
                    onClick={() => setAutoReply((current) => !current)}
                  >
                    <RotateCcw size={13} />{' '}
                    {autoReply ? 'Auto-reply on' : 'Auto-reply off'}
                  </button>
                  {!autoReply && (
                    <button className="text-button" onClick={() => go(step + 1)}>
                      Play their move <ArrowRight size={13} />
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {isQuiz && quizStep && !sideline && (
            <div className="drill-card">
              <span className="eyebrow">
                Recall · {sideName(turnOf(quizIndex!))} to move
                {review && ` · ${review.index + 1}/${review.items.length}`}
              </span>
              <p className="drill-question">
                {turnOf(quizIndex!) === selected.side
                  ? 'What do you play here?'
                  : `What does ${sideName(turnOf(quizIndex!))} play here?`}
              </p>
              <div className="quiz-score">
                {quiz.correct}/{quiz.asked} correct
              </div>
              <div className="drill-options">
                {choices.map((move) => (
                  <button
                    key={move}
                    onClick={() => submitAnswer(move)}
                    className={wrongMoves.includes(move) ? 'tried' : ''}
                  >
                    {move}
                  </button>
                ))}
              </div>
              <p className="drill-question" style={{ marginTop: 9 }}>
                Or play it on the board.
              </p>
              {wrong && (
                <div className="drill-feedback" role="alert">
                  <strong>{wrongNote(selected, quizIndex!, wrong)}</strong>
                  {quizStat?.miss && (quizStat.misses ?? 0) >= 2 && (
                    <p className="mistake-note">
                      You have played <strong>{quizStat.miss}</strong> here{' '}
                      {quizStat.misses} times.
                    </p>
                  )}
                  <div className="drill-actions">
                    <button
                      className="text-button"
                      onClick={() => setHintLevel((level) => Math.min(3, level + 1))}
                    >
                      <Lightbulb size={13} /> Hint
                    </button>
                    {drillHint && <span>{drillHint}</span>}
                    <button className="text-button" onClick={revealDrill}>
                      Show me the move <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <ol
            className={interactive || drill ? 'step-list playing' : 'step-list'}
            ref={stepList}
          >
            {selected.steps.map((entry, index) => {
              // Play and recall keep your move beside their answer, so the
              // explanation of the move you just made never scrolls away.
              if ((interactive || drill) && (index >= step || index < step - 2))
                return null
              // The finished card is a text recap: dropping its diagram and replies
              // keeps the pair short enough that the list never clips a card.
              const compact = (interactive || drill) && index === step - 2
              const after = diagrams[index]
              const upcoming = selected.steps[index + 1]
              return (
                <li
                  key={`${entry.san}-${index}`}
                  className={
                    index + 1 === step
                      ? 'step-card current'
                      : index + 1 < step
                        ? 'step-card done'
                        : 'step-card'
                  }
                >
                  <button className="step-head" onClick={() => go(index + 1)}>
                    <span className="step-number">
                      {index % 2 === 0 ? `${index / 2 + 1}.` : ''}
                    </span>
                    <span className="step-san">{entry.san}</span>
                    <span className={`step-side ${turnOf(index)}`}>
                      {turnOf(index) === selected.side ? 'You' : 'They'}
                    </span>
                  </button>
                  <div className="step-body">
                    {!compact && (
                      <MiniBoard
                        fen={after.fen}
                        pgn={after.pgn}
                        orientation={selected.side}
                        label={`Position after ${plyLabel(index)} ${entry.san}`}
                        focus={focusSquares(entry)}
                      />
                    )}
                    <div className="step-notes">
                      <p className="step-fact goal">
                        <span>Goal</span>
                        {entry.title}
                      </p>
                      <p className="step-fact">
                        <span>Why</span>
                        {entry.why}
                      </p>
                      {!interactive && !drill && (
                        <p className="step-fact next">
                          <span>Next</span>
                          {upcoming ? (
                            <>
                              <strong>{upcoming.san}</strong> {upcoming.title}
                            </>
                          ) : (
                            selected.nextPlan
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {!compact && entry.replies?.length ? (
                    <div className="step-replies">
                      <span className="replies-label">
                        <Eye size={13} /> If they play
                      </span>
                      {entry.replies.map((reply) => (
                        <button
                          className="reply-row as-button"
                          key={`${index}-${reply.san}`}
                          onClick={() => startSideline(index, reply)}
                        >
                          <strong>{reply.san}</strong>
                          <span>{reply.note}</span>
                          <em>You: {reply.answer}</em>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </li>
              )
            })}
            {(interactive || drill) && step < selected.steps.length && (
              <li className="step-locked">
                <Lock size={13} /> {selected.steps.length - step}{' '}
                {selected.steps.length - step === 1 ? 'move' : 'moves'} ahead —
                {drill ? ' answer' : ' play on the board'} to reveal
              </li>
            )}
          </ol>

          {!drill && (
            <div className="next-card">
              <span className="eyebrow">What you play next</span>
              <p>{selected.nextPlan}</p>
            </div>
          )}

          {(!drill || step >= length) && (
            <div className="remember-card">
              <span className="eyebrow">Remember this</span>
              <p>{selected.remember}</p>
              {selected.watch && (
                <p className="watch-line">
                  <strong>Careful:</strong> {selected.watch}
                </p>
              )}
            </div>
          )}

          {step >= length && next && (
            <div className="next-lesson">
              <span className="eyebrow">Next up</span>
              <strong>{next.name}</strong>
              <p>{next.summary}</p>
              <button className="text-button" onClick={() => open(next)}>
                Study this next <ArrowRight size={13} />
              </button>
            </div>
          )}

          {step >= length && !next && (
            <div className="next-lesson">
              <span className="eyebrow">Next up</span>
              <p>You have reached the end of the collection. Replay a favourite.</p>
              <button className="text-button" onClick={() => setSelectedId(null)}>
                All openings <ArrowRight size={13} />
              </button>
            </div>
          )}
        </aside>
      </div>

      <div className="learn-status">
        <strong>{selected.name}</strong>
        <span>
          {step}/{length}
        </span>
        <span className="learn-status-turn">{turn}</span>
      </div>
    </div>
  )
}
