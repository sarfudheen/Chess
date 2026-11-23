import type { OpeningSource } from './types'

// 1.d4 Nf6: Black controls the centre with pieces, then chooses a pawn break.
export const INDIAN: OpeningSource[] = [
  {
    id: 'kid',
    name: "King's Indian Defence",
    eco: 'E60',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Let White build a big centre, then blow it up with ...e5 and a kingside attack. The classic fighting defence.',
    goal: 'Fianchetto, castle, play ...e5, then attack with ...f5 and the kingside pawns.',
    nextPlan: 'Next: ...f5, then ...f4 with a direct kingside attack while ...Nc6 and ...Be6 hold the centre.',
    remember: "King's Indian: ...g6, ...Bg7, ...d6, ...O-O, ...e5, then ...f5.",
    watch:
      'If you never play ...e5 or ...f5, your bishop on g7 stares at a wall. Space matters less than the break.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 for now and keeps every Indian structure available.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'g6' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre and prepares Nc3.',
      },
      {
        san: 'g6',
        title: 'Prepare the bishop',
        why: 'The fianchetto bishop will be your main weapon against the centre.',
      },
      {
        san: 'Nc3',
        title: 'Build the big centre',
        why: 'The knight supports e4, the pawn move that gives you space and Black a target.',
      },
      {
        san: 'Bg7',
        title: 'The bishop arrives',
        why: 'The long diagonal is where your counterplay lives.',
      },
      {
        san: 'e4',
        title: 'The big centre',
        why: 'White commits to the space, which gives you a clear target.',
      },
      {
        san: 'd6',
        title: 'Prepare ...e5',
        why: 'The pawn supports the central break that challenges White\u2019s space.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5, free c1',
        why: 'The knight supports e5 and lets Be3 or Bg5 follow before castling.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe before the centre opens.',
      },
      {
        san: 'Be2',
        title: 'White prepares to castle',
        why: 'The bishop develops and the king follows.',
      },
      {
        san: 'e5',
        title: 'The break',
        why: 'You challenge the centre directly. This is the move the whole setup is built for.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'Now both kings are safe, so the middlegame is about the centre and the kingside.',
      },
      {
        san: 'Nc6',
        title: 'Add pressure',
        why: 'The knight hits d4 and supports ...exd4 and ...Ne7 plans.',
      },
      {
        san: 'd5',
        title: 'White closes the centre',
        why: 'White gains space and frees the c4 square, so your attack must come on the kingside.',
      },
      {
        san: 'Ne7',
        title: 'The classic manoeuvre',
        why: 'The knight heads to g6 or d7, and ...f5 is next, the standard King\u2019s Indian attack.',
      },
    ],
  },
  {
    id: 'london-as-black',
    name: 'London System: Black',
    eco: 'D02',
    side: 'b',
    family: 'Closed games',
    summary:
      'How to fight the London: challenge the bishop early and build the centre behind the d5 pawn.',
    goal: 'Hit Bf4 with ...Nh5 or ...Bd6, challenge e3 and play for ...c5 and ...dxc4.',
    nextPlan: 'Next: ...c5, ...Bb4 or ...Bd6, taking away the bishop before it gets to d6.',
    remember: 'Against London: ...Nh5 or ...Bd6 to trade the bishop, then ...c5 and ...O-O.',
    watch:
      'If you miss the ...Bd6 or ...Nh5 trade, White gets a strong bishop and a big centre.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre and frees the c1 bishop.',
      },
      {
        san: 'Nf6',
        title: 'Pressure e4, keep options',
        why: 'The knight controls e4 and leaves ...d5, ...e6 and ...g6 available.',
      },
      {
        san: 'Bf4',
        title: 'The London',
        why: 'The bishop takes the diagonal before ...e6, the whole trademark of the opening.',
      },
      {
        san: 'e6',
        title: 'Open the bishop',
        why: 'The pawn frees the f8 bishop and supports d5.',
      },
      {
        san: 'e3',
        title: 'White builds',
        why: 'The bishop develops and the pawn supports d4.',
      },
      {
        san: 'Bd6',
        title: 'Trade the London bishop',
        why: 'The bishop has the same diagonal and pins the London bishop, which is your main target.',
      },
      {
        san: 'c3',
        title: 'White supports d4',
        why: 'The pawn holds the centre and prepares Nbd2 and Bd3.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'The king is safe before the centre opens.',
      },
      {
        san: 'Nd2',
        title: 'White develops',
        why: 'The knight supports e4 and prepares Bd3 and O-O, with c4 to follow.',
      },
      {
        san: 'Nc6',
        title: 'Support e5 and d4',
        why: 'The knight defends e5 and attacks d4 and c3, the standard Black ideas.',
      },
    ],
  },
  {
    id: 'nimzo',
    name: 'Nimzo-Indian Defence',
    eco: 'E20',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Pin the knight and fight for e4 with pieces. One of the most respected defences in chess.',
    goal: 'Trade the bishop for the c3 knight when it helps, hold e4 with ...d5 and ...Ne4, then use the c-file.',
    nextPlan: 'Next: ...Bxc3 and ...dxc4 or ...b6, with ...Na5 ideas on the queenside.',
    remember: 'Nimzo: ...Bb4 pins, ...d5 hits e4, castle, then ...c5 or ...Nc6.',
    watch:
      'Sometimes giving up the bishop pair is wrong. Take on c3 only when the doubled pawns really help you.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and prepares the flexible Indian setup.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'e6' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre and prepares Nc3.',
      },
      {
        san: 'e6',
        title: 'Open the bishop',
        why: 'The pawn opens the f8 bishop\u2019s path and prepares ...d5.',
      },
      {
        san: 'Nc3',
        title: 'Defend e4, hit d5',
        why: 'The knight supports e4 and pressures d5, which is why Black pins it with ...Bb4.',
      },
      {
        san: 'Bb4',
        title: 'The Nimzo move',
        why: 'You pin the knight and fight for e4 with pieces, not pawns. That is the whole idea.',
      },
      {
        san: 'e3',
        title: 'White breaks the pin',
        why: 'The pawn frees the c1 bishop and prepares Bd3 and Nge2.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook supports the centre.',
      },
      {
        san: 'Bd3',
        title: 'Eye h7, prepare Nf3',
        why: 'The bishop aims at h7 and frees f1, so Nf3 and O-O follow.',
      },
      {
        san: 'd5',
        title: 'Hit e4',
        why: 'The pawn challenges the centre and frees the c8 bishop.',
      },
      {
        san: 'Nf3',
        title: 'Control e5, castle',
        why: 'The knight covers e5 and prepares O-O, completing the centre.',
      },
      {
        san: 'c5',
        title: 'Pressure d4',
        why: 'The pawn attacks the centre, the standard Nimzo plan.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'Both kings are safe and the middlegame begins.',
      },
      {
        san: 'Nc6',
        title: 'Hit d4, prepare ...dxc4',
        why: 'The knight attacks d4 and supports ...dxc4 and ...b6, the standard Nimzo pressure.',
      },
    ],
  },
  {
    id: 'nimzo-white',
    name: 'Nimzo-Indian (as White)',
    eco: 'E21',
    side: 'w',
    family: 'Indian defences',
    summary:
      'How to meet the Nimzo: use Qc2 to prevent doubled pawns and build a big centre with e4.',
    goal: 'Play Qc2, e4 and e5, gain space in the centre and keep the bishop pair.',
    nextPlan: 'Next: Nf3 and Be3, defending the centre and meeting ...f6.',
    remember: 'Against the Nimzo: Qc2 first, then e4 and e5. Do not allow ...Bxc3 so easily.',
    watch:
      'After e5 you must defend the centre pawns. Use Ne2 and Be3, and watch ...f6.',
    steps: [
      {
        san: 'd4',
        title: 'Queen pawn first',
        why: 'The pawn claims the centre.',
        replies: [{ san: 'Nf6', note: 'Black controls e4.', answer: 'c4' }],
      },
      {
        san: 'Nf6',
        title: 'Stop e4 until Qc2',
        why: 'The knight controls e4, so you need Qc2 and e4 in the right order.',
      },
      {
        san: 'c4',
        title: 'Build the centre',
        why: 'The pawn takes space and prepares Nc3.',
        replies: [{ san: 'e6', note: 'Black prepares the Nimzo.', answer: 'Nc3' }],
      },
      {
        san: 'e6',
        title: 'Black opens the bishop',
        why: 'The pawn frees the f8 bishop and prepares ...d5 or ...Bb4.',
      },
      {
        san: 'Nc3',
        title: 'Back e4, meet ...Bb4',
        why: 'The knight supports e4 and invites ...Bb4, which you meet with Qc2.',
      },
      {
        san: 'Bb4',
        title: 'The Nimzo pin',
        why: 'Black pins your knight and fights for e4 with pieces.',
      },
      {
        san: 'Qc2',
        title: 'The modern answer',
        why: 'The queen defends the c3 knight, so ...Bxc3 no longer doubles your pawns at a moment that suits Black.',
        replies: [{ san: 'O-O', note: 'Black castles first.', answer: 'e4' }],
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'The king is safe before the centre opens.',
      },
      {
        san: 'e4',
        title: 'The big centre',
        why: 'You take the space the pin was trying to prevent.',
      },
      {
        san: 'd5',
        title: 'Black hits e4',
        why: 'The pawn challenges your centre, so you must choose between e5 and exd5.',
      },
      {
        san: 'e5',
        title: 'Advance',
        why: 'You keep the strong pawn chain and gain kingside space.',
      },
      {
        san: 'c5',
        title: 'Black attacks the base',
        why: 'The pawn hits d4, the standard plan against the big centre.',
      },
      {
        san: 'dxc5',
        title: 'Trade and keep the centre',
        why: 'You take on c5 and follow with Nf3 and Be3, leaving Black a weak pawn to defend.',
      },
    ],
  },
  {
    id: 'qid',
    name: "Queen's Indian Defence",
    eco: 'E12',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Control e4 with a fianchetto and pieces instead of ...Bb4. Very solid and strategic.',
    goal: 'Develop ...b6 and ...Bb7, hold e4 and pressure the centre along the long diagonal.',
    nextPlan: 'Next: ...d5 and ...O-O, then ...Nbd7 and ...Rc8.',
    remember: "Queen's Indian: ...b6 and ...Bb7 control e4, then ...Ba6 and ...Bb4+ in some lines.",
    watch:
      'Watch your queenside squares when the bishop leaves b7. White\u2019s c5 and Ne5 ideas are real.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and keeps your options open.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'e6' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre.',
      },
      {
        san: 'e6',
        title: 'Open the bishop',
        why: 'The pawn supports ...d5 and frees the f8 bishop.',
      },
      {
        san: 'Nf3',
        title: 'Support e5, prepare g3',
        why: 'The knight covers e5 and clears the way for the kingside fianchetto.',
      },
      {
        san: 'b6',
        title: "The Queen's Indian",
        why: 'You prepare ...Bb7 to control e4 from the long diagonal instead of playing ...Bb4.',
      },
      {
        san: 'g3',
        title: 'White fianchettoes',
        why: 'The bishop on g2 will contest the long diagonal.',
      },
      {
        san: 'Ba6',
        title: 'Pressure c4',
        why: 'The bishop attacks the c4 pawn and hinders White\u2019s development, a key idea in this line.',
      },
      {
        san: 'b3',
        title: 'White defends c4',
        why: 'The pawn protects the centre and keeps the bishop out.',
      },
      {
        san: 'Bb4+',
        title: 'Check the king',
        why: 'The bishop gives check and forces White to spend a move on the pin.',
      },
      {
        san: 'Bd2',
        title: 'White blocks',
        why: 'The bishop blocks the check, but now your bishop has a target on d2.',
      },
      {
        san: 'Be7',
        title: 'Retreat with purpose',
        why: 'The bishop retreats to a safe diagonal and keeps the c7 square free for the queen.',
      },
      {
        san: 'Bg2',
        title: 'White completes the fianchetto',
        why: 'The bishop takes the long diagonal, so both sides are developed.',
      },
      {
        san: 'c6',
        title: 'Solidify',
        why: 'The pawn supports ...d5 and takes b5 and d5 squares away from White\u2019s pieces.',
      },
    ],
  },
  {
    id: 'grunfeld',
    name: 'Grünfeld Defence',
    eco: 'D80',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Give White a huge centre, then destroy it with pieces and pawn breaks. Sharp and modern.',
    goal: 'Trade on d5, hit the centre with ...Bg7 and ...c5, and use your piece activity.',
    nextPlan: 'Next: ...Nc6 and ...Bg4, then ...Qa5 and ...Rac8, hitting the doubled pawns.',
    remember: 'Grünfeld: ...d5 and ...Nxd5, then ...Bg7 and ...c5 against the big centre.',
    watch:
      'Allowing e5 and a big centre without counterplay is fatal. Your breaks must come quickly.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and prepares the fianchetto.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'g6' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre and prepares Nc3.',
      },
      {
        san: 'g6',
        title: 'Prepare the bishop',
        why: 'The bishop on g7 will attack the centre along the long diagonal.',
      },
      {
        san: 'Nc3',
        title: 'Defend e4, tempt ...d5',
        why: 'The knight supports e4 and pressures d5, exactly the pawn Black offers.',
      },
      {
        san: 'd5',
        title: 'The Grünfeld strike',
        why: 'You hit the centre at once, offering the d5 pawn to open lines.',
      },
      {
        san: 'cxd5',
        title: 'White takes',
        why: 'The pawn captures, and your knight will recapture from the centre.',
      },
      {
        san: 'Nxd5',
        title: 'Recapture',
        why: 'The knight takes on d5 and invites White to push e4 and gain space.',
      },
      {
        san: 'e4',
        title: 'The big centre',
        why: 'White takes the space, exactly as the Grünfeld expects.',
      },
      {
        san: 'Nxc3',
        title: 'Trade the knight',
        why: 'You remove a defender of the centre and give White doubled pawns.',
      },
      {
        san: 'bxc3',
        title: 'White recaptures',
        why: 'The pawns are doubled but strong, and the b-file is open.',
      },
      {
        san: 'Bg7',
        title: 'The bishop arrives',
        why: 'The long diagonal is aimed straight at the centre you are attacking.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5, free c1',
        why: 'The knight supports e5 and lets Be3 and Be2 follow after castling.',
      },
      {
        san: 'c5',
        title: 'The second break',
        why: 'The pawn attacks the base at d4, the main Grünfeld plan.',
      },
    ],
  },
  {
    id: 'benoni',
    name: 'Benoni Defence',
    eco: 'A70',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Take space on the queenside, accept a weak d6 pawn and play for the dark squares and the c-file.',
    goal: 'Trade on d5, fianchetto, then hit the centre with ...b5 and use the c-file and e5 square.',
    nextPlan: 'Next: ...O-O and ...Re8, then ...b5 and ...Ba6, piling up on the queenside.',
    remember: 'Benoni: ...c5 and ...e6, take on d5, then ...g6, ...Bg7 and ...b5.',
    watch:
      'Your d6 pawn is a permanent weakness. Keep the pieces active and the c-file open.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and prepares ...c5.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'c5' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre.',
      },
      {
        san: 'c5',
        title: 'The Benoni',
        why: 'You strike at d4 from the side and challenge White\u2019s space immediately.',
      },
      {
        san: 'd5',
        title: 'White advances',
        why: 'The pawn closes the centre and takes space, the main line.',
      },
      {
        san: 'e6',
        title: 'Hit the pawn',
        why: 'The pawn attacks d5, so White must defend or trade.',
      },
      {
        san: 'Nc3',
        title: 'White supports d5',
        why: 'The knight defends the advanced pawn.',
      },
      {
        san: 'exd5',
        title: 'Trade',
        why: 'You open the e-file and give White an isolated d5 pawn to attack.',
      },
      {
        san: 'cxd5',
        title: 'White recaptures',
        why: 'The pawn stays on d5 and your d6 pawn is fixed as the target.',
      },
      {
        san: 'd6',
        title: 'The Benoni structure',
        why: 'You accept the weak pawn in return for the c-file, the e5 square and active pieces.',
      },
      {
        san: 'e4',
        title: 'White builds the centre',
        why: 'The pawn duo gives White space, but d5 is still a target.',
      },
      {
        san: 'g6',
        title: 'Prepare the bishop',
        why: 'The bishop on g7 will pressure d4 and the long diagonal.',
      },
      {
        san: 'Nf3',
        title: 'Support e5, free c1',
        why: 'The knight defends e5 and frees c1 for Be3 before castling.',
      },
      {
        san: 'Bg7',
        title: 'The bishop arrives',
        why: 'The long diagonal is aimed at the centre, and ...b5 and ...Re8 follow.',
      },
    ],
  },
  {
    id: 'benko',
    name: 'Benko Gambit',
    eco: 'A57',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Give a pawn for open files and lasting pressure on the queenside. A club favourite for a reason.',
    goal: 'Trade the b-pawn, open the a and b files, then pressure White\u2019s queenside forever.',
    nextPlan: 'Next: ...Qa5, ...b4 and ...Nbd7, with the rooks coming to b8 and a8.',
    remember: 'Benko: ...b5, ...a6, ...Bxa6, then ...d6, ...g6 and the a and b files.',
    watch:
      'If White holds the extra pawn and neutralises the files, you are simply a pawn down. Keep the pressure on.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and prepares ...c5.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'c5' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre.',
      },
      {
        san: 'c5',
        title: 'Strike at d4',
        why: 'You challenge the centre from the side.',
      },
      {
        san: 'd5',
        title: 'White advances',
        why: 'The pawn closes the centre and takes space.',
      },
      {
        san: 'b5',
        title: 'The Benko Gambit',
        why: 'You offer the b-pawn for open files and lasting pressure. It is a positional sacrifice, not a trick.',
      },
      {
        san: 'cxb5',
        title: 'White accepts',
        why: 'White takes the pawn and will try to hold it.',
      },
      {
        san: 'a6',
        title: 'Open the file',
        why: 'You attack the pawn and force it forward, opening the a-file for your rook.',
      },
      {
        san: 'bxa6',
        title: 'White takes again',
        why: 'White is two pawns up for now, but your pieces get the files.',
      },
      {
        san: 'Bxa6',
        title: 'Recapture',
        why: 'The bishop takes on a6 and eyes your queenside targets, with ...d6 and ...g6 to follow.',
      },
      {
        san: 'Nc3',
        title: 'Hold e4, prepare e5',
        why: 'The knight defends e4 and prepares e5, the move that could blunt Black\'s pressure.',
      },
      {
        san: 'd6',
        title: 'Control e5',
        why: 'The pawn stops e5 and prepares ...g6 and ...Bg7.',
      },
      {
        san: 'e4',
        title: 'White builds',
        why: 'The pawn takes space and prepares e5, the move that could blunt your game.',
      },
      {
        san: 'Bxf1',
        title: 'Trade the bishop',
        why: 'You take the bishop that could defend the queenside and open the f-file for later.',
      },
      {
        san: 'Kxf1',
        title: 'White recaptures',
        why: 'White\u2019s king takes and loses castling rights, which slows White down.',
      },
      {
        san: 'g6',
        title: 'The bishop arrives',
        why: 'The bishop on g7 will pressure the centre and support ...b4 and ...Qa5 ideas.',
      },
    ],
  },
  {
    id: 'dutch',
    name: 'Dutch Defence',
    eco: 'A80',
    side: 'b',
    family: 'Indian defences',
    summary:
      'Take the kingside with ...f5. Unbalanced from move one, with a direct attack on the king.',
    goal: 'Build ...f5, ...e6 and ...Be7, castle, then hit the centre with ...e5 or ...d5.',
    nextPlan: 'Next: ...e5 and ...Qe8, hitting the centre and swinging to the kingside.',
    remember: 'Dutch: ...f5, ...e6, ...Be7, castle. Space on the kingside, play on the e-file.',
    watch:
      'The ...f5 move weakens e6 and g6. Castle before the centre opens, or White\u2019s e4 will hurt.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'f5',
        title: 'The Dutch',
        why: 'You take kingside space and prepare a direct attack, accepting an unbalanced position.',
        replies: [{ san: 'g3', note: 'White prepares a fianchetto against your kingside.', answer: 'Nf6' }],
      },
      {
        san: 'g3',
        title: 'White fianchettoes',
        why: 'The bishop on g2 will pressure your weakened e4 and c6 squares.',
      },
      {
        san: 'Nf6',
        title: 'Control e4',
        why: 'The knight stops e4 and supports ...e5.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'White\u2019s bishop eyes the queenside.',
      },
      {
        san: 'e6',
        title: 'Support the centre',
        why: 'The pawn prepares ...d5 or ...Be7 and frees the f8 bishop.',
      },
      {
        san: 'Nf3',
        title: 'Control e5, castle',
        why: 'The knight covers e5 and prepares O-O before Black\'s ...e5 arrives.',
      },
      {
        san: 'Be7',
        title: 'Cover the dark squares',
        why: 'The bishop defends g5 and h4 and prepares ...O-O, so the king is safe first.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'The king is safe, so your kingside attack must be quick.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe and the rook supports ...e5.',
      },
      {
        san: 'c4',
        title: 'White takes space',
        why: 'The pawn takes queenside space and prepares Nc3.',
      },
      {
        san: 'd6',
        title: 'Prepare ...e5',
        why: 'The pawn supports the central break, your main source of counterplay.',
      },
    ],
  },
  {
    id: 'bogo',
    name: 'Bogo-Indian Defence',
    eco: 'E11',
    side: 'b',
    family: 'Indian defences',
    summary:
      'A Nimzo-Indian without the commitment: check on b4, then develop solidly and castle.',
    goal: 'Develop ...Bb4+, ...Qe7, ...d5 and castle, then trade pieces for a comfortable game.',
    nextPlan: 'Next: ...Nbd7 and ...b6, then ...Bb7 and ...Rc8 with an easy game.',
    remember: 'Bogo: ...Bb4+, ...Qe7, ...O-O, ...d5. Simple, solid development.',
    watch:
      'The queen on e7 can block the bishop. Be ready to recapture on d2 and keep the structure healthy.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
      },
      {
        san: 'Nf6',
        title: 'Control from a distance',
        why: 'The knight stops e4 and keeps your options open.',
        replies: [{ san: 'c4', note: 'White takes space.', answer: 'e6' }],
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes the centre.',
      },
      {
        san: 'e6',
        title: 'Open the bishop',
        why: 'The pawn frees the f8 bishop and prepares ...d5 or ...Bb4+.',
      },
      {
        san: 'Nf3',
        title: 'Support e5, prepare g3',
        why: 'The knight covers e5 and clears the way for Bg2.',
      },
      {
        san: 'Bb4+',
        title: 'The Bogo check',
        why: 'You check and prepare to develop the bishop without committing to the Nimzo pin.',
      },
      {
        san: 'Bd2',
        title: 'White blocks',
        why: 'The bishop blocks the check and offers a trade.',
      },
      {
        san: 'Qe7',
        title: 'The point',
        why: 'The queen defends the bishop and prepares ...Bxd2, with a comfortable game.',
      },
      {
        san: 'g3',
        title: 'White fianchettoes',
        why: 'The bishop on g2 will pressure your queenside.',
      },
      {
        san: 'O-O',
        title: 'Castle',
        why: 'Your king is safe before the centre opens.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'Both sides are developing, so the centre decides the game.',
      },
      {
        san: 'd5',
        title: 'Take the centre',
        why: 'The pawn claims space and challenges White\u2019s setup.',
      },
      {
        san: 'O-O',
        title: 'White castles',
        why: 'Both kings are safe and the middlegame begins.',
      },
      {
        san: 'Bxd2',
        title: 'Trade the bishops',
        why: 'You remove White\u2019s active bishop and reach an equal, easy position.',
      },
    ],
  },
  {
    id: 'budapest',
    name: 'Budapest Gambit',
    eco: 'A51',
    side: 'b',
    family: 'Indian defences',
    summary:
      'A sharp gambit after 1.d4 Nf6 2.c4: give a pawn for fast development and pressure on d4.',
    goal: 'Take on e5, hit the centre with ...Ng4 and ...Nc6, and regain the pawn with active pieces.',
    nextPlan: 'Next: ...Nxe5 and ...O-O, recovering the pawn with active pieces.',
    remember: 'Budapest: ...e5, ...Ng4, ...Nc6 and ...Bb4+. Pressure first, pawn later.',
    watch:
      'The g4 knight can be trapped if you are careless. Always keep its squares in mind.',
    steps: [
      {
        san: 'd4',
        title: 'White opens',
        why: 'The queen pawn claims the centre.',
        replies: [{ san: 'Nf6', note: 'Black develops.', answer: 'c4' }],
      },
      {
        san: 'Nf6',
        title: 'Control e4, set up ...e5',
        why: 'The knight stops e4 and prepares the ...e5 gambit.',
      },
      {
        san: 'c4',
        title: 'White builds',
        why: 'The pawn takes space and prepares Nc3.',
      },
      {
        san: 'e5',
        title: 'The Budapest',
        why: 'You offer the e-pawn to open the centre and develop with tempo.',
        replies: [{ san: 'dxe5', note: 'The main line, taking the pawn.', answer: 'Ng4' }],
      },
      {
        san: 'dxe5',
        title: 'White takes',
        why: 'White grabs the pawn and must now defend the centre pawn.',
      },
      {
        san: 'Ng4',
        title: 'Attack e5',
        why: 'The knight hits the pawn and prepares ...Nxe5 or ...Bc5 ideas.',
      },
      {
        san: 'Bf4',
        title: 'White defends',
        why: 'The bishop protects e5 and keeps the extra pawn.',
      },
      {
        san: 'Nc6',
        title: 'Add pressure',
        why: 'The knight attacks d4 and prepares ...Bb4+ and ...Qe7.',
      },
      {
        san: 'Nf3',
        title: 'Support d4 and e5',
        why: 'The knight defends both central pawns, so Black must work hard for the pawn back.',
      },
      {
        san: 'Bb4+',
        title: 'Check',
        why: 'The bishop checks and forces White to block, gaining time for your development.',
      },
      {
        san: 'Nbd2',
        title: 'White blocks',
        why: 'The knight blocks the check and defends the centre.',
      },
      {
        san: 'Qe7',
        title: 'Regroup',
        why: 'The queen prepares ...Nxe5 and supports the centre, with a comfortable game for the pawn.',
      },
    ],
  },
]
