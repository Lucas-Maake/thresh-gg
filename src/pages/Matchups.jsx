import { useEffect, useMemo, useState } from 'react'
import { Swords, Pencil, Trash2, Plus } from 'lucide-react'
import { DIFFS, STOCK_MATCHUPS } from '../lib/data'

function cx(...xs){ return xs.filter(Boolean).join(' ') }

export default function Matchups({ search }) {
  const [matchups, setMatchups] = useState(STOCK_MATCHUPS)
  const [editing, setEditing] = useState(null)

  // Load custom matchups
  useEffect(() => {
    try {
      const raw = localStorage.getItem('thresh.matchups')
      if (raw) {
        const parsed = JSON.parse(raw)
        const customs = (Array.isArray(parsed) ? parsed : [])
          .filter(m => m && m.enemy && DIFFS.includes(m.diff))
          .map(m => ({ ...m, source: 'custom' }))
        setMatchups([...customs, ...STOCK_MATCHUPS])
      }
    } catch {}
  }, [])

  // Persist customs only
  useEffect(() => {
    const customs = matchups.filter(m => m.source === 'custom')
      .map(({enemy,diff,notes}) => ({ enemy, diff, notes }))
    localStorage.setItem('thresh.matchups', JSON.stringify(customs))
  }, [matchups])

  const filtered = useMemo(() => {
    const v = (search||'').toLowerCase()
    return matchups.filter(m => !v || m.enemy.toLowerCase().includes(v) || m.notes.toLowerCase().includes(v))
  }, [search, matchups])

  return (
    <section className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 order-last lg:order-first">
        <Builder
          initial={editing!=null ? matchups[editing] : undefined}
          onCancel={() => setEditing(null)}
          onSave={(m) => {
            if (editing!=null) {
              setMatchups(prev => prev.map((x,i) => i===editing ? { ...m, source:'custom' } : x))
              setEditing(null)
            } else {
              setMatchups(prev => [{ ...m, source:'custom' }, ...prev])
            }
          }}
        />
      </div>
      <div className="lg:col-span-2">
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((m, i) => (
            <div key={`${m.enemy}-${i}`} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/10">
                    <Swords className="w-4 h-4" />
                  </span>
                  <h3 className="text-lg font-semibold">{m.enemy}</h3>
                  {m.source === 'custom' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">custom</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={cx('text-xs px-2 py-1 rounded-full', badge(m.diff))}>{m.diff}</span>
                  {m.source === 'custom' ? (
                    <>
                      <button className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" title="Edit" onClick={() => setEditing(i)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" title="Delete"
                        onClick={() => setMatchups(prev => prev.filter((_,j)=>j!==i))}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <button className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" title="Clone into builder"
                      onClick={() => setMatchups(prev => [{ enemy:m.enemy, diff:m.diff, notes:m.notes, source:'custom' }, ...prev])}>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-300 mt-2">{m.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function badge(diff) {
  return diff === 'Easy'
    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20'
    : diff === 'Even'
    ? 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20'
    : diff === 'Skill'
    ? 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20'
    : 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20'
}

function Builder({ initial, onSave, onCancel }) {
  const [enemy, setEnemy] = useState(initial?.enemy || '')
  const [diff, setDiff]   = useState(initial?.diff || 'Even')
  const [notes, setNotes] = useState(initial?.notes || '')
  const [msg, setMsg]     = useState('')

  useEffect(() => {
    setEnemy(initial?.enemy || ''); setDiff(initial?.diff || 'Even'); setNotes(initial?.notes || ''); setMsg('')
  }, [initial])

  function submit(e) {
    e.preventDefault()
    if (!enemy.trim()) return setMsg('Enemy name is required.')
    if (!notes.trim()) return setMsg('Please add at least one coaching note.')
    onSave({ enemy: enemy.trim(), diff, notes: notes.trim() })
    if (!initial) { setEnemy(''); setDiff('Even'); setNotes('') }
    setMsg(initial ? 'Updated matchup.' : 'Added matchup.')
  }

  return (
    <form onSubmit={submit} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
      <div className="flex items-center gap-2"><Swords className="w-4 h-4 text-emerald-300" /><h4 className="font-semibold">Matchup Builder</h4></div>
      <label className="block text-xs text-slate-300">Enemy Support</label>
      <input value={enemy} onChange={e=>setEnemy(e.target.value)} placeholder="e.g., Rakan"
        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
      <label className="block text-xs text-slate-300">Difficulty</label>
      <div className="grid grid-cols-4 gap-2">
        {DIFFS.map(d => (
          <button type="button" key={d} onClick={()=>setDiff(d)}
            className={cx('px-2 py-1 rounded-xl text-xs border', diff===d ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10')}>
            {d}
          </button>
        ))}
      </div>
      <label className="block text-xs text-slate-300">Notes</label>
      <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4}
        placeholder="Key timers, angles, spells to flay, lantern timing..."
        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
      {msg && <p className="text-xs text-emerald-300">{msg}</p>}
      <div className="flex items-center gap-2">
        <button type="submit" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-slate-900 text-sm font-semibold">
          {initial ? 'Save changes' : 'Add matchup'}
        </button>
        {initial && (<button type="button" onClick={onCancel} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm">Cancel</button>)}
      </div>
      <p className="text-[11px] text-slate-400">Custom entries are saved locally and merged with the stock list. Edit/delete from the grid.</p>
    </form>
  )
}
