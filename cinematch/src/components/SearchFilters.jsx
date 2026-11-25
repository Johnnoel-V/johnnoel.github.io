import { useRef, useState } from 'react'

const initialFilters = { query: '', genre: 'all', minimumRating: '0', yearFrom: '', sortBy: 'rating' }
const maxYear = new Date().getFullYear() + 1

export function SearchFilters({ genres, onApply }) {
  const [filters, setFilters] = useState(initialFilters)
  const searchRef = useRef(null)

  function updateFilter(event) {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submitFilters(event) {
    event.preventDefault()
    onApply(filters)
  }

  function focusSearch() {
    searchRef.current?.focus()
  }

  return (
    <form onSubmit={submitFilters} className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-slate-900">Find a movie</h2>
        <button type="button" onClick={focusSearch} className="text-xs font-medium text-amber-800 hover:underline">
          Focus search
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="sm:col-span-2 lg:col-span-2">
          <span className="mb-1 block text-xs font-medium text-slate-600">Title or keyword</span>
          <input
            ref={searchRef}
            name="query"
            value={filters.query}
            onChange={updateFilter}
            placeholder="Try a title or genre"
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-slate-600">Genre</span>
          <select name="genre" value={filters.genre} onChange={updateFilter} className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm">
            <option value="all">All genres</option>
            {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-slate-600">Minimum rating</span>
          <select name="minimumRating" value={filters.minimumRating} onChange={updateFilter} className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm">
            <option value="0">Any rating</option>
            <option value="6">6.0+</option>
            <option value="7">7.0+</option>
            <option value="8">8.0+</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-slate-600">Released since</span>
          <input
            name="yearFrom"
            type="number"
            min="1888"
            max={maxYear}
            value={filters.yearFrom}
            onChange={updateFilter}
            placeholder="e.g. 2000"
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <label className="text-xs font-medium text-slate-600">
          Sort by
          <select name="sortBy" value={filters.sortBy} onChange={updateFilter} className="ml-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-normal text-slate-800">
            <option value="rating">Top rated</option>
            <option value="year">Newest</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setFilters(initialFilters)
              onApply(initialFilters)
            }}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-stone-100"
          >
            Clear
          </button>
          <button type="submit" className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300">
            Apply filters
          </button>
        </div>
      </div>
    </form>
  )
}
