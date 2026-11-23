import type { OpeningSource } from './types'

// Flank openings and one counter-gambit: space without the central pawns, or a pawn for activity.
export const FLANK: OpeningSource[] = [
  {
    id: 'english',
    name: 'English Opening',
    eco: 'A28',
    side: 'w',
    family: 'Flank openings',
    summary:
      'Take the centre from the side with c4. Flexible, strategical and a fine surprise weapon.',
    goal: 'Fianchetto, pressure d5, then use the queenside space and the c-file.',
    nextPlan: 'Next: Bg5 or Ne5, using the space the d4 break won.',
    remember: 'English: c4, Nc3, g3, Bg2, Nf3 and castle. Pressure on the queenside.',
    watch:
      'If you never contest the centre, Black gets a free game. Watch for ...d5 and ...e5 breaks.',
    steps: [
      {
        san: 'c4',
        title: 'The English',
        why: 'The pawn controls d5 and takes queenside space without blocking your centre pawns.',
        replies: [{ san: 'e5', note: 'The most common reply, the reversed Sicilian.', answer: 'Nc3' }],
      },
      {
        san: 'e5',
        title: 'Black takes the centre',
        why: 'The pawn grabs the middle and frees the f8 bishop.',
      },
      {
        san: 'Nc3',
        title: 'Support d5, prepare g3',
        why: 'The knight defends d5 and clears the way for the fianchetto.',
        replies: [{ san: 'Nf6', note: 'Black develops.', answer: 'g3' }],
      },
      {
        san: 'Nf6',
        title: 'Cover e4 and d5',
        why: 'The knight fights for the central squares before ...d5.',
      },
      {
        san: 'g3',
        title: 'Fianchetto',
        why: 'The bishop on g2 will support d5 and pressure the queenside.',
      },
      {
        san: 'd5',
        title: 'Black breaks',
        why: 'The pawn challenges c4, the natural central strike against the English.',
      },
      {
        san: 'cxd5',
        title: 'Trade',
        why: 'You open the c-file and keep a small space advantage.',
      },
      {
        san: 'Nxd5',
        title: 'Black recaptures',
        why: 'The knight takes a strong central square, so you develop with pressure on it.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'The bishop takes the long diagonal and eyes the d5 knight.',
      },
      {
        san: 'Nb6',
        title: 'Black moves the knight',
        why: 'The knight steps away from the bishop and prepares ...Nc6 and ...Be7.',
      },
      {
        san: 'Nf3',
        title: 'Support e5, castle',
        why: 'The knight covers e5 and prepares O-O on the short side.',
      },
      {
        san: 'Nc6',
        title: 'Defend e5 before ...Be7',
        why: 'The knight supports e5 and prepares ...Be7 and ...O-O.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook is ready for the c-file.',
      },
      {
        san: 'Be7',
        title: 'Black completes',
        why: 'Both sides are developed, so the middlegame is about the d5 and e5 squares.',
      },
      {
        san: 'd4',
        title: 'Claim the centre',
        why: 'With the bishop on g2 and the king castled, d4 gives you the space the English was aiming for.',
      },
    ],
  },
  {
    id: 'reti',
    name: 'Réti Opening',
    eco: 'A09',
    side: 'w',
    family: 'Flank openings',
    summary:
      'Control the centre from a distance with Nf3, g3 and Bg2, and choose your pawn breaks later.',
    goal: 'Build the g2 bishop, castle, then strike with c4 or e4 when the moment is right.',
    nextPlan: 'Next: exd5 or e5, deciding the centre after the e4 break.',
    remember: 'Réti: Nf3, g3, Bg2, O-O, d3, then c4 or e4.',
    watch:
      'Without a pawn break you stand still. c4 and e4 are the moves that give the setup teeth.',
    steps: [
      {
        san: 'Nf3',
        title: 'The Réti',
        why: 'The knight controls e5 and d4, and you keep every pawn break available.',
        replies: [{ san: 'd5', note: 'Black takes the centre.', answer: 'g3' }],
      },
      {
        san: 'd5',
        title: 'Black takes the centre',
        why: 'The pawn claims space, inviting you to attack it later.',
      },
      {
        san: 'g3',
        title: 'Prepare the bishop',
        why: 'The bishop on g2 will pressure d5 and the queenside.',
      },
      {
        san: 'Nf6',
        title: 'Cover e4, slow the break',
        why: 'The knight controls e4, so your c4 or e4 breaks need preparation.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'The long diagonal is aimed at d5, your main target.',
      },
      {
        san: 'e6',
        title: 'Black solidifies',
        why: 'The pawn supports d5 and frees the bishop.',
      },
      {
        san: 'O-O',
        title: 'Castle early',
        why: 'Your king is safe before you commit pawns.',
      },
      {
        san: 'Be7',
        title: 'Cover the king\'s wing',
        why: 'The bishop defends the kingside so ...O-O is safe.',
      },
      {
        san: 'd3',
        title: 'The modest pawn',
        why: 'You hold e4 and prepare a slow build-up with Nbd2 and c4.',
        replies: [{ san: 'O-O', note: 'Black castles.', answer: 'Nbd2' }],
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'Both kings are safe, so the centre is next.',
      },
      {
        san: 'Nbd2',
        title: 'Complete the setup',
        why: 'The knight supports e4 and prepares the break that frees your game.',
        replies: [{ san: 'c5', note: 'Black takes queenside space.', answer: 'e4' }],
      },
      {
        san: 'c5',
        title: 'Black takes space',
        why: 'The pawn grabs the queenside, so your central break is urgent.',
      },
      {
        san: 'e4',
        title: 'The central break',
        why: 'The pawn takes the centre and frees the game now that Black\'s ...c5 has loosened d5.',
      },
    ],
  },
  {
    id: 'kia',
    name: "King's Indian Attack",
    eco: 'A07',
    side: 'w',
    family: 'Flank openings',
    summary:
      'Play the King\u2019s Indian with the white pieces: Nf3, g3, Bg2, d3, Nbd2 and a kingside build-up.',
    goal: 'Set up the KIA wall, castle, then play e5 and attack on the kingside.',
    nextPlan: 'Next: e4 and e5, the break the whole setup was built for.',
    remember: 'KIA: Nf3, g3, Bg2, O-O, d3, Nbd2, then e5.',
    watch:
      'The e5 push is the point of the setup. Without it the position stays harmless.',
    steps: [
      {
        san: 'Nf3',
        title: 'Control from a distance',
        why: 'The knight controls e5 and keeps your pawn breaks flexible.',
        replies: [{ san: 'd5', note: 'Black takes the centre.', answer: 'g3' }],
      },
      {
        san: 'd5',
        title: 'Black takes the centre',
        why: 'The pawn claims space and gives you a target.',
      },
      {
        san: 'g3',
        title: 'Prepare the bishop',
        why: 'The bishop on g2 will defend e4 and support the kingside.',
      },
      {
        san: 'Nf6',
        title: 'Stop e4 for now',
        why: 'The knight controls e4, which is why you build with d3 and Nbd2 first.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'The bishop takes the long diagonal and prepares castling.',
      },
      {
        san: 'g6',
        title: 'Black fianchettoes',
        why: 'Black copies the plan on the other side of the board.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe before the centre opens.',
      },
      {
        san: 'Bg7',
        title: 'Black\u2019s bishop',
        why: 'Both bishops now point at the centre.',
      },
      {
        san: 'd3',
        title: 'The KIA wall',
        why: 'You hold e4 and prepare Nbd2 and e5.',
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'Both kings are safe, so the central breaks decide the game.',
      },
      {
        san: 'Nbd2',
        title: 'Complete the setup',
        why: 'The knight supports e4 and prepares the e5 push.',
      },
      {
        san: 'Nc6',
        title: 'Pressure d4 and e5',
        why: 'The knight attacks d4 and eyes e5, so your e5 push needs Nbd2 and Re1 behind it.',
      },
      {
        san: 'Re1',
        title: 'Prepare the break',
        why: 'The rook supports e4 and the e5 push, the plan the whole setup is built for.',
      },
    ],
  },
  {
    id: 'birds',
    name: "Bird's Opening",
    eco: 'A02',
    side: 'w',
    family: 'Flank openings',
    summary:
      'Start with f4 and build a reversed Dutch. A rare, solid choice with a clear kingside plan.',
    goal: 'Support f4 with e3 and Bb2 or Be2, castle, then take the centre with e4 or d4.',
    nextPlan: 'Next: exd5 or e5, choosing the central structure after the e4 break.',
    remember: "Bird's: f4, Nf3, e3, Be2, O-O, then d4 or e4.",
    watch:
      'The f4 move weakens e1-h4. Castle quickly and do not leave the king in the middle.',
    steps: [      {
        san: 'f4',
        title: "Bird's Opening",
        why: 'The pawn takes kingside space and prepares a direct attack, with a reversed Dutch structure.',
        replies: [{ san: 'd5', note: 'Black takes the centre.', answer: 'Nf3' }],
      },
      {
        san: 'd5',
        title: 'Black takes the centre',
        why: 'The pawn claims space and frees the bishop.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5, free c1',
        why: 'The knight controls e5 and keeps the c1 bishop flexible for d4 or e4 plans.',
        replies: [{ san: 'g6', note: 'Black prepares a fianchetto.', answer: 'e3' }],
      },
      {
        san: 'g6',
        title: 'Black fianchettoes',
        why: 'The bishop will pressure your centre from the long diagonal.',
      },
      {
        san: 'e3',
        title: 'Support the centre',
        why: 'The pawn opens the f1 bishop and prepares d4.',
      },
      {
        san: 'Bg7',
        title: 'Black\u2019s bishop',
        why: 'The long diagonal is aimed at your queenside.',
      },
      {
        san: 'Be2',
        title: 'Castle short, hold f4',
        why: 'The bishop prepares O-O and supports the e3 and d4 build-up.',
      },
      {
        san: 'Nf6',
        title: 'Hit e4 before castling',
        why: 'The knight attacks e4 and clears g8 for castling.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe, which matters most in the Dutch structures.',
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'Both kings are safe, so the centre is next.',
      },
      {
        san: 'd3',
        title: 'Prepare e4',
        why: 'The pawn supports a later e4 push, the move that frees your position.',
      },
      {
        san: 'c5',
        title: 'Black takes space',
        why: 'The pawn grabs queenside room, so your central play must come soon.',
      },
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The pawn breaks through and opens the game, using the space f4 already won.',
      },
    ],
  },
  {
    id: 'nimzo-larsen',
    name: 'Nimzo-Larsen Attack',
    eco: 'A01',
    side: 'w',
    family: 'Flank openings',
    summary:
      'Start with b3 and Bb2. The bishop controls the long diagonal while you keep every structure available.',
    goal: 'Build the b2 bishop, develop the knights and castle, then strike with e4 or c4.',
    nextPlan: 'Next: after the trade, d4 and Ne2, pressuring the weakened c6 pawn.',
    remember: 'Nimzo-Larsen: b3, Bb2, e3, Bb5 or Be2, Ne2, castle.',
    watch:
      'The b2 bishop can be blocked by your own pieces. Keep the long diagonal open.',
    steps: [
      {
        san: 'b3',
        title: 'The Nimzo-Larsen',
        why: 'You prepare Bb2 to control the long diagonal from the first move.',
        replies: [{ san: 'e5', note: 'Black takes the centre.', answer: 'Bb2' }],
      },
      {
        san: 'e5',
        title: 'Black takes the centre',
        why: 'The pawn claims the middle and frees both bishops.',
      },
      {
        san: 'Bb2',
        title: 'The bishop arrives',
        why: 'The bishop eyes e5 and g7 from a safe square.',
      },
      {
        san: 'Nc6',
        title: 'Support e5, prepare ...Nf6',
        why: 'The knight defends e5 and clears the way for the kingside knight.',
      },
      {
        san: 'e3',
        title: 'Open the other bishop',
        why: 'The pawn prepares Bb5 or Be2 and keeps the centre flexible.',
      },
      {
        san: 'Nf6',
        title: 'Attack e4, castle next',
        why: 'The knight hits e4 and clears g8, so ...Be7 and ...O-O follow.',
      },
      {
        san: 'Bb5',
        title: 'Pressure the defender',
        why: 'The bishop leans on the knight that guards e5, a Ruy Lopez idea in a different setting.',
      },
      {
        san: 'Bd6',
        title: 'Aim at h2',
        why: 'The bishop eyes h2, so your O-O and Ne5 ideas become urgent.',
      },
      {
        san: 'Ne2',
        title: 'Keep b2 aimed, prep f4',
        why: 'The knight develops without blocking the long diagonal and prepares O-O and f4.',
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'The king is safe before the centre opens.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook supports the centre.',
      },
      {
        san: 'a6',
        title: 'Black asks the bishop',
        why: 'The pawn forces the bishop to decide, so your plan must account for the retreat.',
      },
      {
        san: 'Bxc6',
        title: 'Trade before retreating',
        why: 'You take the knight so ...bxc6 leaves Black with doubled pawns and a target on c6.',
      },
    ],
  },
  {
    id: 'albin',
    name: 'Albin Counter-Gambit',
    eco: 'D08',
    side: 'b',
    family: 'Flank openings',
    summary:
      'Meet the queen\u2019s gambit with a counter-gambit: a pawn for a wedge on d4 and active pieces.',
    goal: 'Play ...e5 and ...d4, then use the d4 wedge and piece pressure on the centre.',
    nextPlan: 'Next: ...Nge7 and ...O-O, then ...Bg4 and ...f6 or ...Qf5, keeping the wedge defended.',
    remember: 'Albin: ...e5, ...d4, then ...Nc6, ...Be6 and ...Qd7. Counterattack at once.',
    watch:
      'White\u2019s extra pawn matters if the attack fizzles. Keep the initiative or you are simply worse.',
    steps: [      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
        replies: [{ san: 'd5', note: 'Black mirrors.', answer: 'c4' }],
      },
      {
        san: 'd5',
        title: 'Black mirrors',
        why: 'You claim equal central space.',
      },
      {
        san: 'c4',
        title: "The Queen's Gambit",
        why: 'White offers a wing pawn for the centre.',
      },
      {
        san: 'e5',
        title: 'The Albin',
        why: 'You counter-gamble at once, offering a pawn for a strong central wedge and open lines.',
        replies: [{ san: 'dxe5', note: 'The main line, taking the pawn.', answer: 'd4' }],
      },
      {
        san: 'dxe5',
        title: 'White takes',
        why: 'White grabs the pawn, so your compensation must be immediate.',
      },
      {
        san: 'd4',
        title: 'The wedge',
        why: 'The pawn on d4 cramps White and takes the c3 and e3 squares away from the pieces.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5, prepare Nbd2',
        why: 'The knight supports e5 and prepares Nbd2, so your d4 wedge must be defended by pieces.',
      },
      {
        san: 'Nc6',
        title: 'Pressure the wedge',
        why: 'The knight supports ...Nge7 and ...Bg4, and hits e5.',
      },
      {
        san: 'g3',
        title: 'White fianchettoes',
        why: 'The bishop on g2 will pressure your d4 pawn.',
      },
      {
        san: 'Be6',
        title: 'Defend and develop',
        why: 'The bishop supports d4 and covers the light squares.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'White\u2019s bishop now attacks d4, so you must keep it defended.',
      },
      {
        san: 'Qd7',
        title: 'Connect and pressure',
        why: 'The queen supports d4 and prepares ...O-O-O or ...Bh3 ideas.',
      },
    ],
  },
]
