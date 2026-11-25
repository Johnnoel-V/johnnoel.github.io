const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

async function request(path) {
  const response = await fetch(`/api${path}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || `Movie service returned an error (${response.status}).`)
  }

  return data
}

function mapMovie(movie, genreNames = new Map()) {
  const crew = movie.credits?.crew || []
  const cast = movie.credits?.cast || []
  const genres = movie.genres
    ? movie.genres.map((genre) => genre.name)
    : (movie.genre_ids || []).map((id) => genreNames.get(id)).filter(Boolean)

  return {
    id: movie.id,
    title: movie.title || movie.original_title,
    poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '',
    year: movie.release_date ? movie.release_date.slice(0, 4) : null,
    imdb_rating: movie.vote_average,
    genres,
    plot: movie.overview,
    runtime: movie.runtime ? `${movie.runtime} min` : '',
    director: crew.find((person) => person.job === 'Director')?.name || '',
    actors: cast.slice(0, 5).map((person) => person.name).join(', '),
    country: (movie.production_countries || []).map((country) => country.name).join(', '),
    released: movie.release_date || '',
  }
}

export async function fetchMovies() {
  const [genreResponse, ...pages] = await Promise.all([
    request('/genres'),
    ...[1, 2, 3].map((page) => request(`/movies?page=${page}`)),
  ])
  const genreNames = new Map(genreResponse.genres.map((genre) => [genre.id, genre.name]))
  return pages.flatMap((page) => page.results.map((movie) => mapMovie(movie, genreNames)))
}

export async function fetchMovie(id) {
  const movie = await request(`/movies/${encodeURIComponent(id)}`)
  return mapMovie(movie)
}
