import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContextValue'

const navClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
  }`

export function SiteHeader() {
  const { watchlist, compareList } = useAppContext()

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-sm text-slate-950">C</span>
          CineMatch
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>Discover</NavLink>
          <NavLink to="/compare" className={navClass}>
            Compare{compareList.length > 0 && <span className="ml-1 text-xs opacity-70">({compareList.length})</span>}
          </NavLink>
          <NavLink to="/watchlist" className={navClass}>
            Watchlist{watchlist.length > 0 && <span className="ml-1 text-xs opacity-70">({watchlist.length})</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
