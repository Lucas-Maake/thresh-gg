// Simple content model for guides (no MDX/runtime deps)
export const GUIDES = [
  {
    slug: 'fundamentals',
    title: 'Fundamentals: The Thresh Identity',
    description:
      'Hook threat, lantern tempo, and space control—how Thresh warps the lane.',
    tags: ['laning', 'macro'],
    updated: '2025-08-10',
    sections: [
      {
        heading: 'Threat as a resource',
        points: [
          'Your hook timer taxes enemy movement—hold space just off the minion line.',
          'Feint in and out of brush to force inefficient paths.',
        ],
      },
      {
        heading: 'Lantern tempo',
        points: [
          'Throw W before damage lands so allies can click during CC.',
          'Use lantern to start fights (gap-close) or to peel (snap retreat).',
        ],
      },
    ],
  },
  {
    slug: 'laning-phase',
    title: 'Laning Phase: Pressure & Pockets',
    description:
      'Minion wave geometry, brush timings, and reading ADC body-language.',
    tags: ['laning', 'timing'],
    updated: '2025-08-09',
    sections: [
      {
        heading: 'Brush control',
        points: [
          'Own the close brush; stand at edges to widen hook cones.',
          'Time exits with enemy CS animations for free windows.',
        ],
      },
      {
        heading: 'Roam windows',
        points: [
          'Track support roams with ward timers and shove-then-move patterns.',
        ],
      },
    ],
  },
]
