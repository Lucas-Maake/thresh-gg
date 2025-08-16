import { useEffect, useMemo, useState } from 'react'
import { FlaskConical, Zap } from 'lucide-react'
import { COMBOS } from '../lib/data'
import { normalizeKey } from '../utils/keys'

function cx(...xs){ return xs.filter(Boolean).join(' ') }

export default function ComboLab() {
  const [active, setActive]   = useState(null)
  const [progress, setProg]   = useState(0)
  const [history, setHistory] = useState([])
  const [startedAt, setStart] = useState(null)
  const current = useMemo(() => COMBOS.find(c => c.id === active) || null, [active])

  useEffect(() => {
    function onKeyDown(e) {
      if (!current) return
      const key = normalizeKey(e.key)
      const expected = current.seq[progress]
      if (key === expected) {
        if (progress === 0) setStart(performance.now())
        setProg(p => p + 1)
      } else {
        setProg(0)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, progress])

  useEffect(() => {
    if (!current) return
    if (progress === current.seq.length) {
      const took = (performance.now() - (startedAt || performance.now())) / 1000
      setHistory(h => [{ id: current.id, name: current.name, t: took }, ...h].slice(0,5))
      setProg(0)
    }
  }, [progress, current, startedAt])

  return (
    <section className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><FlaskConical className="w-4 h-4 text-emerald-300"/><h4 className="font-semibold">Trainer</h4></div>
            {current ? <span className="text-xs text-slate-300">Press: {current.seq.join(' → ')}</span> : <span className="text-xs text-slate-300">Select a combo to begin</span>}
          </div>
          <div className="mt-4 h-36 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
            {current ? (
              <div className="text-center">
                <div className="text-sm text-slate-300">Practicing</div>
                <div className="text-xl font-semibold mt-1">{current.name}</div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {current.seq.map((k,i) => <Keycap key={i} label={k} active={i < progress} />)}
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-sm">Choose a combo on the right →</div>
            )}
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-400" style={{ width: current ? `${(progress / (current.seq.length || 1)) * 100}%` : 0 }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Keys: <b>Q</b>, <b>W</b>, <b>E</b>, <b>R</b>, <b>F</b> (Flash)</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-300"/><h4 className="font-semibold">Recent Clears</h4></div>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-slate-400">No records yet—complete a combo to log your time.</p>
          ) : (
            <ul className="mt-2 text-sm text-slate-300">
              {history.map((h,i) => (
                <li key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                  <span>{h.name}</span><span className="tabular-nums">{h.t.toFixed(2)}s</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {COMBOS.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={cx('w-full p-4 text-left rounded-2xl border transition', active===c.id ? 'bg-emerald-500/10 border-emerald-400/40' : 'bg-white/5 border-white/10 hover:border-white/20')}>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs text-slate-300 mt-1">{c.description}</div>
            <div className="mt-2 flex flex-wrap gap-1">{c.seq.map((k,i)=> <Keycap key={i} label={k} />)}</div>
            <div className="text-xs text-slate-400 mt-2">{c.tip}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

function Keycap({ label, active }) {
  return <div className={cx('px-2.5 py-1 rounded-md border text-xs font-mono', active ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-200')}>{label}</div>
}
