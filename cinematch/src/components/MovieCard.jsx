import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContextValue'

export function MovieCard({ movie }) {
  const { watchlist, compareList, toggleWatchlist, toggleCompare } = useAppContext()
  const [feedback, setFeedback] = useState('')
  const saved = watchlist.some((item) => item.id === movie.id)
  const selected = compareList.some((item) => item.id === movie.id)
  const compareFull = compareList.length >= 2 && !selected
  const isCustomMovie = movie.id.startsWith('custom-')

  function handleCompare() {
    const success = toggleCompare(movie)
    setFeedback(success ? (selected ? 'Removed from compare.' : 'Added to compare.') : 'Compare two movies at a time.')
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      {isCustomMovie ? (
        <div className="grid h-64 place-items-center bg-stone-100 text-sm text-slate-500 sm:h-72">Your movie pick</div>
      ) : (
        <Link to={`/movie/${movie.id}`} className="block bg-stone-100">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              className="h-64 w-full object-cover object-center sm:h-72"
            />
          ) : (
            <div className="grid h-64 place-items-center text-sm text-slate-500">Poster unavailable</div>
          )}
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {isCustomMovie ? (
              <span className="font-semibold text-slate-900">{movie.title}</span>
            ) : (
              <Link to={`/movie/${movie.id}`} className="font-semibold text-slate-900 hover:text-amber-700">
                {movie.title}
              </Link>
            )}
            <p className="mt-1 text-sm text-slate-500">{movie.year || 'Year unknown'}</p>
          </div>
          <span className="shrink-0 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
            ★ {movie.rating == null ? '—' : movie.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-3 min-h-10 text-sm leading-5 text-slate-600">
          {movie.genres.slice(0, 3).join(' · ') || 'Genre not listed'}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <button
            type="button"
            onClick={() => toggleWatchlist(movie)}
            className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
              saved ? 'bg-amber-100 text-amber-900 hover:bg-amber-200' : 'bg-slate-900 text-white hover:bg-slate-700'
            }`}
          >
            {saved ? 'Saved ✓' : '+ Watchlist'}
          </button>
          <button
            type="button"
            onClick={handleCompare}
            disabled={compareFull}
            className="rounded-md border border-stone-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {selected ? 'Comparing ✓' : 'Compare'}
          </button>
        </div>
        {feedback && <p aria-live="polite" className="mt-2 text-xs text-slate-500">{feedback}</p>}
      </div>
    </article>
  )
}
