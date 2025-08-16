export default function Builds() {
  const core = [
    { name: 'Locket of the Iron Solari', why: 'Teamfight survivability & shields.' },
    { name: 'Zeke’s Convergence', why: 'Synergy with hook engages.' },
    { name: 'Knight’s Vow', why: 'Damage redirection for fed carry.' },
  ]
  const situational = [
    { name: 'Shurelya’s', why: 'Pick/escape speed; engage range extension.' },
    { name: 'Mikael’s Blessing', why: 'Cleanse critical picks (e.g., Morg Q).' },
    { name: 'Redemption', why: 'Global fight swing; siege sustain.' },
    { name: 'Frozen Heart', why: 'Anti-AS comps; mana/ability haste.' },
  ]
  const runes = [
    { setup: 'Aftershock', notes: 'Safer all-in, front-to-back fights.' },
    { setup: 'Glacial Augment', notes: 'Pick comp + ADC kiting.' },
    { setup: 'Guardian', notes: 'Vs heavy poke or peel duty.' },
  ]

  return (
    <section className="grid md:grid-cols-2 gap-4">
      <Card title="Core Items">
        <List items={core} />
      </Card>
      <Card title="Situational Items">
        <List items={situational} />
      </Card>
      <Card title="Rune Pages (High-level)">
        <ul className="space-y-1">
          {runes.map((r) => (
            <li key={r.setup} className="text-slate-300">
              <b>{r.setup}</b> — {r.notes}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

function Card({ title, children }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  )
}
function List({ items }) {
  return (
    <ul className="space-y-1">
      {items.map((x) => (
        <li key={x.name} className="text-slate-300">
          <b>{x.name}</b> — {x.why}
        </li>
      ))}
    </ul>
  )
}
