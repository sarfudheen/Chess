// Shared "why this move" reasoning library.
// Each entry is a reusable plain-language explanation that can be referenced by
// reason slugs in opening steps. Steps may still carry their own `why` text;
// this library exists so students encounter a consistent vocabulary across lines.
//
// Slug convention: short, lowercase, hyphenated, no spaces.
export const REASONS: Record<string, { short: string; full: string }> = {
  takeCentre: {
    short: 'Take the centre',
    full:
      'The king pawn claims the middle and opens lines for the bishop and queen, so your pieces come out with purpose.',
  },
  developWithAttack: {
    short: 'Develop and attack',
    full:
      'The knight hits the opponent’s pawn and frees a square for another piece, so castling comes one move sooner.',
  },
  aimAtWeakness: {
    short: 'Aim at a weak square',
    full:
      'You point a piece at the only square the enemy king defends, which is usually the fastest way to build pressure.',
  },
  prepareCentreBreak: {
    short: 'Prepare the centre break',
    full:
      'You support the pawn push that will open the position, so when it happens your pieces are ready to use the open lines.',
  },
  castleFirst: {
    short: 'Castle first',
    full:
      'Your king is safe and the rook is ready to join the game on the open file or the centre.',
  },
  pressureDefender: {
    short: 'Pressure the defender',
    full:
      'You lean on the piece that guards a key square, so the opponent must respond before they are ready.',
  },
  keepTension: {
    short: 'Keep the tension',
    full:
      'You leave the position unsettled so the opponent has to think, and your pieces stay aimed at the important squares.',
  },
  addPressure: {
    short: 'Add pressure',
    full:
      'A second piece joins the fight for the same square or file, which is how a local advantage turns into an attack.',
  },
  finishDevelopment: {
    short: 'Finish development',
    full:
      'The last piece comes out, so your king can castle and the middlegame begins from a healthy position.',
  },
  tradeKeyDefender: {
    short: 'Trade the key defender',
    full:
      'You remove the piece that is doing the most to stop your plan, and the trade leaves you a better structure or a more active piece.',
  },
  openFile: {
    short: 'Open the file',
    full:
      'A pawn trade leaves a file with no pawns, and your rook can use it to attack the enemy camp.',
  },
  counterInCentre: {
    short: 'Counter in the centre',
    full:
      'You answer a threat with a central pawn move, gaining space and opening a diagonal for your own bishop.',
  },
  equalise: {
    short: 'Equalise',
    full:
      'You regain material or reach a sound, symmetrical position with no weaknesses, which is enough to play for a result.',
  },
  buildBigCentre: {
    short: 'Build the big centre',
    full:
      'You stack pawns in the middle so the opponent has to react, and your pieces get easy targets and open lines.',
  },
  challengeCentre: {
    short: 'Challenge the centre',
    full:
      'You hit the opponent’s central pawn at once, which is the move the whole setup is built for.',
  },
  kingWalk: {
    short: 'The king walks',
    full:
      'The enemy king is exposed in the centre, which is exactly what a sacrifice or a direct attack is for.',
  },
  flankOpening: {
    short: 'Flank opening',
    full:
      'You start on the side rather than the centre, so you control the middle from a distance and let the opponent decide what to allow.',
  },
  fianchetto: {
    short: 'Fianchetto the bishop',
    full:
      'You put the pawn in front of the bishop so the long diagonal becomes your main source of pressure.',
  },
  pinByPressure: {
    short: 'Pin by pressure',
    full:
      'You lean on a defending piece without actually pinning it, which keeps the opponent busy and the position unsettled.',
  },
  answerThreat: {
    short: 'Answer the threat',
    full:
      'The opponent has created a problem, and this move solves it while keeping your own plan alive.',
  },
  developWithTempo: {
    short: 'Develop with tempo',
    full:
      'You bring a piece out while attacking or defending something important, so the opponent has to respond to you.',
  },
  holdCentre: {
    short: 'Hold the centre',
    full:
      'You protect the central pawn without blocking your pieces, and plan to bring the rest of the army out behind it.',
  },
  breakPawnChain: {
    short: 'Break the pawn chain',
    full:
      'You attack the base of the opponent’s pawns so their centre becomes a liability instead of a shield.',
  },
  developPiece: {
    short: 'Develop the piece',
    full:
      'A piece leaves the back rank and reaches a useful square, which is the main job of the opening.',
  },
  supportBreak: {
    short: 'Support the break',
    full:
      'You prepare the pawn or piece move that will change the structure, so it lands with tempo instead of in a void.',
  },
  safetyFirst: {
    short: 'Safety first',
    full:
      'You make the position solid before you take any risks, which is usually the right call when you do not yet know what the opponent wants.',
  },
  spaceGain: {
    short: 'Gain space',
    full:
      'You push a pawn to take room on the board, which lets your pieces leap further and the opponent’s replies become slower.',
  },
  regroup: {
    short: 'Regroup',
    full:
      'You move a piece to a better square for the middlegame, often behind the pawns or toward the side where the play will happen.',
  },
  prepareCastle: {
    short: 'Prepare to castle',
    full:
      'You clear the king’s path and develop a piece that does not block the rook, so castling is one move away.',
  },
  hitUndefended: {
    short: 'Hit the undefended square',
    full:
      'You attack a square that only the king defends, which is the loudest way to ask the opponent a question.',
  },
  defendPawn: {
    short: 'Defend the pawn',
    full:
      'You add a second defender to a central pawn so it can survive a challenge and become a strength rather than a weakness.',
  },
  offerPawn: {
    short: 'Offer a pawn',
    full:
      'You give up a pawn on purpose so you can get a lead in development, open lines, or seize the centre in return.',
  },
}
