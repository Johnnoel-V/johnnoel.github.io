import { useEffect, useState } from 'react'
import { AppContext } from './AppContextValue'

function readWatchlist() {
  try {
    return JSON.parse(localStorage.getItem('cinematch-watchlist') || '[]')
  } catch (error) {
    console.error('Could not read the saved watchlist.', error)
    return []
  }
}

export function AppProvider({ children }) {
  const [watchlist, setWatchlist] = useState(readWatchlist)
  const [compareList, setCompareList] = useState([])

  useEffect(() => {
    try {
      localStorage.setItem('cinematch-watchlist', JSON.stringify(watchlist))
    } catch (error) {
      console.error('Could not save the watchlist in this browser.', error)
    }
  }, [watchlist])

  function toggleWatchlist(movie) {
    setWatchlist((current) =>
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie],
    )
  }

  function toggleCompare(movie) {
    const alreadySelected = compareList.some((item) => item.id === movie.id)

    if (alreadySelected) {
      setCompareList((current) => current.filter((item) => item.id !== movie.id))
      return true
    }

    if (compareList.length >= 2) return false

    setCompareList((current) => [...current, movie])
    return true
  }

  return (
    <AppContext.Provider value={{ watchlist, compareList, toggleWatchlist, toggleCompare }}>
      {children}
    </AppContext.Provider>
  )
}
