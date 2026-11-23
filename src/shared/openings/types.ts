export type Side = 'w' | 'b'

/** A common move the opponent may choose, and how we answer it. */
export type OpeningReply = {
  san: string
  note: string
  answer: string
}

export type OpeningStep = {
  san: string
  title: string
  why: string
  replies?: OpeningReply[]
}

export type OpeningSource = {
  id: string
  name: string
  eco: string
  side: Side
  family: string
  summary: string
  goal: string
  steps: OpeningStep[]
  nextPlan: string
  remember: string
  watch?: string
}

export type Opening = OpeningSource & { moves: string[] }
