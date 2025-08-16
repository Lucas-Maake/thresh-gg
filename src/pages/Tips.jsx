// src/pages/Tips.jsx
export default function Tips({ search = '' }) {
  const tips = [
    { title: 'Brush Poker',  body: 'Stutter-step at brush edge to tax enemy movement before hook.' },
    { title: 'Pre-Lantern',  body: 'Throw W early so ally can click during CC or burst windows.' },
    { title: 'Flay First',   body: 'Cancel key dashes (Naut Q, Leona E) to set up an easy Q.' },
    { title: 'Cone Discipline', body: 'Think in cones, not lines — widen angle with sidestep setups.' },
  ]
  const q = (search || '').toLowerCase()
  const filtered = !q ? tips : tips.filter(t =>
    t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q)
  )

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((t) => (
        <div key={t.title} className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="font-semibold">{t.title}</h4>
          <p className="mt-1 text-sm text-slate-300">{t.body}</p>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-slate-400">No tips match your search.</p>
      )}
    </section>
  )
}
