import { Link } from 'react-router-dom'
import { useState } from 'react'
import { EmptyState } from '../components/Feedback'
import { MovieGrid } from '../components/MovieGrid'
import { useAppContext } from '../context/AppContextValue'

export function Watchlist() {
  const { watchlist, toggleWatchlist } = useAppContext()
  const [draft, setDraft] = useState({ title: '', year: '' })
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const title = draft.title.trim()

    if (!title) {
      setMessage('Enter a movie title before adding it.')
      return
    }

    toggleWatchlist({
      id: `custom-${Date.now()}`,
      title,
      poster: '',
      year: draft.year ? Number(draft.year) : null,
      rating: null,
      genres: [],
      plot: 'Added from your watchlist.',
      runtime: '',
      director: '',
      actors: '',
      country: '',
      rated: '',
      released: '',
      awards: '',
      imdbVotes: '',
    })
    setDraft({ title: '', year: '' })
    setMessage(`${title} added to your watchlist.`)
  }

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-semibold text-amber-800">YOUR SAVED PICKS</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Watchlist</h1>
        <p className="mt-2 text-sm text-slate-600">Saved in this browser, ready for your next movie night.</p>
      </div>
      <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900">Add your own pick</h2>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-medium text-slate-600">Movie title</span>
            <input
              required
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              placeholder="A movie you want to remember"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>
          <label className="sm:w-36">
            <span className="mb-1 block text-xs font-medium text-slate-600">Year (optional)</span>
            <input
              type="number"
              min="1888"
              max="2100"
              value={draft.year}
              onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))}
              placeholder="2024"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>
          <button type="submit" className="self-end rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300">
            Add to watchlist
          </button>
        </div>
        {message && <p aria-live="polite" className="mt-3 text-sm text-slate-600">{message}</p>}
      </form>
      {watchlist.length ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <EmptyState title="Your watchlist is clear">
          Save movies you want to see, and they’ll show up here. <Link className="font-semibold text-amber-800 hover:underline" to="/">Explore movies →</Link>
        </EmptyState>
      )}
    </section>
  )
}
