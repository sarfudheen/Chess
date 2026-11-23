import type { OpeningSource } from './types'

// Asymmetric defences to 1.e4: Black concedes a little centre for a fight.
export const SEMI_OPEN: OpeningSource[] = [
  {
    id: 'najdorf',
    name: 'Sicilian Defence: Najdorf',
    eco: 'B90',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'The most respected Sicilian: ...a6 first, ...e5 later, and play on the queenside while White attacks the king.',
    goal: 'Trade the c-pawn for the d-pawn, take the half-open c-file, then expand with ...b5.',
    nextPlan: 'Next: ...Be7, ...O-O, ...Nbd7 and ...b5, with ...Rc8 on the c-file.',
    remember: 'Najdorf: ...a6 first, then ...e5, then ...Be6 and ...b5.',
    watch:
      'The d5 square can become a hole. Do not trade the e6 bishop for nothing.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn and expects a central fight.',
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'You fight for the centre from the side, accepting an unbalanced game where Black plays for a win.',
        replies: [
          { san: 'Nf3', note: 'The Open Sicilian, White\u2019s most testing move.', answer: 'd6' },
          { san: 'c3', note: 'The Alapin, aiming for a simple centre.', answer: 'Nf6' },
        ],
      },
      {
        san: 'Nf3',
        title: 'Prepare d4 against the Sicilian',
        why: 'The knight heads for d4 after the pawn trade, which is why ...d6 must support e5.',
      },
      {
        san: 'd6',
        title: 'Prepare ...cxd4',
        why: 'You support a later ...e5 and keep the d-pawn flexible before the centre opens.',
      },
      {
        san: 'd4',
        title: 'White opens the centre',
        why: 'The pawn offers a trade, and after ...cxd4 White recaptures with the knight.',
      },
      {
        san: 'cxd4',
        title: 'Trade towards the centre',
        why: 'You swap the c-pawn for White\u2019s d-pawn and get the half-open c-file.',
      },
      {
        san: 'Nxd4',
        title: 'White recaptures',
        why: 'The knight sits on d4, so your next job is to hit it and develop.',
      },
      {
        san: 'Nf6',
        title: 'Develop and hit e4',
        why: 'The knight attacks e4 and clears g8 for castling.',
      },
      {
        san: 'Nc3',
        title: 'Guard e4 and free the bishop',
        why: 'White holds e4, frees c1 for Be3 and prepares f3, so your ...e5 break needs care.',
      },
      {
        san: 'a6',
        title: 'The Najdorf move',
        why: 'You take b5 away from White\u2019s pieces and prepare ...e5 without allowing Nb5 ideas.',
        replies: [{ san: 'Be3', note: 'The English Attack, White\u2019s main choice.', answer: 'e5' }],
      },
      {
        san: 'Be3',
        title: 'Cover d4 and watch b6',
        why: 'The bishop protects the d4 knight and eyes b6, preparing f3 and Qd2.',
      },
      {
        san: 'e5',
        title: 'Strike in the centre',
        why: 'The pawn kicks the knight and takes space; you accept a weak d5 square in return for active play.',
      },
      {
        san: 'Nb3',
        title: 'The knight retreats',
        why: 'White keeps the knight active on b3, so your bishop must go to e6.',
      },
      {
        san: 'Be6',
        title: 'Develop and watch d5',
        why: 'The bishop covers d5 and supports ...Be7, ...Nbd7, ...O-O and the ...b5 push.',
      },
    ],
  },
  {
    id: 'dragon',
    name: 'Sicilian Dragon',
    eco: 'B76',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'Fianchetto the bishop on the long diagonal and race White\u2019s kingside attack with queenside play.',
    goal: 'Castle, then use the g7 bishop, the c-file and ...Rc8 to attack before White mates you.',
    nextPlan: 'Next: ...Rc8 and ...Ne5 or ...Nxd4, racing White\'s h4-h5 storm.',
    remember: 'Dragon: ...g6 and ...Bg7 give the long diagonal and a sharp, two-sided game.',
    watch:
      'White\u2019s f3, Qd2, Bc4 and O-O-O plan is dangerous. Know ...Rc8 and ...Ne5 or ...Nxd4.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'You trade central space for a lasting initiative on the queenside.',
        replies: [{ san: 'Nf3', note: 'The Open Sicilian.', answer: 'd6' }],
      },
      {
        san: 'Nf3',
        title: 'White prepares d4',
        why: 'The knight heads for d4 once the pawns are traded.',
      },
      {
        san: 'd6',
        title: 'Support the centre',
        why: 'The pawn covers e5 and prepares the exchange on d4.',
      },
      {
        san: 'd4',
        title: 'White opens the centre',
        why: 'The central tension must be resolved.',
      },
      {
        san: 'cxd4',
        title: 'Black trades',
        why: 'You open the c-file for your queen and rook.',
      },
      {
        san: 'Nxd4',
        title: 'White recaptures',
        why: 'The knight on d4 is the target of your fianchettoed bishop.',
      },
      {
        san: 'Nf6',
        title: 'Develop and hit e4',
        why: 'The knight attacks e4 and prepares to castle.',
      },
      {
        san: 'Nc3',
        title: 'White defends',
        why: 'White holds the centre and prepares Be3.',
      },
      {
        san: 'g6',
        title: 'The Dragon bishop',
        why: 'You prepare ...Bg7, where the bishop breathes fire along the long diagonal.',
        replies: [{ san: 'Be3', note: 'White\u2019s main setup, the Yugoslav Attack.', answer: 'Bg7' }],
      },
      {
        san: 'Be3',
        title: 'Fortify d4, aim at b6',
        why: 'The bishop defends d4, watches b6 and prepares f3 and Qd2, the Yugoslav setup.',
      },
      {
        san: 'Bg7',
        title: 'The long diagonal',
        why: 'The bishop now pressures d4 and the whole queenside.',
      },
      {
        san: 'f3',
        title: 'White blunts the bishop',
        why: 'The pawn blocks the diagonal and prepares e5 ideas.',
      },
      {
        san: 'O-O',
        title: 'Castle into the fight',
        why: 'Your king is safe and the rook supports ...e5 or ...Rc8 plans.',
      },
      {
        san: 'Qd2',
        title: 'White lines up',
        why: 'The queen prepares Bh6 and long castling, so your queenside play must be quick.',
      },
      {
        san: 'Nc6',
        title: 'The Yugoslav reply',
        why: 'Your knight joins the queenside pressure; plans are ...Nxd4, ...a6 and ...Rc8.',
      },
    ],
  },
  {
    id: 'sicilian-yugoslav',
    name: 'Sicilian: Yugoslav Attack',
    eco: 'B77',
    side: 'w',
    family: 'Semi-open games',
    summary:
      'The sharpest answer to the Dragon: castle long, push h4-h5 and mate before Black\u2019s queenside arrives.',
    goal: 'Build the Be3, f3, Qd2, Bc4 setup, castle long, then break through with h4-h5.',
    nextPlan: 'Next: h5 and Bh6, opening the h-file for the rook and queen.',
    remember: 'Yugoslav: Be3, f3, Qd2, Bc4, O-O-O, then h4-h5.',
    watch:
      'Do not rush h4 before O-O-O. Black\u2019s ...Nxd4 and ...Bxc3 tricks are real.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'c5', note: 'The Sicilian.', answer: 'Nf3' }],
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'Black avoids a symmetrical centre and plays for an unbalanced game.',
      },
      {
        san: 'Nf3',
        title: 'Prepare d4',
        why: 'The knight heads for d4 after the pawn trade.',
      },
      {
        san: 'd6',
        title: 'Black supports the centre',
        why: 'The pawn covers e5 and prepares ...cxd4.',
      },
      {
        san: 'd4',
        title: 'Open the centre',
        why: 'You challenge Black\u2019s structure immediately.',
      },
      {
        san: 'cxd4',
        title: 'Black trades',
        why: 'The c-file opens for Black\u2019s pieces.',
      },
      {
        san: 'Nxd4',
        title: 'Recapture',
        why: 'The knight takes its ideal square and prepares Be3.',
      },
      {
        san: 'Nf6',
        title: 'Hit e4 before ...g6',
        why: 'The knight attacks e4 and clears g8, so ...g6 and ...Bg7 arrive without losing a tempo.',
      },
      {
        san: 'Nc3',
        title: 'Defend the centre',
        why: 'You hold e4 and prepare the Yugoslav setup.',
      },
      {
        san: 'g6',
        title: 'The Dragon',
        why: 'Black prepares the long diagonal, so you must attack first.',
      },
      {
        san: 'Be3',
        title: 'The Yugoslav bishop',
        why: 'The bishop covers the d4 knight and prepares the long castle, the key to the attack.',
        replies: [{ san: 'Bg7', note: 'Black completes the fianchetto.', answer: 'f3' }],
      },
      {
        san: 'Bg7',
        title: 'Black\u2019s pride',
        why: 'The bishop eyes your queenside, so speed matters.',
      },
      {
        san: 'f3',
        title: 'Blunt the bishop',
        why: 'The pawn blocks the long diagonal and supports e4, so you can storm the kingside.',
        replies: [{ san: 'O-O', note: 'Black castles kingside, your target.', answer: 'Qd2' }],
      },
      {
        san: 'O-O',
        title: 'Black castles',
        why: 'The king has committed to the kingside, which is where you attack.',
      },
      {
        san: 'Qd2',
        title: 'Line up the queen',
        why: 'The queen prepares Bh6 and long castling.',
        replies: [{ san: 'Nc6', note: 'Black develops and presses d4.', answer: 'Bc4' }],
      },
      {
        san: 'Nc6',
        title: 'Black pressures d4',
        why: 'The knight adds a defender of e5 and an attacker of d4.',
      },
      {
        san: 'Bc4',
        title: 'Aim at f7',
        why: 'The bishop points at f7, and now O-O-O and h4-h5 are the plan.',
      },
      {
        san: 'Bd7',
        title: 'Black prepares ...Rc8',
        why: 'The bishop develops and clears a path for the queenside rooks.',
      },
      {
        san: 'h4',
        title: 'Begin the pawn storm',
        why: 'The rook pawn starts h4-h5 to open the kingside before Black\'s ...Rc8 arrives.',
      },
    ],
  },
  {
    id: 'sicilian-classical',
    name: 'Sicilian: Classical',
    eco: 'B56',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'A solid Sicilian with ...Nc6 and ...e6. Less double-edged than the Dragon, easier to learn.',
    goal: 'Develop naturally, castle, then use the c-file and ...b5 or ...d5 to free your game.',
    nextPlan: 'Next: ...Be7, ...O-O, ...Bd7 and ...b5, with ...Rc8 to follow.',
    remember: 'Classical Sicilian: ...Nc6 and ...e6, then ...Be7 and castle.',
    watch:
      'White\u2019s Bxf6 and Nd5 ideas can leave you with a weak d6 pawn. Keep the centre covered.',
    steps: [      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'You concede the centre for queenside pressure and unbalanced play.',
        replies: [{ san: 'Nf3', note: 'The Open Sicilian.', answer: 'd6' }],
      },
      {
        san: 'Nf3',
        title: 'Prepare d4 before ...e5',
        why: 'The knight heads for d4 once the c-pawn is traded, so your ...d6 must be ready to support e5.',
      },
      {
        san: 'd6',
        title: 'Solid foundation',
        why: 'The pawn controls e5 and supports the coming exchange.',
      },
      {
        san: 'd4',
        title: 'White opens the centre',
        why: 'The central pawns must be resolved.',
      },
      {
        san: 'cxd4',
        title: 'Black trades',
        why: 'You get the half-open c-file.',
      },
      {
        san: 'Nxd4',
        title: 'White recaptures',
        why: 'The knight on d4 is your main target.',
      },
      {
        san: 'Nf6',
        title: 'Develop and hit e4',
        why: 'The knight attacks the centre and prepares to castle.',
      },
      {
        san: 'Nc3',
        title: 'White defends',
        why: 'White holds e4 and prepares Be3 or Bg5.',
      },
      {
        san: 'Nc6',
        title: 'Defend e5 and eye d4',
        why: 'The knight covers e5 and pressures d4, the Classical Sicilian\'s solid answer to the Dragon.',
        replies: [{ san: 'Bg5', note: 'White pins the f6 knight.', answer: 'e6' }],
      },
      {
        san: 'Bg5',
        title: 'White pins',
        why: 'The pin pressures your knight, so you must handle it before developing.',
      },
      {
        san: 'e6',
        title: 'Break the pin',
        why: 'You support a later ...Be7 and stop the pin\u2019s sting, and the f8 bishop gets an exit.',
      },
      {
        san: 'Qd2',
        title: 'White prepares to castle long',
        why: 'The queen supports Bh6 and the long castle.',
      },
      {
        san: 'a6',
        title: 'The Rauzer move',
        why: 'You take b5 away from White\u2019s pieces and prepare ...Be7, ...O-O and ...Bd7.',
      },
    ],
  },
  {
    id: 'alapin',
    name: 'Sicilian: Alapin',
    eco: 'B22',
    side: 'w',
    family: 'Semi-open games',
    summary:
      'Skip the Open Sicilian theory. Play c3 and build a big pawn centre you already understand.',
    goal: 'Push e5 and d4, hold the centre together and develop with Nf3, Be2 and O-O.',
    nextPlan: 'Next: O-O, Be3 and Re1 against the d6 pawn.',
    remember: 'Alapin: c3, e5, d4, a big centre without the Open Sicilian.',
    watch:
      'Your e5 pawn can become a target. Defend it with Nf3, Be2 and O-O, not with more pawn moves.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'c5', note: 'The Sicilian.', answer: 'c3' }],
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'Black avoids a symmetrical game and fights for the centre from the side.',
      },
      {
        san: 'c3',
        title: 'The Alapin',
        why: 'You offer a pawn centre and avoid the mountains of Open Sicilian theory. The plan is simple: d4.',
        replies: [
          { san: 'Nf6', note: 'The main reply, hitting e4.', answer: 'e5' },
          { san: 'd5', note: 'Black grabs the centre.', answer: 'exd5' },
        ],
      },
      {
        san: 'Nf6',
        title: 'Black hits e4',
        why: 'The knight forces you to advance or defend, which is exactly what you prepared.',
      },
      {
        san: 'e5',
        title: 'Gain space',
        why: 'You push the knight back and build the d4 pawn duo, a position you know how to play.',
      },
      {
        san: 'Nd5',
        title: 'The knight settles',
        why: 'Black keeps the knight central and attacks e5 before it is pushed further.',
      },
      {
        san: 'd4',
        title: 'Build the centre',
        why: 'With c3 and d4 you have a strong pawn pair, and development comes next.',
        replies: [{ san: 'cxd4', note: 'Black trades to relieve the pressure.', answer: 'Nf3' }],
      },
      {
        san: 'cxd4',
        title: 'Black takes',
        why: 'The tension is released and the c-file opens.',
      },
      {
        san: 'Nf3',
        title: 'Pin d4 and hold the centre',
        why: 'The knight attacks d4 and prepares Be2 and O-O, so Black\'s central pawn is awkward to keep.',
      },
      {
        san: 'Nc6',
        title: 'Defend d4, prepare ...e5',
        why: 'The knight holds d4 and prepares ...e5, the break that challenges your big centre.',
      },
      {
        san: 'cxd4',
        title: 'Recapture',
        why: 'You restore the pawn duo and open the c-file for your rook.',
      },
      {
        san: 'd6',
        title: 'Black challenges e5',
        why: 'The pawn hits the base of your centre, so you must hold it with pieces.',
      },
      {
        san: 'Be2',
        title: 'Finish development',
        why: 'The bishop prepares O-O, and Be3, O-O and Re1 follow while Black\'s d6 pawn is a target.',
      },
    ],
  },
  {
    id: 'french',
    name: 'French Defence',
    eco: 'C11',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'A rock-solid pawn chain with ...e6 and ...d5, and one recurring problem: the light-squared bishop.',
    goal: 'Play ...c5 against the base of White\u2019s centre, then free the c8 bishop with ...b6 or ...Bd7.',
    nextPlan: 'Next: ...Be7 and ...O-O, then ...Qb6 or ...b6 and ...Bb7 to solve the bishop.',
    remember: 'French: ...e6, ...d5, then ...c5 against the chain.',
    watch:
      'The c8 bishop must get out. ...b6 and ...Ba6, or ...Bd7, are your routes.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'e6',
        title: 'The French',
        why: 'You build a solid pawn chain and plan ...d5 to hit the centre.',
        replies: [{ san: 'd4', note: 'The main line.', answer: 'd5' }],
      },
      {
        san: 'd4',
        title: 'White builds the centre',
        why: 'The pawn duo gives White space and control.',
      },
      {
        san: 'd5',
        title: 'Strike at e4',
        why: 'The pawn challenges White\u2019s centre and frees your game, though it locks in the light bishop.',
      },
      {
        san: 'Nc3',
        title: 'White defends e4',
        why: 'The knight adds a defender, so you must attack the centre harder.',
      },
      {
        san: 'Nf6',
        title: 'Pressure e4',
        why: 'The knight adds a second attacker, so White must defend or advance.',
      },
      {
        san: 'e5',
        title: 'White advances',
        why: 'The pawn closes the centre and takes space, fixing your target at d4.',
      },
      {
        san: 'Nfd7',
        title: 'Reposition the knight',
        why: 'The knight steps back so it can support ...c5, the standard French plan.',
        replies: [{ san: 'f4', note: 'White supports e5 and prepares Nf3.', answer: 'c5' }],
      },
      {
        san: 'f4',
        title: 'White defends e5',
        why: 'The pawn protects e5 so the bishop can develop.',
      },
      {
        san: 'c5',
        title: 'Attack the chain',
        why: 'The c-pawn hits the base of White\u2019s chain at d4. This is the whole French idea.',
      },
      {
        san: 'Nf3',
        title: 'Support d4, free the bishop',
        why: 'The knight defends d4 and opens the c1 bishop\'s path to Be2 and O-O.',
      },
      {
        san: 'Nc6',
        title: 'Add pressure',
        why: 'The knight eyes d4 and supports ...Qb6, ...Be7 and castling.',
      },
    ],
  },
  {
    id: 'french-advance',
    name: 'French: Advance Variation',
    eco: 'C02',
    side: 'w',
    family: 'Semi-open games',
    summary:
      'Answer the French with e5. Space, kingside chances and a clear plan instead of endless theory.',
    goal: 'Hold d4 with c3 and Nf3, then gain queenside space with a3 and b4.',
    nextPlan: 'Next: Nbd2 and O-O, then Re1 and a queenside squeeze with Rb1 and a4.',
    remember: 'French Advance: e5, c3, Nf3, a3, b4.',
    watch:
      'If Black defends accurately you can end up a pawn down. Play the position, not just the moves.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'e6', note: 'The French Defence.', answer: 'd4' }],
      },
      {
        san: 'e6',
        title: 'The French',
        why: 'Black builds a solid chain and prepares ...d5.',
      },
      {
        san: 'd4',
        title: 'Build the centre',
        why: 'You take the space the French is trying to deny you.',
      },
      {
        san: 'd5',
        title: 'Black challenges e4',
        why: 'The pawn hits your centre, so you must decide whether to trade or advance.',
      },
      {
        san: 'e5',
        title: 'The Advance',
        why: 'You close the centre and take space. The pawn on e5 cramps Black and gives you kingside chances.',
        replies: [
          { san: 'c5', note: 'Black hits the base at d4.', answer: 'c3' },
          { san: 'Nc6', note: 'Black develops and pressures d4.', answer: 'Nf3' },
        ],
      },
      {
        san: 'c5',
        title: 'Black attacks d4',
        why: 'The pawn hits the base of your chain, the standard French plan.',
      },
      {
        san: 'c3',
        title: 'Hold d4',
        why: 'You support the centre and prepare Nf3 and Bd3. Without d4 your e5 pawn would fall.',
        replies: [{ san: 'Nc6', note: 'Black develops and attacks d4 again.', answer: 'Nf3' }],
      },
      {
        san: 'Nc6',
        title: 'Black adds a knight',
        why: 'The knight attacks d4, so your development must defend the centre.',
      },
      {
        san: 'Nf3',
        title: 'Develop and cover d4',
        why: 'The knight defends d4 and prepares Be2 or Bd3.',
        replies: [{ san: 'Qb6', note: 'Black hits d4 and b2.', answer: 'a3' }],
      },
      {
        san: 'Qb6',
        title: 'Black piles on',
        why: 'The queen attacks d4 and b2, so loose pieces would lose material.',
      },
      {
        san: 'a3',
        title: 'Prepare b4',
        why: 'You stop ...Nb4 and prepare b4, gaining queenside space and hitting c5.',
        replies: [{ san: 'Bd7', note: 'Black develops and prepares ...Rc8.', answer: 'b4' }],
      },
      {
        san: 'Bd7',
        title: 'Clear the way for ...Rc8',
        why: 'The bishop steps aside so the rook reaches c8 and the queen can join the queenside.',
      },
      {
        san: 'b4',
        title: 'The Milner-Barry push',
        why: 'The pawn attacks c5 and opens lines. The pawn sacrifice is worth the initiative.',
      },
    ],
  },
  {
    id: 'caro-kann',
    name: 'Caro-Kann Defence',
    eco: 'B18',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'Like the French, but the light bishop comes out before ...e6. Solid, and easy to play for a lifetime.',
    goal: 'Trade on e4, develop the bishop to f5 and build a healthy structure with ...e6 and ...Nd7.',
    nextPlan: 'Next: ...e6 and ...Be7, then ...O-O and ...c5 or ...b5 depending on White.',
    remember: 'Caro-Kann: ...c6, ...d5, ...dxe4, ...Bf5. Develop the bishop first.',
    watch:
      'Keep your king safe. Without ...e6 and castling, Ng5 ideas can hurt.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'c6',
        title: 'Solid and ambitious',
        why: 'You prepare ...d5 with pawn support, avoiding the French bishop problem.',
        replies: [{ san: 'd4', note: 'The main line.', answer: 'd5' }],
      },
      {
        san: 'd4',
        title: 'White builds the centre',
        why: 'The pawn duo takes space and opens lines.',
      },
      {
        san: 'd5',
        title: 'Challenge the centre',
        why: 'The pawn hits e4 immediately, which is the point of ...c6.',
      },
      {
        san: 'Nc3',
        title: 'White defends e4',
        why: 'The knight adds a defender, so you trade the pawn instead.',
      },
      {
        san: 'dxe4',
        title: 'Trade',
        why: 'You swap your d-pawn for White\u2019s e-pawn and open the c8 bishop\u2019s diagonal.',
      },
      {
        san: 'Nxe4',
        title: 'White recaptures',
        why: 'The knight takes the central square and attacks your bishop\u2019s natural home.',
      },
      {
        san: 'Bf5',
        title: 'Develop the problem bishop',
        why: 'The bishop comes out before ...e6. That is the whole reason to play the Caro-Kann.',
        replies: [{ san: 'Ng3', note: 'White hits the bishop.', answer: 'Bg6' }],
      },
      {
        san: 'Ng3',
        title: 'White attacks the bishop',
        why: 'The knight kicks the bishop and clears e4 for the pawn.',
      },
      {
        san: 'Bg6',
        title: 'Keep the bishop',
        why: 'The bishop stays active on the g6-c2 diagonal, where it will always have a job.',
      },
      {
        san: 'h4',
        title: 'White grabs space',
        why: 'The pawn prepares h5 to challenge the bishop.',
      },
      {
        san: 'h6',
        title: 'A hook for the bishop',
        why: 'You take g5 away from White\u2019s pieces and give the bishop a retreat to h7.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5 and d4',
        why: 'The knight supports e5 and frees the c1 bishop for Be3 or Bf4.',
      },
      {
        san: 'Nd7',
        title: 'Complete development',
        why: 'The knight heads for f6 or b6 and supports ...e6, with castling to follow.',
      },
    ],
  },
  {
    id: 'caro-advance',
    name: 'Caro-Kann: Advance',
    eco: 'B12',
    side: 'w',
    family: 'Semi-open games',
    summary:
      'Meet the Caro-Kann with e5. Space, a clear structure and no need for long theory.',
    goal: 'Hold the e5 pawn, develop Be2 and Be3, castle, then play on the kingside.',
    nextPlan: 'Next: Nbd2 and O-O, then f4 and f5 on the kingside.',
    remember: 'Advance Caro: e5, Nf3, Be2, Be3, then castle.',
    watch:
      'Black\u2019s ...c5 and ...Nc6 hit d4, so be ready to trade on c5 or hold with c3.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'c6', note: 'The Caro-Kann.', answer: 'd4' }],
      },
      {
        san: 'c6',
        title: 'The Caro-Kann',
        why: 'Black prepares ...d5 with pawn support and a healthy structure.',
      },
      {
        san: 'd4',
        title: 'Build the centre',
        why: 'You take the space before Black\u2019s ...d5 arrives.',
      },
      {
        san: 'd5',
        title: 'Black challenges e4',
        why: 'The pawn hits your centre, so you choose between trading and advancing.',
      },
      {
        san: 'e5',
        title: 'Advance and cramp',
        why: 'You take space and keep the position closed. Black\u2019s bishop comes out, but your kingside chances remain.',
        replies: [{ san: 'Bf5', note: 'Black develops the bishop before ...e6.', answer: 'Nf3' }],
      },
      {
        san: 'Bf5',
        title: 'Leave the chain, eye c2',
        why: 'The bishop escapes the pawns and points at c2, so your e4 and d4 pawns need watching.',
      },
      {
        san: 'Nf3',
        title: 'Develop and cover h4',
        why: 'The knight supports d4 and stops ...Bg4 ideas.',
        replies: [{ san: 'e6', note: 'Black prepares ...c5.', answer: 'Be2' }],
      },
      {
        san: 'e6',
        title: 'Black prepares ...c5',
        why: 'The pawn supports the central break.',
      },
      {
        san: 'Be2',
        title: 'Develop the bishop',
        why: 'You prepare to castle and keep e5 defended.',
        replies: [{ san: 'c5', note: 'Black hits the base at d4.', answer: 'Be3' }],
      },
      {
        san: 'c5',
        title: 'Black attacks d4',
        why: 'The pawn challenges your centre, the standard plan against the Advance.',
      },
      {
        san: 'Be3',
        title: 'Defend and develop',
        why: 'The bishop protects d4 and connects the rooks, with Nbd2 and O-O next.',
      },
    ],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian Defence',
    eco: 'B01',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'Trade a centre pawn at once and get a simple, active position with clear plans.',
    goal: 'Recapture with the queen, step to a5, then develop with ...Nf6, ...c6 and ...Bf5.',
    nextPlan: 'Next: ...e6 and ...Be7, then ...O-O and ...Rc8 or ...c5.',
    remember: 'Scandinavian: ...d5, ...Qxd5, ...Qa5, then ...Nf6, ...c6, ...Bf5.',
    watch:
      'Do not leave the queen in the middle. Nc3 and d4 gain time against it.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'd5',
        title: 'The Scandinavian',
        why: 'You trade a centre pawn immediately and get a simple, active game with clear plans.',
        replies: [{ san: 'exd5', note: 'The main reply.', answer: 'Qxd5' }],
      },
      {
        san: 'exd5',
        title: 'White takes',
        why: 'The pawn captures and your queen must decide where to go.',
      },
      {
        san: 'Qxd5',
        title: 'Recapture',
        why: 'The queen regains the pawn but can be hit by Nc3, so it must move again.',
      },
      {
        san: 'Nc3',
        title: 'White attacks the queen',
        why: 'The knight develops with tempo, so your queen needs a good square.',
      },
      {
        san: 'Qa5',
        title: 'Step to safety',
        why: 'The queen keeps an eye on the centre and avoids further loss of time.',
      },
      {
        san: 'd4',
        title: 'White builds',
        why: 'The pawn duo gives White space, so your development must be quick.',
      },
      {
        san: 'Nf6',
        title: 'Develop and pressure',
        why: 'The knight hits e4 and supports ...Bf5 or ...Bg4.',
      },
      {
        san: 'Nf3',
        title: 'Cover d4, prepare Be2',
        why: 'The knight protects d4 and clears the way for the bishop, so castling comes next.',
      },
      {
        san: 'c6',
        title: 'A retreat for the queen',
        why: 'The pawn gives the queen the c7 square and prepares ...Bf5.',
      },
      {
        san: 'Bc4',
        title: 'Target f7 before castling',
        why: 'The bishop points at f7 and frees f1, so your king cannot castle without care.',
      },
      {
        san: 'Bf5',
        title: 'Develop actively',
        why: 'The bishop comes out to f5, challenging White\u2019s bishop and covering e4.',
      },
    ],
  },
  {
    id: 'alekhine',
    name: 'Alekhine Defence',
    eco: 'B04',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'Invite White to chase your knight, then attack the overextended pawns. Provocative and instructive.',
    goal: 'Play ...Nd5, then undermine the advanced pawns with ...d6 and ...c6.',
    nextPlan: 'Next: ...e6 and ...Be7, then ...O-O and ...c5 against d4.',
    remember: 'Alekhine: ...Nf6, ...Nd5, ...d6, attack the big pawn centre.',
    watch:
      'You give up space, so your pieces must stay active. Passive play loses here.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'Nf6',
        title: 'Provoke',
        why: 'You invite White to chase the knight, hoping to overextend the pawns and attack them later.',
        replies: [{ san: 'e5', note: 'The main line, kicking the knight at once.', answer: 'Nd5' }],
      },
      {
        san: 'e5',
        title: 'White advances',
        why: 'The pawn takes space and attacks your knight.',
      },
      {
        san: 'Nd5',
        title: 'Keep the knight central',
        why: 'The knight stays active and will be supported by ...d6 and ...c6.',
      },
      {
        san: 'd4',
        title: 'White builds',
        why: 'The pawn duo looks imposing, which is exactly what you want to attack.',
      },
      {
        san: 'd6',
        title: 'Undermine e5',
        why: 'You attack the advanced pawn. White\u2019s space can become a target.',
        replies: [{ san: 'Nf3', note: 'White defends e5.', answer: 'dxe5' }],
      },
      {
        san: 'Nf3',
        title: 'White defends',
        why: 'The knight supports e5 and prepares Be2.',
      },
      {
        san: 'dxe5',
        title: 'Trade',
        why: 'You remove the cramping pawn and open the centre for your pieces.',
      },
      {
        san: 'Nxe5',
        title: 'White recaptures',
        why: 'The knight takes a strong central square, so you must challenge it.',
      },
      {
        san: 'c6',
        title: 'Support the knight',
        why: 'The pawn controls b5 and d5 and gives the knight a home on d7 if it is attacked.',
      },
      {
        san: 'Be2',
        title: 'Castle short and hold e5',
        why: 'The bishop prepares O-O and defends e5 while Black\'s knight needs a new home.',
      },
      {
        san: 'Bf5',
        title: 'Develop the bishop',
        why: 'The bishop comes out actively and eyes c2, with ...e6 and ...Be7 to follow.',
      },
    ],
  },
  {
    id: 'pirc',
    name: 'Pirc Defence',
    eco: 'B07',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'Let White take the centre, fianchetto, castle, then hit the centre with pawn breaks.',
    goal: 'Develop ...g6, ...Bg7, ...Nf6 and castle, then strike with ...e5 or ...c5.',
    nextPlan: 'Next: ...c6 and ...Qa5, then ...b5 or ...e5, hitting the centre.',
    remember: 'Pirc: ...d6, ...Nf6, ...g6, ...Bg7, castle, then hit the centre.',
    watch:
      'White\u2019s e5 pawn space can be crushing if you delay ...e5 or ...c5.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'd6',
        title: 'Flexible',
        why: 'You keep your options open and prepare ...Nf6 and ...g6 to hit the centre later.',
        replies: [{ san: 'd4', note: 'White takes the centre.', answer: 'Nf6' }],
      },
      {
        san: 'd4',
        title: 'White takes space',
        why: 'The pawn duo controls the middle, so your pieces must attack it.',
      },
      {
        san: 'Nf6',
        title: 'Hit e4',
        why: 'The knight forces White to defend or advance.',
      },
      {
        san: 'Nc3',
        title: 'White defends',
        why: 'The knight holds e4 and prepares Be3.',
      },
      {
        san: 'g6',
        title: 'Fianchetto',
        why: 'The bishop on g7 will pressure d4 and the long diagonal. You concede space now for activity later.',
      },
      {
        san: 'Nf3',
        title: 'Support e5, free c1',
        why: 'The knight defends e5 and lets Be3 or Bc4 follow before castling.',
      },
      {
        san: 'Bg7',
        title: 'The bishop arrives',
        why: 'The long diagonal is your main weapon against the centre.',
      },
      {
        san: 'Be2',
        title: 'White prepares to castle',
        why: 'The bishop develops and the king will follow.',
      },
      {
        san: 'O-O',
        title: 'Castle early',
        why: 'Your king is safe and the rook supports ...e5, the move that challenges the centre.',
      },
      {
        san: 'O-O',
        title: 'Both kings are safe',
        why: 'Now the middlegame is about who hits the centre first.',
      },
      {
        san: 'c6',
        title: 'Prepare ...b5 and ...Qa5',
        why: 'The pawn supports a queenside expansion and gives the queen a route toward a5.',
      },
    ],
  },
  {
    id: 'modern',
    name: 'Modern Defence',
    eco: 'B06',
    side: 'b',
    family: 'Semi-open games',
    summary:
      'The Pirc\u2019s flexible cousin: ...g6 and ...Bg7 at once, with the centre decided later.',
    goal: 'Fianchetto, castle, then choose between ...c5 and ...e5 depending on White\u2019s setup.',
    nextPlan: 'Next: ...b5 and ...Qa5, with ...Bb7 and ...Rfb8 to follow.',
    remember: 'Modern: ...g6, ...Bg7, ...d6, ...Nf6, castle. Pieces first, then the centre.',
    watch:
      'If White plays e5 and you never break with ...c5 or ...e5, you stay cramped all game.',
    steps: [
      {
        san: 'e4',
        title: 'White claims the centre',
        why: 'White opens with the king pawn.',
      },
      {
        san: 'g6',
        title: 'Hypermodern',
        why: 'You hand White the centre and plan to attack it with pieces and pawn breaks.',
        replies: [{ san: 'd4', note: 'White takes the space.', answer: 'Bg7' }],
      },
      {
        san: 'd4',
        title: 'White builds',
        why: 'The centre is yours to attack, which is precisely the plan.',
      },
      {
        san: 'Bg7',
        title: 'The long diagonal',
        why: 'The bishop is your main weapon; it will pressure d4 from afar.',
      },
      {
        san: 'Nc3',
        title: 'Guard e4, prepare Be3',
        why: 'The knight holds e4 and frees c1, so Be3 can meet the g7 bishop\'s pressure on d4.',
      },
      {
        san: 'd6',
        title: 'Solid centre',
        why: 'You control e5 and prepare ...Nf6 and castling before deciding on ...c5 or ...e5.',
      },
      {
        san: 'Nf3',
        title: 'Cover e5 and d4',
        why: 'The knight supports the e5 push and defends d4 against ...c5.',
      },
      {
        san: 'Nf6',
        title: 'Develop and fight for e4',
        why: 'The knight attacks the centre and prepares to castle.',
      },
      {
        san: 'Be2',
        title: 'White prepares to castle',
        why: 'The bishop develops and the king follows.',
      },
      {
        san: 'O-O',
        title: 'King safety first',
        why: 'Your king is safe before the centre opens.',
      },
      {
        san: 'O-O',
        title: 'Both kings are safe',
        why: 'The middlegame is about the central breaks.',
      },
      {
        san: 'c6',
        title: 'Queenside plans',
        why: 'You prepare ...b5 and ...Qa5 or ...Qb6, the standard Modern plans.',
      },
    ],
  },
  {
    id: 'closed-sicilian',
    name: 'Closed Sicilian',
    eco: 'B23',
    side: 'w',
    family: 'Semi-open games',
    summary:
      'A quiet Sicilian where you build a kingside attack with g3, Bg2, d3 and f4.',
    goal: 'Develop behind the g2 bishop, castle, then push f4-f5 or e5 when the time is right.',
    nextPlan: 'Next: Be3 and Qe2, then f5 or e5 to open the kingside.',
    remember: 'Closed Sicilian: g3, Bg2, d3, f4. Attack on the kingside.',
    watch:
      'Your bishop on g2 can be shut in by your own pawns. Time the e5 push carefully.',
    steps: [
      {
        san: 'e4',
        title: 'Take the centre',
        why: 'The king pawn claims the middle and opens lines.',
        replies: [{ san: 'c5', note: 'The Sicilian.', answer: 'Nc3' }],
      },
      {
        san: 'c5',
        title: 'The Sicilian',
        why: 'Black avoids a symmetrical centre.',
      },
      {
        san: 'Nc3',
        title: 'A different Sicilian',
        why: 'You avoid the Open Sicilian and play a quiet kingside build-up, keeping the position closed.',
        replies: [{ san: 'Nc6', note: 'The main reply.', answer: 'g3' }],
      },
      {
        san: 'Nc6',
        title: 'Control d4, prepare ...g6',
        why: 'The knight eyes d4 and the queenside while Black sets up the fianchetto.',
      },
      {
        san: 'g3',
        title: 'Fianchetto',
        why: 'The bishop on g2 will support e4 and the f4-f5 push.',
      },
      {
        san: 'g6',
        title: 'Black copies',
        why: 'Black prepares the same bishop on the other long diagonal.',
      },
      {
        san: 'Bg2',
        title: 'The bishop arrives',
        why: 'The bishop defends e4 and aims at the queenside.',
      },
      {
        san: 'Bg7',
        title: 'Black\u2019s bishop',
        why: 'Both bishops now stare at the centre.',
      },
      {
        san: 'd3',
        title: 'Modest but safe',
        why: 'You hold e4 and prepare f4, Nf3 and castling.',
      },
      {
        san: 'd6',
        title: 'Black solidifies',
        why: 'The pawn covers e5 and frees the c8 bishop.',
      },
      {
        san: 'f4',
        title: 'The space grab',
        why: 'You take space on the kingside. The plan is Nf3, O-O, then e5 or f5.',
        replies: [{ san: 'e6', note: 'Black blocks the centre.', answer: 'Nf3' }],
      },
      {
        san: 'e6',
        title: 'Black closes the centre',
        why: 'The pawn stops your e5 break, so your attack must come from f5 and the g-file.',
      },
      {
        san: 'Nf3',
        title: 'Finish development',
        why: 'The knight supports e5 and prepares to castle.',
      },
      {
        san: 'Nge7',
        title: 'Black prepares ...O-O',
        why: 'The knight heads for f5 or g6, and Black will castle next.',
      },
      {
        san: 'O-O',
        title: 'Castle and prepare e5',
        why: 'Your king is safe and the rook supports e5, the break that turns space into an attack.',
      },
    ],
  },
]
