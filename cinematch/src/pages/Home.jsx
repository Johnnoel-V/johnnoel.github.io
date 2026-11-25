import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MovieGrid } from '../components/MovieGrid'
import { SearchFilters } from '../components/SearchFilters'
import { EmptyState, ErrorMessage, LoadingState } from '../components/Feedback'
import { useFetch } from '../hooks/useFetch'
import { fetchMovies } from '../services/movieService'
import { filterMovies, getGenres, normalizeMovies } from '../utils/dataHelpers'
import { useAppContext } from '../context/AppContextValue'

const defaultFilters = { query: '', genre: 'all', minimumRating: '0', yearFrom: '', sortBy: 'rating' }
const pageSize = 9

export function Home() {
  const { data, loading, error, refetch } = useFetch('movie-list', fetchMovies)
  const [filters, setFilters] = useState(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const movies = useMemo(() => normalizeMovies(data || []), [data])
  const genres = useMemo(() => getGenres(movies), [movies])
  const visibleMovies = useMemo(() => filterMovies(movies, filters), [movies, filters])
  const totalPages = Math.ceil(visibleMovies.length / pageSize)
  const pageMovies = visibleMovies.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const { compareList } = useAppContext()

  function applyFilters(nextFilters) {
    setFilters(nextFilters)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-7">
      <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-9 sm:py-10">
        <p className="text-sm font-semibold tracking-wide text-amber-300">YOUR NEXT MOVIE NIGHT, SORTED</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find a film worth staying in for.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Search by mood, narrow it down, then compare your top two before the popcorn’s ready.
            </p>
          </div>
          <Link to="/compare" className="inline-flex w-fit items-center gap-2 rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300">
            Compare picks <span className="rounded-full bg-slate-900/10 px-2 py-0.5">{compareList.length}/2</span>
          </Link>
        </div>
      </section>

      <SearchFilters genres={genres} onApply={applyFilters} />

      {loading && <LoadingState />}
      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <section>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-900">Movies to match your mood</h2>
            <p className="text-sm text-slate-500">
              Showing {visibleMovies.length ? (currentPage - 1) * pageSize + 1 : 0}–
              {Math.min(currentPage * pageSize, visibleMovies.length)} of {visibleMovies.length}
            </p>
          </div>
          {visibleMovies.length ? (
            <>
              <MovieGrid movies={pageMovies} />
              {totalPages > 1 && (
                <nav aria-label="Movie pages" className="mt-7 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                    className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      aria-current={page === currentPage ? 'page' : undefined}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-md px-3 text-sm font-semibold ${
                        page === currentPage
                          ? 'bg-slate-900 text-white'
                          : 'border border-stone-300 bg-white text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          ) : (
            <EmptyState title="No matches this time">
              Try a different keyword or loosen one of your filters.
            </EmptyState>
          )}
        </section>
      )}
    </div>
  )
}
