const VODS = [
  { id: 'dQw4w9WgXcQ', title: 'Hook Theory: Threat & Angles', desc: 'Reading movement to pre-aim.' },
  { id: '5qap5aO4i9A', title: 'Support Roam Windows', desc: 'When to leave lane (and when not to).' },
]

export default function Vods() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      {VODS.map((v) => (
        <div key={v.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-semibold">{v.title}</h3>
          <p className="text-sm text-slate-300">{v.desc}</p>
          <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </section>
  )
}
