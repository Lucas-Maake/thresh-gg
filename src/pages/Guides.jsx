import { useMemo } from 'react'
import { GUIDES } from '../lib/guides'
import { BookOpen } from 'lucide-react'

function Tag({ t }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
      #{t}
    </span>
  )
}

export default function Guides({ search = '', segments = [] }) {
  const slug = segments[0] || null

  if (slug) {
    const g = GUIDES.find((x) => x.slug === slug)
    if (!g) {
      return (
        <section className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold tracking-tight">Guide not found</h2>
          <p className="text-slate-300 mt-2">Check the URL or go back.</p>
          <button
            onClick={() => (location.hash = '#/guides')}
            className="mt-4 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
          >
            ← Back to Guides
          </button>
        </section>
      )
    }
    return <GuideDetail g={g} />
  }

  const q = search.toLowerCase()
  const filtered = useMemo(() => {
    if (!q) return GUIDES
    return GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [q])

  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-300" />
          <h2 className="text-2xl font-bold tracking-tight">Guides</h2>
        </div>
        <p className="text-slate-300 mt-1">
          Longer breakdowns of complex ideas or mid/endgame macro patterns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => (
          <button
            key={g.slug}
            onClick={() => (location.hash = `#/guides/${g.slug}`)}
            className="group p-4 rounded-2xl text-left bg-white/5 border border-white/10 hover:border-emerald-400/40 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">
                {g.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 mt-1">{g.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.tags.map((t) => (
                <Tag key={t} t={t} />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Updated {g.updated}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}

function GuideDetail({ g }) {
  return (
    <article className="space-y-4">
      <button
        onClick={() => (location.hash = '#/guides')}
        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold tracking-tight">{g.title}</h1>
      <p className="text-slate-300">{g.description}</p>
      <div className="flex flex-wrap gap-2">
        {g.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
          >
            #{t}
          </span>
        ))}
      </div>

      {g.sections.map((s) => (
        <section key={s.heading} className="mt-3">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
            {s.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}
