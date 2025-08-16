import { useEffect, useState } from 'react'
import { Home, BookOpen, Swords, Shield, FlaskConical, PlayCircle, Lightbulb, Search, Sun, Moon, Hand } from 'lucide-react'

function cx(...xs){ return xs.filter(Boolean).join(' ') }

export default function SiteHeader({ tab, setTab, search, setSearch }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('thresh.theme')
    setTheme(saved || 'dark')
    document.documentElement.classList.toggle('dark', (saved || 'dark') === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('thresh.theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const links = [
    { key: 'home',     label: 'Home',      icon: Home },
    { key: 'guides',   label: 'Guides',    icon: BookOpen },
    { key: 'matchups', label: 'Matchups',  icon: Swords },
    { key: 'builds',   label: 'Builds',    icon: Shield },
    { key: 'combos',   label: 'Combo Lab', icon: FlaskConical },
    { key: 'vods',     label: 'VODs',      icon: PlayCircle },
    { key: 'tips',     label: 'Tips',      icon: Lightbulb },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 bg-neutral-900/50 border-b border-white/5">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="font-brand text-2xl font-extrabold tracking-wide leading-none">
            Thresh<span className="text-emerald-300">.gg</span>
          </div>
        
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {links.map(({key,label,icon:Icon}) => (
            <button key={key} onClick={() => setTab(key)}
              className={cx(
                'px-3 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition',
                tab === key ? 'text-white bg-white/10 border border-white/15' : 'text-slate-300 hover:text-white hover:bg-white/5'
              )}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto w-44 sm:w-64 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search (per-page)"
            className="w-full pl-9 pr-10 py-2 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
        </div>

        <button onClick={() => setTheme(t => t==='dark'?'light':'dark')}
          className="ml-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}
