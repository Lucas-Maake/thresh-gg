import { BookOpen, Swords, Shield, FlaskConical, PlayCircle, Lightbulb } from 'lucide-react'

export default function Home({ setTab }) {
  const tiles = [
    { key:'guides',   icon: BookOpen,     title:'Guides',    desc:'From fundamentals to late-game picks.' },
    { key:'matchups', icon: Swords,       title:'Matchups',  desc:'Playbooks for common supports.' },
    { key:'builds',   icon: Shield,       title:'Builds',    desc:'Adapt to any comp with intent.' },
    { key:'combos',   icon: FlaskConical, title:'Combo Lab', desc:'Train key sequences with feedback.' },
    { key:'vods',     icon: PlayCircle,   title:'VODs',      desc:'Curated reviews and breakdowns.' },
    { key:'tips',     icon: Lightbulb,    title:'Tips',      desc:'Battle-tested micro optimizations.' },
  ]
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10
                      bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(16,185,129,0.25),transparent),
                         linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Thresh</span> FAST.
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl">Guides, matchups, builds, and interactive drills from cool dad - a Challenger Thresh main.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => setTab('guides')}
            className="px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-slate-900 font-semibold shadow">Start with Guides</button>
          <button onClick={() => setTab('combos')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10">Practice Combo Lab</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="p-4 rounded-2xl text-left bg-white/5 border border-white/10 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 transition">
            <div className="flex items-center gap-2">
              <t.icon className="w-4 h-4 text-emerald-300" />
              <div className="font-semibold">{t.title}</div>
            </div>
            <p className="text-sm text-slate-300 mt-1">{t.desc}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
