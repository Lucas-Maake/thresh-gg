import { useEffect, useMemo, useState } from 'react'
import SiteHeader from './components/SiteHeader'
import Matchups from './pages/Matchups'
import ComboLab from './pages/ComboLab'
import Home from './pages/Home'
import Guides from './pages/Guides'
import Builds from './pages/Builds'
import Vods from './pages/Vods'
import Tips from './pages/Tips'
import cleanHash from './utils/hash.js'

export default function App() {
  const [tab, setTab] = useState('home')
  const [segments, setSegments] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const applyHash = () => {
      const path = cleanHash(location.hash) // e.g., "guides/fundamentals"
      const [t, ...rest] = path.split('/').filter(Boolean)
      setTab(t || 'home')
      setSegments(rest)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  // Update hash when changing tabs via UI (don’t clobber deep links)
  useEffect(() => {
    const current = cleanHash(location.hash)
    const [currTab, ...rest] = current.split('/').filter(Boolean)
    if (rest.length === 0 && (currTab || 'home') !== tab) {
      location.hash = `#/${tab}`
    }
  }, [tab])

  const content = useMemo(() => {
    if (tab === 'matchups') return <Matchups search={search} />
    if (tab === 'combos')   return <ComboLab />
    if (tab === 'guides')   return <Guides search={search} segments={segments} />
    if (tab === 'builds')   return <Builds />
    if (tab === 'vods')     return <Vods />
    if (tab === 'tips')     return <Tips search={search} />
    return <Home setTab={(t) => { setTab(t); location.hash = `#/${t}` }} />
  }, [tab, search, segments])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-slate-100">
      <SiteHeader tab={tab} setTab={(t)=>{ setTab(t); location.hash = `#/${t}` }} search={search} setSearch={setSearch} />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {content}
      </main>
      
    </div>
  )
}
