export const DIFFS = ['Easy', 'Even', 'Skill', 'Hard']

export const STOCK_MATCHUPS = [
  { enemy: 'Zyra',       diff: 'Hard',  notes: 'Respect seed zones; fake hooks to draw E then all-in timer.', source: 'stock' },
  { enemy: 'Nautilus',   diff: 'Skill', notes: 'Flay his Q, punish post-Q cooldown; ward flanks.',          source: 'stock' },
  { enemy: 'Leona',      diff: 'Skill', notes: 'Keep brush control; flay E on entry; lantern pre-E.',       source: 'stock' },
  { enemy: 'Morgana',    diff: 'Hard',  notes: 'Space binding; bait Black Shield then re-engage.',          source: 'stock' },
  { enemy: 'Pyke',       diff: 'Even',  notes: 'Track ghostwater; lantern instantly on R wind-up.',         source: 'stock' },
  { enemy: 'Rakan',      diff: 'Even',  notes: 'Hold flay for W; punish cooldowns with jungle timers.',     source: 'stock' },
  { enemy: 'Blitzcrank', diff: 'Skill', notes: 'Minion line play; flay cancel knock-up; hook trade angles.',source: 'stock' },
  { enemy: 'Lux',        diff: 'Easy',  notes: 'Dodge line; walk up on E; force flash with brush gaps.',    source: 'stock' },
  { enemy: 'Brand',      diff: 'Even',  notes: 'Respect passive; lantern pre-burst; hook on stun wind-up.', source: 'stock' },
  { enemy: 'Karma',      diff: 'Easy',  notes: 'Walk diagonal off mantra Q; fish hooks off movement tax.',  source: 'stock' },
]

export const COMBOS = [
  { id: 1, name: 'Flash-Flay (Instant Displace)', seq: ['F','E'], description: 'Buffer Flash during Flay cast to surprise-knockback and set up Q.', tip: 'Great to peel assassins off ADC.' },
  { id: 2, name: 'Hook-Flash (Range Extend)',     seq: ['Q','F'], description: 'Start Q then Flash during wind-up to shift hitbox mid-flight.',     tip: 'Use when target sidesteps initial line.' },
  { id: 3, name: 'Q1 → Lantern → Q2 Taxi',        seq: ['Q','W','Q'], description: 'Land Q1, lantern ally, then Q2 to taxi both into the fight.', tip: 'Throw W before the re-cast window ends.' },
  { id: 4, name: 'The Box Snap',                   seq: ['R','F','E'], description: 'Drop R then Flash-Flay to force wall breaks and slows.',      tip: 'Zoners melt when slowed into hook angle.' },
]
