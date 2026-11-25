import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { SiteHeader } from './components/SiteHeader'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'
import { CompareMovies } from './pages/CompareMovies'
import { Watchlist } from './pages/Watchlist'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-stone-50 text-slate-900">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/compare" element={<CompareMovies />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="border-t border-stone-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <span>CineMatch · A little help choosing movie night.</span>
              <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
