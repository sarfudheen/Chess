import type { OpeningSource } from './types'

// 1.d4 d5 and the queen's pawn structures: slow burns, structure, and long plans.
export const CLOSED_GAMES: OpeningSource[] = [
  {
    id: 'qgd',
    name: "Queen's Gambit Declined",
    eco: 'D37',
    side: 'b',
    family: 'Closed games',
    summary:
      'The most reliable defence to the queen\u2019s gambit: hold the centre with ...e6 and develop behind the wall.',
    goal: 'Keep d5, develop ...Be7, ...O-O and ...Nbd7, then free your game with ...dxc4 or ...c5.',
    nextPlan: 'Next: ...Bb7 and ...Nbd7, then ...c5 or ...dxc4 to free the position.',
    remember: 'QGD: ...e6 supports d5, ...Be7 unpins, castle, then find ...c5 or ...b6.',
    watch:
      'The c8 bishop can stay shut in for a long time. Plan ...b6 and ...Bb7 before it becomes a problem.',
    steps: [
      {
        san: 'd4',
        title: 'White opens with the queen pawn',
        why: 'The pawn claims the centre and opens the c1 bishop.',
      },
      {
        san: 'd5',
        title: 'Mirror the centre',
        why: 'You claim equal central space and prepare a solid structure.',
        replies: [{ san: 'c4', note: 'The Queen\u2019s Gambit, offering a wing pawn.', answer: 'e6' }],
      },
      {
        san: 'c4',
        title: 'White offers the c-pawn',
        why: 'White attacks d5 and wants to trade a wing pawn for your centre pawn, or gain space.',
      },
      {
        san: 'e6',
        title: 'Hold the centre',
        why: 'You support d5 with a pawn and open a path for the f8 bishop. This is the Declined.',
      },
      {
        san: 'Nc3',
        title: 'White adds pressure',
        why: 'The knight attacks d5 a second time, so more defence is needed.',
      },
      {
        san: 'Nf6',
        title: 'Defend and develop',
        why: 'The knight covers d5 and takes its best square.',
      },
      {
        san: 'Bg5',
        title: 'White pins',
        why: 'The pin pressures the f6 knight, the main defender of d5.',
      },
      {
        san: 'Be7',
        title: 'Unpin quietly',
        why: 'The bishop develops and prepares castling. Taking on c4 now would only lose time.',
      },
      {
        san: 'e3',
        title: 'White frees the bishop',
        why: 'Now the f1 bishop can develop and White can castle.',
      },
      {
        san: 'O-O',
        title: 'Castle early',
        why: 'Your king is safe before the centre opens.',
      },
      {
        san: 'Nf3',
        title: 'White completes development',
        why: 'The knight supports e5 and prepares Bd3.',
      },
      {
        san: 'h6',
        title: 'Ask the bishop',
        why: 'The pawn makes the bishop declare itself before you finish development.',
      },
      {
        san: 'Bh4',
        title: 'White keeps the pin',
        why: 'The bishop stays on the diagonal and keeps some pressure.',
      },
      {
        san: 'b6',
        title: 'Solve the bishop',
        why: 'You prepare ...Bb7 so the c8 bishop has a future, the key move in the QGD.',
      },
    ],
  },
  {
    id: 'qgd-exchange',
    name: "Queen's Gambit: Exchange",
    eco: 'D35',
    side: 'w',
    family: 'Closed games',
    summary:
      'Trade on d5, build a small but lasting plus and play the resulting structure better than your opponent.',
    goal: 'Trade the c-pawn for the d-pawn, develop actively and use the e5 and c5 squares.',
    nextPlan: 'Next: O-O, then Re1 and Ne5, pressing d5.',
    remember: 'Exchange QGD: cxd5, Bg5, e3, Bd3 and Nge2 or Nf3. Small edge, clear plans.',
    watch:
      'Black\u2019s ...c6 and ...Nbd7 make the position very solid. Do not over-press as White without a plan.',
    steps: [
      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and frees the bishop.',
        replies: [{ san: 'd5', note: 'Black mirrors you.', answer: 'c4' }],
      },
      {
        san: 'd5',
        title: 'Black mirrors',
        why: 'Black claims equal central space.',
      },
      {
        san: 'c4',
        title: "The Queen's Gambit",
        why: 'You offer a wing pawn to pull Black\u2019s d-pawn away from the centre.',
        replies: [{ san: 'e6', note: 'The Declined, the main reply.', answer: 'Nc3' }],
      },
      {
        san: 'e6',
        title: 'Black declines',
        why: 'Black supports d5 with the pawn instead of taking.',
      },
      {
        san: 'Nc3',
        title: 'Add pressure',
        why: 'The knight attacks d5 and prepares to develop.',
      },
      {
        san: 'Nf6',
        title: 'Black defends',
        why: 'The knight guards d5 and develops.',
      },
      {
        san: 'cxd5',
        title: 'The Exchange',
        why: 'You trade on d5 to fix the pawn structure. The e5 square and the c-file become your long-term assets.',
        replies: [{ san: 'exd5', note: 'Recapturing with the pawn, the main line.', answer: 'Bg5' }],
      },
      {
        san: 'exd5',
        title: 'Black recaptures',
        why: 'Black now has an isolated d5 pawn and equal space, so your plan is the e5 square and piece play.',
      },
      {
        san: 'Bg5',
        title: 'Pin the defender',
        why: 'The bishop pressures the knight that guards d5, keeping Black busy.',
      },
      {
        san: 'Be7',
        title: 'Black unpins',
        why: 'The bishop develops and prepares castling.',
      },
      {
        san: 'e3',
        title: 'Develop the bishop',
        why: 'You open the f1 diagonal and prepare Bd3 and Nf3.',
        replies: [{ san: 'c6', note: 'Black shores up d5.', answer: 'Bd3' }],
      },
      {
        san: 'c6',
        title: 'Black holds d5',
        why: 'The pawn adds another defender, making the position very solid.',
      },
      {
        san: 'Bd3',
        title: 'Aim at h7',
        why: 'The bishop takes the strong diagonal, ready for Nf3, O-O and a slow build-up.',
      },
      {
        san: 'Nbd7',
        title: 'Black completes the wall',
        why: 'The knight supports d5 and prepares ...Re8 and ...Nf8.',
      },
      {
        san: 'Nf3',
        title: 'Complete the setup',
        why: 'The knight supports e5 and prepares O-O, after which Re1 and Ne5 press the d5 pawn.',
      },
    ],
  },
  {
    id: 'qga',
    name: "Queen's Gambit Accepted",
    eco: 'D20',
    side: 'b',
    family: 'Closed games',
    summary:
      'Take the c-pawn, give up the centre briefly and develop fast against White\u2019s big pawn mass.',
    goal: 'Accept the pawn, play ...e6, ...c5 and ...a6, and hit d4 with the pieces.',
    nextPlan: 'Next: ...b5 and ...Bb7, then ...Nbd7 and ...Rc8 on the open file.',
    remember: 'QGA: take on c4, then ...e6, ...c5, ...a6 and finish development.',
    watch:
      'An early ...b5 lets White play a4 and Qf3, hitting your queenside. Prepare it properly.',
    steps: [      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'd5',
        title: 'Mirror the centre',
        why: 'You claim equal space and await White\u2019s plan.',
        replies: [{ san: 'c4', note: "The Queen's Gambit.", answer: 'dxc4' }],
      },
      {
        san: 'c4',
        title: 'White offers the pawn',
        why: 'The gambit tries to pull your d-pawn away from the centre.',
      },
      {
        san: 'dxc4',
        title: 'Accept',
        why: 'You take the pawn and accept a slightly smaller centre in return for quick, free development.',
      },
      {
        san: 'Nf3',
        title: 'White avoids an early e4',
        why: 'The knight develops and prepares e3 to regain the pawn.',
        replies: [{ san: 'Nf6', note: 'Black develops and controls e4.', answer: 'e3' }],
      },
      {
        san: 'Nf6',
        title: 'Stop e4 for now',
        why: 'The knight controls e4, so White must spend a move on e3 before recapturing on c4.',
      },
      {
        san: 'e3',
        title: 'White prepares to recapture',
        why: 'The bishop will take back on c4 and White will build a big centre, so your ...c5 break must come early.',
      },
      {
        san: 'e6',
        title: 'Solidify',
        why: 'You support the d5 square and open the f8 bishop.',
      },
      {
        san: 'Bxc4',
        title: 'White regains the pawn',
        why: 'The bishop takes back, and the position becomes a fight between White\u2019s centre and your activity.',
      },
      {
        san: 'c5',
        title: 'Hit d4',
        why: 'The pawn attacks the centre immediately, the standard QGA plan.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'The king is safe and the rook is ready.',
      },
      {
        san: 'a6',
        title: 'Control b5',
        why: 'The pawn prevents Bb5 and prepares ...b5, gaining space where it counts.',
      },
    ],
  },
  {
    id: 'qga-white',
    name: "Queen's Gambit Accepted (as White)",
    eco: 'D25',
    side: 'w',
    family: 'Closed games',
    summary:
      'How to play against the Accepted: regain the pawn, build the centre and use the open c-file.',
    goal: 'Recover the pawn with Bxc4, castle, then hit d5 with dxc5 and occupy the centre.',
    nextPlan: 'Next: Rd1 and Bb3, then Bg5, using the open d-file.',
    remember: 'Against the QGA: e3, Bxc4, O-O, then dxc5 and Qe2 or Re1.',
    watch:
      'Black equalises easily with ...c5 and ...a6. Play for the small edge, not a forced win.',
    steps: [      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and frees the bishop.',
        replies: [{ san: 'd5', note: 'Black mirrors you.', answer: 'c4' }],
      },
      {
        san: 'd5',
        title: 'Black mirrors',
        why: 'Black claims equal central space.',
      },
      {
        san: 'c4',
        title: "The Queen's Gambit",
        why: 'You offer a wing pawn for the centre.',
        replies: [{ san: 'dxc4', note: 'The Accepted, taking the pawn.', answer: 'Nf3' }],
      },
      {
        san: 'dxc4',
        title: 'Black accepts',
        why: 'Black takes the pawn and will try to hold it while developing.',
      },
      {
        san: 'Nf3',
        title: 'Develop before recapturing',
        why: 'The knight stops ...e5 and prepares e3, the standard route back to c4.',
      },
      {
        san: 'Nf6',
        title: 'Stop e4, eye d5',
        why: 'The knight controls e4 and supports ...d5, so you recapture on c4 with e3 first.',
      },
      {
        san: 'e3',
        title: 'Prepare Bxc4',
        why: 'The pawn opens the bishop’s path and supports d4.',
      },
      {
        san: 'e6',
        title: 'Black solidifies',
        why: 'The pawn supports d5 and frees the bishop.',
      },
      {
        san: 'Bxc4',
        title: 'Regain the pawn',
        why: 'The bishop takes back and now eyes f7, with O-O next.',
      },
      {
        san: 'c5',
        title: 'Black hits d4',
        why: 'The pawn challenges your centre, the main QGA plan.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook is ready for the e-file.',
      },
      {
        san: 'a6',
        title: 'Black controls b5',
        why: 'The pawn stops Bb5 and prepares ...b5.',
      },
      {
        san: 'dxc5',
        title: 'Open the position',
        why: 'You trade on c5 to open the d-file and keep a small but lasting edge.',
      },
      {
        san: 'Bxc5',
        title: 'Black recaptures',
        why: 'The bishop takes back and the position becomes a normal middlegame with equal material.',
      },
      {
        san: 'Qe2',
        title: 'Connect and use the d-file',
        why: 'The queen links the rooks and prepares Rd1 and Bb3, using the open d-file.',
      },
    ],
  },
  {
    id: 'slav',
    name: 'Slav Defence',
    eco: 'D10',
    side: 'b',
    family: 'Closed games',
    summary:
      'Hold d5 with ...c6 instead of ...e6, keeping the c8 bishop free. Solid and popular at every level.',
    goal: 'Support d5 with the c-pawn, take on c4 and develop the bishop to f5 before ...e6.',
    nextPlan: 'Next: ...O-O and ...Nbd7, then ...Bxc3 and ...c5 to open lines.',
    remember: 'Slav: ...c6 holds d5, ...dxc4 gains a tempo, ...Bf5 develops the bishop.',
    watch:
      'After ...dxc4, White may push e4 and build a big centre. Finish development before grabbing more.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'd5',
        title: 'Mirror the centre',
        why: 'You claim equal space and prepare the Slav structure.',
        replies: [{ san: 'c4', note: "The Queen's Gambit.", answer: 'c6' }],
      },
      {
        san: 'c4',
        title: 'White offers the pawn',
        why: 'The gambit attacks d5 and wants a central majority.',
      },
      {
        san: 'c6',
        title: 'The Slav',
        why: 'You hold d5 with the c-pawn and keep the c8 bishop\u2019s diagonal open, unlike the QGD.',
      },
      {
        san: 'Nf3',
        title: 'Control e5, prepare e3',
        why: 'The knight takes e5 away from Black and prepares e3 to regain the c4 pawn.',
      },
      {
        san: 'Nf6',
        title: 'Hold d5, stop e4',
        why: 'The knight defends d5 and controls e4, so White must support e4 with a pawn.',
      },
      {
        san: 'Nc3',
        title: 'White adds pressure',
        why: 'The knight attacks d5 a second time.',
      },
      {
        san: 'dxc4',
        title: 'Take at the right moment',
        why: 'You win the pawn while gaining time, because the bishop will chase the knight away.',
      },
      {
        san: 'a4',
        title: 'White stops ...b5',
        why: 'The pawn prevents you from defending the extra c4 pawn with ...b5.',
      },
      {
        san: 'Bf5',
        title: 'Develop the bishop',
        why: 'The bishop comes out to its best square before ...e6, the whole point of the Slav.',
      },
      {
        san: 'e3',
        title: 'White prepares Bxc4',
        why: 'The pawn opens the bishop\u2019s path to regain the pawn.',
      },
      {
        san: 'e6',
        title: 'Solidify',
        why: 'The pawn supports d5 and frees the f8 bishop.',
      },
      {
        san: 'Bxc4',
        title: 'White regains the pawn',
        why: 'Material is equal and the middlegame begins.',
      },
      {
        san: 'Bb4',
        title: 'Develop with a pin',
        why: 'The bishop pins the knight and pressures the centre, a typical Slav idea.',
      },
    ],
  },
  {
    id: 'semi-slav',
    name: 'Semi-Slav Defence',
    eco: 'D43',
    side: 'b',
    family: 'Closed games',
    summary:
      'Combine ...c6 and ...e6 for a rock-solid centre, then win space with ...dxc4 and ...b5.',
    goal: 'Hold d5 with both pawns, develop the pieces and expand on the queenside.',
    nextPlan: 'Next: ...Bb7 and ...Be7, then ...O-O and ...c5 or ...Nbd7.',
    remember: 'Semi-Slav: ...c6 and ...e6 together, then ...dxc4, ...b5, ...Bb7.',
    watch:
      'White\u2019s e4 push after ...dxc4 can open the centre dangerously. Castle before you expand.',
    steps: [      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'd5',
        title: 'Mirror the centre',
        why: 'You claim equal central space.',
        replies: [{ san: 'c4', note: "The Queen's Gambit.", answer: 'c6' }],
      },
      {
        san: 'c4',
        title: 'Offer the c-pawn',
        why: 'The pawn attacks d5 and tries to pull your centre pawn away from the middle.',
      },
      {
        san: 'c6',
        title: 'The Slav wall',
        why: 'You hold d5 with the c-pawn, keeping the bishop\u2019s diagonal open.',
      },
      {
        san: 'Nf3',
        title: 'Prepare e3 and Nc3',
        why: 'The knight supports e5 and lets you build with e3, Bd3 and castling.',
      },
      {
        san: 'Nf6',
        title: 'Hold d5 against Nc3',
        why: 'The knight defends d5 and controls e4, so your solid centre stays intact.',
      },
      {
        san: 'Nc3',
        title: 'White adds pressure',
        why: 'The knight attacks d5 again.',
      },
      {
        san: 'e6',
        title: 'The Semi-Slav',
        why: 'Now you have both ...c6 and ...e6, the most solid centre in chess. The c8 bishop needs a plan.',
      },
      {
        san: 'Bg5',
        title: 'White pins',
        why: 'The bishop pressures the defender of d5.',
      },
      {
        san: 'h6',
        title: 'Ask the question',
        why: 'You force the bishop to decide before committing your king.',
      },
      {
        san: 'Bh4',
        title: 'White keeps the pin',
        why: 'The bishop stays on the diagonal.',
      },
      {
        san: 'dxc4',
        title: 'Take the pawn',
        why: 'You grab the pawn while the bishop is away from the queenside.',
      },
      {
        san: 'e4',
        title: 'White strikes back',
        why: 'The pawn builds a big centre and opens lines, so your king must be safe.',
      },
      {
        san: 'g5',
        title: 'Kick the bishop',
        why: 'You hit the bishop and prepare ...b5 to hold the extra pawn.',
      },
      {
        san: 'Bg3',
        title: 'The bishop retreats',
        why: 'The bishop stays on the h2-b8 diagonal, and now you must defend b5.',
      },
      {
        san: 'b5',
        title: 'Keep the pawn',
        why: 'The pawn chain ...a6, ...b5 holds the extra pawn and gives you queenside space.',
      },
    ],
  },
  {
    id: 'london',
    name: 'London System',
    eco: 'D02',
    side: 'w',
    family: 'Closed games',
    summary:
      'A system you can play against almost anything: Bf4, e3, c3, Nbd2 and a kingside build-up.',
    goal: 'Set up the London pyramid, castle, then push e4 or play on the kingside with Ne5.',
    nextPlan: 'Next: Bd3 and O-O, then e4 or Ne5, the break that gives the London its bite.',
    remember: 'London: Bf4, e3, c3, Nbd2, Bd3, castle. Simple moves, clear plans.',
    watch:
      'Do not fall asleep. Without e4 or a kingside plan the position can drift into equality.',
    steps: [
      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and frees the c1 bishop.',
        replies: [{ san: 'd5', note: 'Black mirrors you.', answer: 'Nf3' }],
      },
      {
        san: 'd5',
        title: 'Black mirrors',
        why: 'Black claims equal central space.',
      },
      {
        san: 'Nf3',
        title: 'Free c1 for Bf4',
        why: 'The knight controls e5 and keeps the c1 bishop\'s path clear for the London setup.',
        replies: [{ san: 'Nf6', note: 'Black develops.', answer: 'Bf4' }],
      },
      {
        san: 'Nf6',
        title: 'Pressure e4',
        why: 'The knight attacks e4, so your Bf4 must be timed with e3 and c3 in mind.',
      },
      {
        san: 'Bf4',
        title: 'The London bishop',
        why: 'The bishop comes out before e3, its trademark. It controls e5 and h7.',
        replies: [{ san: 'e6', note: 'Black frees the bishop.', answer: 'e3' }],
      },
      {
        san: 'e6',
        title: 'Open the f8 diagonal',
        why: 'The pawn frees the bishop and prepares ...c5 against d4.',
      },
      {
        san: 'e3',
        title: 'The pyramid',
        why: 'You support d4 and open the f1 bishop\u2019s diagonal.',
      },
      {
        san: 'c5',
        title: 'Black challenges d4',
        why: 'The pawn hits the base of your centre, the main idea against the London.',
      },
      {
        san: 'c3',
        title: 'Hold the centre',
        why: 'You support d4 and keep the structure solid.',
        replies: [{ san: 'Nc6', note: 'Black develops and pressures d4.', answer: 'Nbd2' }],
      },
      {
        san: 'Nc6',
        title: 'Black piles on',
        why: 'The knight attacks d4 and prepares ...Bd6 to trade your bishop.',
      },
      {
        san: 'Nbd2',
        title: 'Develop the knight',
        why: 'The knight supports e4 and prepares Bd3, the standard London setup.',
        replies: [{ san: 'Bd6', note: 'Black offers to trade the London bishop.', answer: 'Bg3' }],
      },
      {
        san: 'Bd6',
        title: 'Black offers a trade',
        why: 'Black wants to remove the bishop that controls e5.',
      },
      {
        san: 'Bg3',
        title: 'Keep the bishop',
        why: 'The bishop stays on the h2-b8 diagonal and keeps its eye on e5.',
      },
    ],
  },
  {
    id: 'colle',
    name: 'Colle System',
    eco: 'D05',
    side: 'w',
    family: 'Closed games',
    summary:
      'Another easy system: e3, Bd3, b3, Bb2 and Nbd2, waiting for the right moment to play e4.',
    goal: 'Build the Colle setup, castle, then free the game with e4 and a kingside attack.',
    nextPlan: 'Next: e4, the break the whole setup was waiting for.',
    remember: 'Colle: e3, Bd3, b3, Bb2, Nbd2, castle, then e4.',
    watch:
      'The e4 break is the whole point. Without it, the bishop on d3 and the rook on e1 do nothing.',
    steps: [      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and frees the c1 bishop.',
        replies: [{ san: 'd5', note: 'Black mirrors you.', answer: 'Nf3' }],
      },
      {
        san: 'd5',
        title: 'Black mirrors',
        why: 'Black claims equal central space.',
      },
      {
        san: 'Nf3',
        title: 'Keep c1 free for Bb2',
        why: 'The knight controls e5 while the c1 bishop stays free for the b2 diagonal.',
        replies: [{ san: 'Nf6', note: 'Black develops.', answer: 'e3' }],
      },
      {
        san: 'Nf6',
        title: 'Hit e4',
        why: 'The knight attacks e4, so your e3 and Bd3 setup must be quick.',
      },
      {
        san: 'e3',
        title: 'The Colle pawn',
        why: 'You open the f1 bishop\u2019s path and keep the centre solid.',
        replies: [{ san: 'e6', note: 'Black frees the bishop.', answer: 'Bd3' }],
      },
      {
        san: 'e6',
        title: 'Free the bishop',
        why: 'The pawn opens f8 and prepares ...c5 and ...Bd6.',
      },
      {
        san: 'Bd3',
        title: 'Aim at h7',
        why: 'The bishop takes the strong diagonal, ready for a future e4 and mate ideas.',
        replies: [{ san: 'c5', note: 'Black challenges d4.', answer: 'b3' }],
      },
      {
        san: 'c5',
        title: 'Black hits d4',
        why: 'The pawn attacks the base of your centre.',
      },
      {
        san: 'b3',
        title: 'The Colle bishop',
        why: 'You prepare Bb2 so the bishop controls the long diagonal and supports e4.',
        replies: [{ san: 'Nc6', note: 'Black develops and pressures d4.', answer: 'Bb2' }],
      },
      {
        san: 'Nc6',
        title: 'Press d4 before ...Bd6',
        why: 'The knight adds an attacker of d4 and clears the way for ...Bd6.',
      },
      {
        san: 'Bb2',
        title: 'The bishop arrives',
        why: 'The bishop supports e4 and covers the centre from a distance.',
        replies: [{ san: 'Bd6', note: 'Black develops and eyes h2.', answer: 'Nbd2' }],
      },
      {
        san: 'Bd6',
        title: 'Target h2',
        why: 'The bishop lines up with h2, so castling and your Ne5 plan become urgent.',
      },
      {
        san: 'Nbd2',
        title: 'Complete the setup',
        why: 'The knight supports e4 and prepares Re1, the last piece before the break.',
        replies: [{ san: 'O-O', note: 'Black castles.', answer: 'O-O' }],
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'Both kings will be safe, so your e4 break decides the game.',
      },
      {
        san: 'O-O',
        title: 'Castle before the break',
        why: 'Your king is safe and the rook supports e4, the break that finally frees the bishop on d3.',
      },
    ],
  },
  {
    id: 'catalan',
    name: 'Catalan Opening',
    eco: 'E01',
    side: 'w',
    family: 'Closed games',
    summary:
      'A queen\u2019s gambit with a fianchetto: the g2 bishop pressures the queenside for the whole game.',
    goal: 'Build the g2 bishop, castle, then use the open c-file and pressure on b7 and a8.',
    nextPlan: 'Next: Nc3 and Rd1, then e4 and Bg5, using the open c-file.',
    remember: 'Catalan: g3, Bg2, Nf3, O-O, then Qc2 and the c-file.',
    watch:
      'Do not give up the bishop on g2 for nothing. It is the soul of the opening.',
    steps: [      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and frees the c1 bishop.',
        replies: [{ san: 'Nf6', note: 'Black develops flexibly.', answer: 'c4' }],
      },
      {
        san: 'Nf6',
        title: 'Cover e4, keep options',
        why: 'The knight stops e4 and leaves ...d5, ...e6 and ...g6 all available.',
      },
      {
        san: 'c4',
        title: 'Build the centre',
        why: 'The pawn takes space and prepares the Catalan setup.',
        replies: [{ san: 'e6', note: 'Black prepares ...d5.', answer: 'g3' }],
      },
      {
        san: 'e6',
        title: 'Black prepares ...d5',
        why: 'The pawn opens the f8 bishop and prepares the central challenge.',
      },
      {
        san: 'g3',
        title: 'The Catalan bishop',
        why: 'You prepare Bg2, where the bishop will pressure the long diagonal for the whole game.',
        replies: [{ san: 'd5', note: 'Black takes the centre.', answer: 'Bg2' }],
      },
      {
        san: 'd5',
        title: 'Black takes the centre',
        why: 'The pawn challenges c4 and claims equal space.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'The bishop eyes b7 and the long diagonal, and it supports your queenside play.',
        replies: [{ san: 'Be7', note: 'Black develops and prepares to castle.', answer: 'Nf3' }],
      },
      {
        san: 'Be7',
        title: 'Prepare O-O',
        why: 'The bishop covers the kingside so castling cannot be disturbed.',
      },
      {
        san: 'Nf3',
        title: 'Support d4, castle next',
        why: 'The knight defends d4 and frees f1 for the rook after O-O.',
      },
      {
        san: 'O-O',
        title: 'King safety first',
        why: 'The king reaches g8, so the coming ...dxc4 and ...b5 can be played without worry.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook supports the centre.',
      },
      {
        san: 'dxc4',
        title: 'Black takes',
        why: 'Black grabs the pawn, planning ...b5 to hold it.',
      },
      {
        san: 'Qc2',
        title: 'Regain the pawn',
        why: 'The queen prepares to take on c4 and connects the rooks.',
        replies: [{ san: 'a6', note: 'Black prepares ...b5 to keep the pawn.', answer: 'Qxc4' }],
      },
      {
        san: 'a6',
        title: 'Black prepares ...b5',
        why: 'The pawn supports the queenside expansion that will hold the c4 pawn.',
      },
      {
        san: 'Qxc4',
        title: 'Regain the pawn',
        why: 'The queen recovers the pawn and the c-file opens; Nc3 and Rd1 build the pressure.',
      },
    ],
  },
  {
    id: 'trompowsky',
    name: 'Trompowsky Attack',
    eco: 'A45',
    side: 'w',
    family: 'Closed games',
    summary:
      'Start with Bg5 on move two. A practical way to avoid Indian defences and fight for e4.',
    goal: 'Trade the bishop for the knight, build the e4-d4 centre and develop the knights.',
    nextPlan: 'Next: h4 and h5, opening lines against the king, or e5 to fix the centre.',
    remember: 'Trompowsky: Bg5, Bxf6, then e4 and Nc3. Trade the bishop early.',
    watch:
      'Giving up the bishop pair is a real concession. Use the time you gain to build the centre.',
    steps: [
      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre and keeps the game flexible.',
        replies: [{ san: 'Nf6', note: 'Black develops the knight.', answer: 'Bg5' }],
      },
      {
        san: 'Nf6',
        title: 'Stop e4, eye d5',
        why: 'The knight controls e4 and prepares ...d5 or ...g6, forcing you to commit the bishop.',
      },
      {
        san: 'Bg5',
        title: 'The Trompowsky',
        why: 'The bishop attacks the knight at once, forcing Black to make a structural decision.',
        replies: [
          { san: 'e6', note: 'Solid: Black prepares ...h6 and ...Be7.', answer: 'e4' },
          { san: 'Ne4', note: 'The greedy knight move, but it can be hit.', answer: 'Bf4' },
        ],
      },
      {
        san: 'e6',
        title: 'Black chooses a structure',
        why: 'The pawn prepares ...h6 and ...Be7, accepting the pin for now.',
      },
      {
        san: 'e4',
        title: 'Build the centre',
        why: 'You take space and prepare Nc3, with a big centre behind the bishop.',
      },
      {
        san: 'h6',
        title: 'Black asks the question',
        why: 'The pawn forces the bishop to commit before Black develops.',
      },
      {
        san: 'Bxf6',
        title: 'Trade',
        why: 'You take the knight and give Black doubled pawns if the queen recaptures.',
      },
      {
        san: 'Qxf6',
        title: 'Black recaptures with the queen',
        why: 'The queen takes and loses a tempo later, so your development matters.',
      },
      {
        san: 'Nc3',
        title: 'Hold e4, prepare long castle',
        why: 'The knight defends e4 and frees the queen for Qd2 and O-O-O.',
      },
      {
        san: 'd6',
        title: 'Black solidifies',
        why: 'The pawn controls e5 and gives the queen a path.',
      },
      {
        san: 'Qd2',
        title: 'Connect and prepare',
        why: 'The queen supports the centre and prepares O-O-O.',
      },
      {
        san: 'g6',
        title: 'Black fianchettoes',
        why: 'The bishop will go to g7 to pressure d4.',
      },
      {
        san: 'O-O-O',
        title: 'Castle long',
        why: 'The king reaches c1 and the rook joins the d-file, ready for h4-h5 or e5.',
      },
    ],
  },
]
