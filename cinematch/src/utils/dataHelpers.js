export function normalizeMovie(movie) {
  const rating = movie.imdb_rating == null || movie.imdb_rating === '' ? null : Number(movie.imdb_rating)
  const year = movie.year == null || movie.year === '' ? null : Number(movie.year)

  return {
    id: String(movie.id),
    title: movie.title || 'Untitled movie',
    poster: movie.poster || '',
    year: Number.isFinite(year) ? year : null,
    rating: Number.isFinite(rating) ? rating : null,
    genres: Array.isArray(movie.genres) ? movie.genres : [],
    plot: movie.plot || 'No synopsis is available for this movie yet.',
    runtime: movie.runtime || '',
    director: movie.director || '',
    actors: movie.actors || '',
    country: movie.country || '',
    rated: movie.rated || '',
    released: movie.released || '',
    awards: movie.awards || '',
    imdbVotes: movie.imdb_votes || '',
  }
}

export function normalizeMovies(movies) {
  const seenIds = new Set()
  const normalized = []

  for (const movie of movies) {
    if (!movie || movie.id == null || seenIds.has(String(movie.id))) {
      continue
    }

    seenIds.add(String(movie.id))
    normalized.push(normalizeMovie(movie))
  }

  return normalized
}

export function getGenres(movies) {
  const genres = new Set()

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre))
  })

  return [...genres].sort((a, b) => a.localeCompare(b))
}

export function filterMovies(movies, filters) {
  const { query, genre, minimumRating, yearFrom, sortBy } = filters
  const searchTerm = query.trim().toLowerCase()

  const filtered = movies.filter((movie) => {
    const matchesText =
      !searchTerm ||
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genres.some((item) => item.toLowerCase().includes(searchTerm))
    const matchesGenre = genre === 'all' || movie.genres.includes(genre)
    const matchesRating =
      Number(minimumRating) === 0 || (movie.rating != null && movie.rating >= Number(minimumRating))
    const matchesYear = !yearFrom || (movie.year && movie.year >= Number(yearFrom))

    return matchesText && matchesGenre && matchesRating && matchesYear
  })

  return [...filtered].sort((first, second) => {
    if (sortBy === 'title') return first.title.localeCompare(second.title)
    if (sortBy === 'year') return (second.year || 0) - (first.year || 0)
    return (second.rating || 0) - (first.rating || 0)
  })
}
