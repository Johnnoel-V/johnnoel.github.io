import { Link } from 'react-router-dom'
import { EmptyState } from '../components/Feedback'
import { useAppContext } from '../context/AppContextValue'

function CompareColumn({ movie, index }) {
  if (!movie) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white p-6 text-center">
        <p className="font-semibold text-slate-800">Pick {index + 1}</p>
        <p className="mt-2 text-sm text-slate-500">Choose a movie on Discover to fill this spot.</p>
        <Link to="/" className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Browse movies</Link>
      </div>
    )
  }

  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      {movie.poster ? <img src={movie.poster} alt={`${movie.title} poster`} className="h-64 w-full object-cover sm:h-80" /> : <div className="grid h-64 place-items-center bg-stone-100 text-sm text-slate-500">Poster unavailable</div>}
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{movie.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{movie.year || 'Year unknown'} · {movie.genres.join(', ') || 'Genre not listed'}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">IMDb rating</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">★ {movie.rating == null ? '—' : movie.rating.toFixed(1)}<span className="text-sm font-normal text-slate-500"> / 10</span></p>
        </div>
        <dl className="space-y-3 text-sm">
          <div><dt className="font-semibold text-slate-900">Runtime</dt><dd className="mt-0.5 text-slate-600">{movie.runtime || 'Not listed'}</dd></div>
          <div><dt className="font-semibold text-slate-900">Director</dt><dd className="mt-0.5 text-slate-600">{movie.director || 'Not listed'}</dd></div>
          <div><dt className="font-semibold text-slate-900">Synopsis</dt><dd className="mt-0.5 leading-6 text-slate-600">{movie.plot}</dd></div>
        </dl>
        {movie.id.startsWith('custom-') ? (
          <span className="text-sm text-slate-500">Added from your watchlist</span>
        ) : (
          <Link to={`/movie/${movie.id}`} className="inline-block text-sm font-semibold text-amber-800 hover:underline">View movie details →</Link>
        )}
      </div>
    </article>
  )
}

export function CompareMovies() {
  const { compareList } = useAppContext()

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-semibold text-amber-800">THE FINAL SHOWDOWN</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Compare movies</h1>
        <p className="mt-2 text-sm text-slate-600">See ratings, runtime, and story side by side. Pick up to two movies from Discover.</p>
      </div>
      {compareList.length === 0 ? (
        <EmptyState title="Choose your contenders">
          Head to <Link className="font-semibold text-amber-800 hover:underline" to="/">Discover</Link> and tap Compare on two movies.
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[0, 1].map((index) => <CompareColumn key={index} movie={compareList[index]} index={index} />)}
        </div>
      )}
    </section>
  )
}
