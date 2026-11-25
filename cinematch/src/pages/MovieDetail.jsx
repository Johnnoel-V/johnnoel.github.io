import { Link, useParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { EmptyState, ErrorMessage, LoadingState } from '../components/Feedback'
import { useAppContext } from '../context/AppContextValue'
import { useFetch } from '../hooks/useFetch'
import { fetchMovie } from '../services/movieService'
import { normalizeMovie } from '../utils/dataHelpers'

export function MovieDetail() {
  const { id } = useParams()
  const loadMovie = useCallback(() => fetchMovie(id), [id])
  const { data, loading, error, refetch } = useFetch(`movie-${id}`, loadMovie)
  const { watchlist, toggleWatchlist, toggleCompare } = useAppContext()
  const [message, setMessage] = useState('')

  if (loading) return <LoadingState label="Loading movie details…" />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />
  if (!data || !data.id) return <EmptyState title="Movie not found">This movie may no longer be available.</EmptyState>

  const movie = normalizeMovie(data)
  const saved = watchlist.some((item) => item.id === movie.id)

  function handleCompare() {
    const success = toggleCompare(movie)
    setMessage(success ? 'Your compare list has been updated.' : 'Compare two movies at a time.')
  }

  return (
    <div>
      <Link to="/" className="mb-5 inline-block text-sm font-medium text-slate-600 hover:text-amber-800">← Back to discover</Link>
      <article className="grid overflow-hidden rounded-2xl border border-stone-200 bg-white md:grid-cols-[minmax(240px,360px)_1fr]">
        {movie.poster ? (
          <img src={movie.poster} alt={`${movie.title} poster`} className="h-[420px] w-full bg-stone-100 object-cover md:h-full" />
        ) : (
          <div className="grid min-h-72 place-items-center bg-stone-100 text-sm text-slate-500">Poster unavailable</div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>{movie.year || 'Year unknown'}</span>
            {movie.rated && <><span>·</span><span>{movie.rated}</span></>}
            {movie.runtime && <><span>·</span><span>{movie.runtime}</span></>}
            {movie.rating != null && <span className="ml-auto rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-800">★ {movie.rating.toFixed(1)}</span>}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{movie.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres.map((genre) => <span key={genre} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-700">{genre}</span>)}
          </div>
          <p className="mt-6 leading-7 text-slate-600">{movie.plot}</p>
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-stone-200 pt-5 text-sm sm:grid-cols-2">
            {movie.director && <div><dt className="font-semibold text-slate-900">Director</dt><dd className="mt-1 text-slate-600">{movie.director}</dd></div>}
            {movie.actors && <div><dt className="font-semibold text-slate-900">Cast</dt><dd className="mt-1 text-slate-600">{movie.actors}</dd></div>}
            {movie.country && <div><dt className="font-semibold text-slate-900">Country</dt><dd className="mt-1 text-slate-600">{movie.country}</dd></div>}
            {movie.released && <div><dt className="font-semibold text-slate-900">Released</dt><dd className="mt-1 text-slate-600">{movie.released}</dd></div>}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => toggleWatchlist(movie)} className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
              {saved ? 'Remove from watchlist' : '＋ Add to watchlist'}
            </button>
            <button type="button" onClick={handleCompare} className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-stone-100">
              Add to compare
            </button>
          </div>
          {message && <p aria-live="polite" className="mt-3 text-sm text-slate-500">{message}</p>}
        </div>
      </article>
    </div>
  )
}
