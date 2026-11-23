import type { OpeningSource } from './types'

// 1.e4 e5. The classical school: occupy the centre, develop with threats, castle.
export const OPEN_GAMES: OpeningSource[] = [
  {
    id: 'italian',
    name: 'Italian Game',
    eco: 'C50',
    side: 'w',
    family: 'Open games',
    summary:
      'The friendliest way to start a chess life: build a centre, aim a bishop at f7 and castle.',
    goal: 'Play d4 only when it is supported, then use the e-file and the a2-g8 diagonal.',
    nextPlan: 'Next: Nbd2, Re1 and Bc2, then choose between d4 and a slow kingside build-up.',
    remember: 'Knights first, bishop to c4, c3 before d4, castle early.',
    watch:
      'Skip 4.Ng5 until you know the tactics. The quiet 4.d3 keeps every advantage of the position.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines for the bishop and queen, so your pieces come out with purpose.',
        replies: [
          { san: 'c5', note: 'The Sicilian, avoiding a symmetrical centre.', answer: 'Nf3' },
          { san: 'e6', note: 'The French: solid, but the light bishop is shut in.', answer: 'd4' },
          { san: 'c6', note: 'The Caro-Kann, another solid challenge.', answer: 'd4' },
        ],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black stakes the same central claim and frees the f8 bishop, so expect a fight for the middle.',
      },
      {
        san: 'Nf3',
        title: 'Attack e5 and clear f1',
        why: 'The knight hits e5 and frees f1 for the bishop, so castling comes one move sooner.',
        replies: [
          { san: 'Nc6', note: 'The most common defence of e5.', answer: 'Bc4' },
          { san: 'Nf6', note: 'The Petrov, attacking e4 instead of defending.', answer: 'Nxe5' },
        ],
      },
      {
        san: 'Nc6',
        title: 'Black defends e5',
        why: 'The knight guards e5 and develops at the same time, so both sides are doing two jobs with one move.',
      },
      {
        san: 'Bc4',
        title: 'Aim at f7',
        why: 'The bishop points at f7, the square only the king defends, and it empties f1 for castling.',
        replies: [
          { san: 'Bc5', note: 'The Giuoco Piano: a calm, symmetrical fight.', answer: 'c3' },
          { san: 'Nf6', note: 'The Two Knights. 4.Ng5 is sharp, 4.d3 is safer.', answer: 'd3' },
        ],
      },
      {
        san: 'Bc5',
        title: 'Black copies your plan',
        why: 'Black develops on the same diagonal and prepares to castle, so the symmetry gives you the first chance to break it.',
      },
      {
        san: 'c3',
        title: 'Prepare the big centre',
        why: 'You support a later d4 push and give the bishop a retreat to c2 if it is attacked by ...Na5 or ...h6 ideas.',
        replies: [
          { san: 'Nf6', note: 'Black develops and hits e4.', answer: 'd3' },
        ],
      },
      {
        san: 'Nf6',
        title: 'Pressure on e4',
        why: 'The knight attacks e4, so you must decide how to hold the centre before the position opens.',
      },
      {
        san: 'd3',
        title: 'Keep it solid',
        why: 'You protect e4 without blocking the bishop, and plan Nbd2, Re1 and a slow build-up.',
        replies: [
          { san: 'd6', note: 'Black frees the c8 bishop.', answer: 'O-O' },
        ],
      },
      {
        san: 'd6',
        title: 'Black frees the bishop',
        why: 'The bishop on c8 gets an exit and Black prepares to castle, so the middlegame is about to begin.',
      },
      {
        san: 'O-O',
        title: 'Castle first',
        why: 'Your king is safe and the rook is ready to join the game on e1.',
      },
    ],
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez',
    eco: 'C84',
    side: 'w',
    family: 'Open games',
    summary:
      'The Spanish torture: pressure the knight that guards e5, castle, then build the c3 and d4 centre.',
    goal: 'Pile up on e5 with Re1, hold the centre with c3, then open it with d4 at the right moment.',
    nextPlan: 'Next: Nbd2, Bc2 and h3, pressing e5 and the kingside on the e-file.',
    remember: 'Bb5, castle, Re1, c3, then d4: the Spanish build-up.',
    watch:
      'Do not grab the e5 pawn early. ...Nxe4 and ...Nd4 tricks punish a careless Bxc6.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn opens lines for both bishops and the queen.',
        replies: [
          { san: 'e5', note: 'The Open Game, the subject of this lesson.', answer: 'Nf3' },
          { san: 'c5', note: 'The Sicilian, a different fight.', answer: 'Nf3' },
        ],
      },
      {
        san: 'e5',
        title: 'Black answers in the centre',
        why: 'Black mirrors you and frees the f8 bishop.',
      },
      {
        san: 'Nf3',
        title: 'Develop and attack',
        why: 'The knight hits e5 and prepares castling.',
        replies: [{ san: 'Nc6', note: 'The natural defence of e5.', answer: 'Bb5' }],
      },
      {
        san: 'Nc6',
        title: 'Defend e5',
        why: 'The knight guards the pawn and develops.',
      },
      {
        san: 'Bb5',
        title: 'Pressure the defender',
        why: 'The bishop leans on the knight that guards e5, so Black must think about the centre immediately.',
        replies: [
          { san: 'a6', note: 'The Morphy Defence, asking the bishop to declare itself.', answer: 'Ba4' },
          { san: 'Nf6', note: 'The Berlin Defence, solid and popular.', answer: 'O-O' },
        ],
      },
      {
        san: 'a6',
        title: 'The question',
        why: 'Black attacks the bishop and wants to know whether you will take on c6 or retreat.',
      },
      {
        san: 'Ba4',
        title: 'Keep the tension',
        why: 'The bishop stays aimed at c6 and keeps the threat alive for later.',
        replies: [{ san: 'Nf6', note: 'Black develops and attacks e4.', answer: 'O-O' }],
      },
      {
        san: 'Nf6',
        title: 'Develop and hit e4',
        why: 'Black adds pressure to the centre and prepares to castle.',
      },
      {
        san: 'O-O',
        title: 'Castle into the plan',
        why: 'Your king is safe and Re1 will add a second attacker to e5.',
        replies: [{ san: 'Be7', note: 'The Closed Ruy Lopez, the classical main line.', answer: 'Re1' }],
      },
      {
        san: 'Be7',
        title: 'Black unpins the bishop',
        why: 'Black develops and prepares to castle, so the position settles for a long fight.',
      },
      {
        san: 'Re1',
        title: 'Add pressure',
        why: 'The rook supports the centre and prepares the c3 and d4 plan.',
      },
      {
        san: 'b5',
        title: 'Kick the bishop',
        why: 'Black gains queenside space and sends the bishop to a quieter diagonal.',
      },
      {
        san: 'Bb3',
        title: 'Settle on b3',
        why: 'The bishop keeps the a2-g8 diagonal aimed at f7, so it is not really retreating.',
      },
      {
        san: 'd6',
        title: 'Black shores up e5',
        why: 'The pawn on d6 defends e5, and Black prepares ...Na5 to trade the bishop.',
      },
      {
        san: 'c3',
        title: 'The Spanish plan',
        why: 'You prepare d4 to build the big centre while keeping the bishop aimed at f7.',
        replies: [
          { san: 'O-O', note: 'Black castles, so the middlegame starts.', answer: 'd4' },
        ],
      },
      {
        san: 'O-O',
        title: 'Both kings are safe',
        why: 'Now d4 is the move that turns space into an attack.',
      },
      {
        san: 'd4',
        title: 'Open the centre at the right time',
        why: 'With c3 and Re1 in place, d4 finally opens the position while every piece is ready for it.',
      },
    ],
  },
  {
    id: 'scotch',
    name: 'Scotch Game',
    eco: 'C45',
    side: 'w',
    family: 'Open games',
    summary:
      'Open the centre on move three and develop fast. Less theory than the Ruy Lopez, more open lines.',
    goal: 'Trade the e-pawns early, put the knight on d4 and use the open files for quick development.',
    nextPlan: 'Next: castle, then Re1 and Qd2, with both bishops aimed at the kingside.',
    remember: 'Open the centre on move three and develop with tempo.',
    watch:
      'Black often plays ...Qf6 to hit d4 and b2. Answer with c3 and Qd2, not with greed.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'Same start as every open game: claim the middle and free your pieces.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'Nf3' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims equal space and frees the bishop.',
      },
      {
        san: 'Nf3',
        title: 'Develop and attack',
        why: 'The knight hits e5 and prepares castling.',
        replies: [{ san: 'Nc6', note: 'The natural defence.', answer: 'd4' }],
      },
      {
        san: 'Nc6',
        title: 'Defend e5',
        why: 'Black develops with a defensive job done.',
      },
      {
        san: 'd4',
        title: 'Strike at once',
        why: 'You open the centre while the knight is ready to recapture, avoiding the slow manoeuvring of the Italian.',
        replies: [
          { san: 'exd4', note: 'Almost always played, accepting the challenge.', answer: 'Nxd4' },
          { san: 'd6', note: 'The Philidor, a solid alternative.', answer: 'dxe5' },
        ],
      },
      {
        san: 'exd4',
        title: 'Black takes',
        why: 'The centre opens, so piece activity matters more than pawn counts.',
      },
      {
        san: 'Nxd4',
        title: 'Recapture and centralise',
        why: 'The knight lands on its ideal square, hitting c6 and f5.',
        replies: [{ san: 'Bc5', note: 'The classical reply, hitting the knight.', answer: 'Be3' }],
      },
      {
        san: 'Bc5',
        title: 'Black hits d4',
        why: 'The bishop attacks the strong knight, so you must decide how to defend it.',
      },
      {
        san: 'Be3',
        title: 'Defend and develop',
        why: 'You block the bishop and prepare castling, keeping the position open and active.',
        replies: [{ san: 'Qf6', note: 'Black hits d4 again and eyes b2.', answer: 'c3' }],
      },
      {
        san: 'Qf6',
        title: 'Black piles on',
        why: 'The queen attacks d4 and b2, so loose pieces would lose material.',
      },
      {
        san: 'c3',
        title: 'Hold the centre',
        why: 'You support d4 and stop the tactics, and Nc3 and Qd2 come next.',
      },
      {
        san: 'Nge7',
        title: 'Black finds a home for the knight',
        why: 'The knight heads to g6 or f5 while the other one stays on c6.',
      },
      {
        san: 'Bc4',
        title: 'Finish development',
        why: 'The bishop takes the strong diagonal and your king can castle next move.',
      },
    ],
  },
  {
    id: 'four-knights',
    name: 'Four Knights Game',
    eco: 'C47',
    side: 'w',
    family: 'Open games',
    summary:
      'All four knights come out before anything is committed. A safe, symmetrical opening for beginners.',
    goal: 'Castle, then use Bb5 and Bg5 to pressure the knights that hold the centre.',
    nextPlan: 'Next: Nd5 and Bxf6, trading into the better pawn structure on the e-file.',
    remember: 'Symmetry first, pressure with Bb5 and Bg5, and let a half-open file do the work.',
    watch:
      'After ...Bxc3 recapture with the b-pawn only when the b-file helps you. Here it does.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims space and opens lines.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'Nf3' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims the same central squares.',
      },
      {
        san: 'Nf3',
        title: 'First knight',
        why: 'The knight attacks e5 and prepares castling.',
        replies: [{ san: 'Nc6', note: 'Defending e5.', answer: 'Nc3' }],
      },
      {
        san: 'Nc6',
        title: 'Black defends',
        why: 'The knight guards e5 and develops.',
      },
      {
        san: 'Nc3',
        title: 'Second knight',
        why: 'You reinforce the centre and prepare Bb5, keeping every option open.',
        replies: [{ san: 'Nf6', note: 'Black completes the four knights.', answer: 'Bb5' }],
      },
      {
        san: 'Nf6',
        title: 'The four knights',
        why: 'All four knights are out and both sides are ready to castle.',
      },
      {
        san: 'Bb5',
        title: 'Pin by pressure',
        why: 'The bishop leans on the knight that guards e5, borrowing the Ruy Lopez idea in a simpler setting.',
        replies: [{ san: 'Bb4', note: 'Black pins back, the main line.', answer: 'O-O' }],
      },
      {
        san: 'Bb4',
        title: 'Black copies the pin',
        why: 'Both bishops now pressure the knights that defend the centre.',
      },
      {
        san: 'O-O',
        title: 'Castle out of the pin',
        why: 'Your king leaves the bishop\u2019s line and the rook is ready for the e-file.',
      },
      {
        san: 'O-O',
        title: 'Black castles too',
        why: 'Both kings are safe, so the next moves are about the centre.',
      },
      {
        san: 'd3',
        title: 'Solid centre',
        why: 'You hold e4 and free d2, so the c1 bishop can swing out.',
      },
      {
        san: 'd6',
        title: 'Black holds e5',
        why: 'The pawn defends e5 and frees the c8 bishop.',
      },
      {
        san: 'Bg5',
        title: 'Trade the key defender',
        why: 'The bishop eyes the f6 knight, the main defender of e4 and d5, and ...Bxc3 only helps your b-file.',
      },
      {
        san: 'Bxc3',
        title: 'Black takes the knight',
        why: 'Black removes the defender of e4, hoping to win the pawn.',
      },
      {
        san: 'bxc3',
        title: 'Open the b-file',
        why: 'Recapturing toward the centre gives you the b-file and a big pawn centre; the doubled pawn is rarely a problem here.',
      },
      {
        san: 'Qe7',
        title: 'Black regroups',
        why: 'The queen prepares ...Nd8 or ...Qe6 ideas while Black tries to hold the centre.',
      },
      {
        san: 'Re1',
        title: 'Complete the setup',
        why: 'The rook supports e4 and the last piece joins; Nd5 and Bxf6 are the plans from here.',
      },
    ],
  },
  {
    id: 'vienna',
    name: 'Vienna Game',
    eco: 'C25',
    side: 'w',
    family: 'Open games',
    summary:
      'A flexible first move that can turn into a gambit. Develop the queen\u2019s knight, then push f4.',
    goal: 'Play f4 to hit e5, then use d4 to turn the resulting space into a central attack.',
    nextPlan: 'Next: Re1 and Bg5, attacking the castled king while e4 stays defended.',
    remember: 'Nc3, f4, then d4: the Vienna Gambit pattern.',
    watch:
      'Only play the gambit if you enjoy sharp positions. 3.Bc4 is the quiet Vienna.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn opens lines and claims the middle.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'Nc3' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims equal space in the centre.',
      },
      {
        san: 'Nc3',
        title: 'Flexible development',
        why: 'The knight supports e4 and prepares f4 without committing the pawn yet.',
        replies: [{ san: 'Nf6', note: 'The main line, developing and hitting e4.', answer: 'f4' }],
      },
      {
        san: 'Nf6',
        title: 'Hit e4 before the centre opens',
        why: 'The knight attacks e4 so your ...d5 break has a target, and it clears g8 for castling.',
      },
      {
        san: 'f4',
        title: 'The Vienna Gambit',
        why: 'You strike at e5 while your knight supports d4. The cost is a slightly looser king.',
        replies: [{ san: 'd5', note: 'The principled reply, countering in the centre.', answer: 'fxe5' }],
      },
      {
        san: 'd5',
        title: 'Black counters',
        why: 'The pawn on d5 attacks e4, so your centre is under pressure.',
      },
      {
        san: 'fxe5',
        title: 'Take and cramp',
        why: 'Your pawn on e5 cramps Black and attacks the knight on f6.',
      },
      {
        san: 'Nxe4',
        title: 'Black grabs the pawn',
        why: 'The knight takes the central pawn and challenges you to prove the attack.',
      },
      {
        san: 'Nf3',
        title: 'Hit the intruder',
        why: 'You develop and attack the knight on e4, gaining time to build the centre.',
        replies: [{ san: 'Be7', note: 'Black defends and prepares to castle.', answer: 'd4' }],
      },
      {
        san: 'Be7',
        title: 'Black makes a retreat',
        why: 'The bishop develops and gives the knight an escape square.',
      },
      {
        san: 'd4',
        title: 'Big centre',
        why: 'With d4 you control the middle and open lines for both bishops.',
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'Black\u2019s king is safe, so you must use your space before it is neutralised.',
      },
      {
        san: 'Bd3',
        title: 'Cover e4, aim at h7',
        why: 'The bishop defends e4 and points at h7, with Re1 and Bg5 next against the castled king.',
      },
    ],
  },
  {
    id: 'kings-gambit',
    name: "King's Gambit",
    eco: 'C30',
    side: 'w',
    family: 'Open games',
    summary:
      'A romantic pawn offer for a huge centre and the f-file. Fun, sharp and instructive about activity.',
    goal: 'Give the f-pawn for d4 and the f-file, developing with every move.',
    nextPlan: 'Next: Bxf4 and Bg5, keeping the initiative; the f-file and the bishops are your compensation.',
    remember: 'Pawn for the centre and the f-file: f4, Nf3, Bc4, O-O.',
    watch:
      'The modern 3...d5 is the most annoying defence. Meet it calmly with 4.exd5.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'f4' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims the same central space.',
      },
      {
        san: 'f4',
        title: 'Offer a pawn',
        why: 'You deflect the e5 pawn so you can build a big centre with d4 and use the f-file.',
        replies: [
          { san: 'exf4', note: 'The accepted gambit, by far the most common.', answer: 'Nf3' },
          { san: 'd5', note: 'The Falkbeer, declining with a central strike.', answer: 'exd5' },
        ],
      },
      {
        san: 'exf4',
        title: 'Black accepts',
        why: 'Black takes the pawn, so you get the centre and the open f-file in return.',
      },
      {
        san: 'Nf3',
        title: 'Develop and stop ...Qh4+',
        why: 'The knight attacks f4 and prevents the annoying queen check, so you are developing while Black defends.',
        replies: [{ san: 'g5', note: 'Black holds the extra pawn, the classical line.', answer: 'Bc4' }],
      },
      {
        san: 'g5',
        title: 'Black defends the pawn',
        why: 'The pawn on g5 protects f4 but weakens Black\u2019s kingside.',
      },
      {
        san: 'Bc4',
        title: 'Aim at f7',
        why: 'The bishop points at the weakest square and prepares to castle quickly.',
        replies: [{ san: 'g4', note: 'Black kicks the knight, hunting more pawns.', answer: 'O-O' }],
      },
      {
        san: 'g4',
        title: 'Black attacks the knight',
        why: 'The pawn on g4 attacks the f3 knight, so you must decide whether to move it or sacrifice it.',
      },
      {
        san: 'O-O',
        title: 'Castle into the attack',
        why: 'You give up the knight for fast development and the open f-file; your rook is instantly active.',
      },
      {
        san: 'gxf3',
        title: 'Black takes',
        why: 'The knight is gone, but your queen and rook now have the f-file.',
      },
      {
        san: 'Qxf3',
        title: 'Recapture with the queen',
        why: 'The queen takes the knight\u2019s place on the f-file and eyes f7.',
      },
      {
        san: 'Qf6',
        title: 'Black defends',
        why: 'The queen covers f7 and challenges you to find more attackers.',
      },
      {
        san: 'Nc3',
        title: 'Add the last attacker',
        why: 'The knight develops and supports e4 and Bg5, keeping the initiative for the sacrificed pawn.',
      },
    ],
  },
  {
    id: 'bishops-opening',
    name: "Bishop's Opening",
    eco: 'C23',
    side: 'w',
    family: 'Open games',
    summary:
      'Develop the bishop before the knight. Quiet, flexible and a good way to avoid heavy theory.',
    goal: 'Hold e4 with d3, develop Nf3 and Nc3, castle, then choose the right pawn break.',
    nextPlan: 'Next: Be3 or Bg5, Qd2 and Rad1, building slowly against f7.',
    remember: 'Bc4 first, d3 to support e4, then Nf3 and castle.',
    watch:
      'Do not let ...d5 hit the bishop with no retreat. Bb3 keeps it alive.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'Bc4' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims the same central space.',
      },
      {
        san: 'Bc4',
        title: 'Free the bishop early',
        why: 'The bishop takes the a2-g8 diagonal before the knight commits, aiming at f7.',
        replies: [{ san: 'Nf6', note: 'The most flexible reply, hitting e4.', answer: 'd3' }],
      },
      {
        san: 'Nf6',
        title: 'Black attacks e4',
        why: 'The knight forces you to decide how to defend the central pawn.',
      },
      {
        san: 'd3',
        title: 'Hold e4 quietly',
        why: 'You keep the centre intact and prepare Nf3, Nc3 and castling.',
        replies: [{ san: 'c6', note: 'Black prepares ...d5 to challenge the bishop.', answer: 'Nf3' }],
      },
      {
        san: 'c6',
        title: 'Black prepares ...d5',
        why: 'The pawn supports a central strike against your bishop.',
      },
      {
        san: 'Nf3',
        title: 'Cover d4 for the break',
        why: 'The knight prepares d4 and takes e4 away from Black, keeping the centre flexible while Black commits.',
        replies: [{ san: 'd5', note: 'Black strikes in the centre.', answer: 'Bb3' }],
      },
      {
        san: 'd5',
        title: 'Black challenges the bishop',
        why: 'The pawn on d5 attacks e4 and asks the bishop what it wants to do.',
      },
      {
        san: 'Bb3',
        title: 'Step back, stay aimed',
        why: 'The bishop keeps the a2-g8 diagonal and avoids being traded, and e4 is still defended.',
        replies: [{ san: 'Bd6', note: 'Black develops and eyes h2.', answer: 'O-O' }],
      },
      {
        san: 'Bd6',
        title: 'Aim at h2',
        why: 'The bishop lines up with h2 and prepares ...Qe7 or ...Nbd7, so White must castle soon.',
      },
      {
        san: 'O-O',
        title: 'Castle and connect',
        why: 'Your king is safe and the rook is ready; Nbd2, Re1 and c3 follow.',
      },
      {
        san: 'O-O',
        title: 'Safe on both sides',
        why: 'Now the middlegame is about the e5 and d4 squares.',
      },
      {
        san: 'Nc3',
        title: 'Finish development',
        why: 'The knight supports d5 and e4 and prepares Be3 and Qe2, the last pieces before the middlegame.',
      },
    ],
  },
  {
    id: 'petroff',
    name: 'Petroff Defence',
    eco: 'C42',
    side: 'b',
    family: 'Open games',
    summary:
      'A symmetrical defence where Black counters on e4 instead of defending e5. Solid at every level.',
    goal: 'Hit e4, regain the pawn with ...Nxe4 and reach an equal, comfortable game.',
    nextPlan: 'Next: ...Re8 and ...Bg4, then ...Na5 or ...Nc5 to trade into a comfortable ending.',
    remember: 'In the Petrov you hit e4 rather than defend e5: ...d6 then ...Nxe4.',
    watch:
      'After 3.Nxe5, 3...Nxe4 is playable but risky. The safe route is 3...d6.',
    steps: [
      {
        san: 'e4',
        title: 'White starts',
        why: 'White claims the centre and opens lines.',
        replies: [],
      },
      {
        san: 'e5',
        title: 'Symmetry with a counter',
        why: 'You mirror White, but your plan is active: answer Nxe5 with ...d6 and take on e4.',
      },
      {
        san: 'Nf3',
        title: 'White attacks e5',
        why: 'The knight hits your pawn, so you must decide how to meet the threat.',
      },
      {
        san: 'Nf6',
        title: 'The Petrov',
        why: 'Instead of defending e5, you attack e4, so White must decide whether to take your pawn.',
        replies: [{ san: 'Nxe5', note: 'The main line, winning a pawn for now.', answer: 'd6' }],
      },
      {
        san: 'Nxe5',
        title: 'White takes',
        why: 'The knight grabs the pawn, so the initiative is temporarily with White.',
      },
      {
        san: 'd6',
        title: 'Kick the knight',
        why: 'You drive the knight back with tempo and prepare ...Nxe4 to restore the material.',
      },
      {
        san: 'Nf3',
        title: 'The knight retreats',
        why: 'White returns to a safe square and defends e4 again.',
      },
      {
        san: 'Nxe4',
        title: 'Equalise',
        why: 'You regain the pawn and reach a sound, symmetrical position with no weaknesses.',
        replies: [{ san: 'd4', note: 'White builds a centre.', answer: 'd5' }],
      },
      {
        san: 'd4',
        title: 'White takes space',
        why: 'The pawn duo on d4 and e4 gives White more room.',
      },
      {
        san: 'd5',
        title: 'Block the centre',
        why: 'You take the space fight to d5 so your bishop can develop and your king can castle.',
      },
      {
        san: 'Bd3',
        title: 'Eye h7 and hold e4',
        why: 'The bishop defends e4 and points at h7, the prelude to Nc3 and castling.',
      },
      {
        san: 'Be7',
        title: 'Cover the king\'s path',
        why: 'The bishop covers g5 and f6 so ...O-O cannot be disturbed by Bg5 or Ng5.',
        replies: [{ san: 'O-O', note: 'White castles.', answer: 'Nc6' }],
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'Now both kings are safe and the middlegame is about the d5 and e4 squares.',
      },
      {
        san: 'Nc6',
        title: 'Finish development',
        why: 'The knight develops to its best square and supports ...Bg4 or ...Nb4 ideas.',
      },
    ],
  },
  {
    id: 'philidor',
    name: 'Philidor Defence',
    eco: 'C41',
    side: 'b',
    family: 'Open games',
    summary:
      'A compact, classical defence: defend e5 with the d-pawn and develop behind a solid wall.',
    goal: 'Hold e5 with ...d6, hit e4 with ...Nf6 and castle before opening the position.',
    nextPlan: 'Next: ...Re8, ...c6 and ...Nf8, slowly preparing ...d5 or ...exd4.',
    remember: 'Philidor: ...d6 defends e5, ...Nf6 hits e4, then ...Be7 and castle.',
    watch:
      'Without ...Nbd7 and ...Be7 first, ...exd4 can leave you behind in development.',
    steps: [
      {
        san: 'e4',
        title: 'White starts',
        why: 'White claims the centre and opens lines.',
        replies: [],
      },
      {
        san: 'e5',
        title: 'Solid e5',
        why: 'You support e5 with the d-pawn to come, accepting a slightly cramped but very solid position.',
      },
      {
        san: 'Nf3',
        title: 'White attacks e5',
        why: 'The knight hits your pawn, so you must defend it or counter.',
      },
      {
        san: 'd6',
        title: 'The Philidor',
        why: 'The pawn on d6 defends e5 and frees the c8 bishop. The cost is less space.',
        replies: [{ san: 'd4', note: 'White grabs the centre.', answer: 'Nf6' }],
      },
      {
        san: 'd4',
        title: 'White takes space',
        why: 'The central pawns give White more room and open lines.',
      },
      {
        san: 'Nf6',
        title: 'Attack e4',
        why: 'The knight hits e4 and supports ...exd4, so White must keep the centre together.',
      },
      {
        san: 'Nc3',
        title: 'White defends e4',
        why: 'The knight adds a defender to the centre.',
      },
      {
        san: 'Nbd7',
        title: 'The Philidor knight',
        why: 'The queen\u2019s knight supports e5 and c5, and the way is clear to castle and play ...Be7.',
      },
      {
        san: 'Bc4',
        title: 'Pressure f7 before castling',
        why: 'The bishop aims at f7 and clears f1, so White castles with a threat already in the air.',
      },
      {
        san: 'Be7',
        title: 'Get ready to castle',
        why: 'The bishop develops and the king steps to safety on the next move.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'Both sides are nearly developed, so the centre will open soon.',
      },
      {
        san: 'O-O',
        title: 'Safe and sound',
        why: 'Your position has no weaknesses and you are ready for ...c6, ...Re8 or ...exd4.',
      },
    ],
  },
  {
    id: 'fried-liver',
    name: 'Fried Liver Attack',
    eco: 'C57',
    side: 'w',
    family: 'Open games',
    summary:
      'The famous knight sacrifice on f7. A trap you must know both as a weapon and as a warning.',
    goal: 'Meet the greedy ...Nxd5 with Nxf7, pull the king out and keep every piece active.',
    nextPlan: 'Next: Bg5+ and O-O-O, keeping the initiative rather than counting material.',
    remember: 'Ng5 attacks f7 twice, and ...Nxd5 is the blunder that allows Nxf7.',
    watch:
      'It is a trap, not a forced win. Against 5...Na5 the attack fizzles, so do not play it blindly.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'e5', note: 'The Open Game.', answer: 'Nf3' }],
      },
      {
        san: 'e5',
        title: 'Black mirrors you',
        why: 'Black claims the same central space.',
      },
      {
        san: 'Nf3',
        title: 'Develop and attack',
        why: 'The knight hits e5 and prepares castling.',
        replies: [{ san: 'Nc6', note: 'The natural defence.', answer: 'Bc4' }],
      },
      {
        san: 'Nc6',
        title: 'Black defends',
        why: 'The knight guards e5 and develops.',
      },
      {
        san: 'Bc4',
        title: 'Aim at f7',
        why: 'The bishop adds a second attacker to f7, the square only the king defends.',
        replies: [{ san: 'Nf6', note: 'Black develops and hits e4.', answer: 'Ng5' }],
      },
      {
        san: 'Nf6',
        title: 'Black attacks e4',
        why: 'The knight joins the fight for the centre, but it ignores the danger on f7.',
      },
      {
        san: 'Ng5',
        title: 'The double attack',
        why: 'The knight hits f7 a second time, so Nxf7 is a real threat Black must respect.',
        replies: [
          { san: 'd5', note: 'Best: Black counters in the centre, the only good defence.', answer: 'exd5' },
          { san: 'Qe7', note: 'Defending f7, but the queen blocks the bishop.', answer: 'Nc3' },
        ],
      },
      {
        san: 'd5',
        title: 'The only good defence',
        why: 'Black hits e4 and opens the c8 bishop, meeting the threat with counterplay.',
      },
      {
        san: 'exd5',
        title: 'Open the diagonal',
        why: 'Taking keeps the pressure and invites ...Nxd5, the trap square you must know.',
        replies: [
          { san: 'Nxd5', note: 'The greedy recapture, the famous blunder.', answer: 'Nxf7' },
          { san: 'Na5', note: 'The correct defence, giving a pawn for safety.', answer: 'Bb3' },
        ],
      },
      {
        san: 'Nxd5',
        title: 'Black takes the bait',
        why: 'The knight recaptures but leaves f7 defended by the king alone.',
      },
      {
        san: 'Nxf7',
        title: 'The Fried Liver',
        why: 'The knight forks queen and rook. It can be taken, but the follow-up gives you a dangerous initiative.',
      },
      {
        san: 'Kxf7',
        title: 'Black takes the knight',
        why: 'The king must capture, losing the right to castle.',
      },
      {
        san: 'Qf3+',
        title: 'Hit the king',
        why: 'The queen checks and the black king must step up the board into the open.',
      },
      {
        san: 'Ke6',
        title: 'The king walks',
        why: 'Black\u2019s king is exposed in the centre, which is exactly what the sacrifice is for.',
      },
      {
        san: 'Nc3',
        title: 'Bring the last piece',
        why: 'You develop and hit the d5 knight, keeping the attack going with every piece.',
      },
      {
        san: 'Nb4',
        title: 'Black counter-attacks',
        why: 'The knight heads for d4 or c2, so accuracy still matters.',
      },
      {
        san: 'a3',
        title: 'Kick the knight',
        why: 'The pawn hits the b4 knight and keeps the initiative, so Black\'s counterplay loses a tempo.',
      },
    ],
  },
]
