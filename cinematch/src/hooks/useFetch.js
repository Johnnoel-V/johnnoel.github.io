import { useEffect, useState } from 'react'

export function useFetch(resourceKey, fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError('')

      try {
        const result = await fetcher()
        if (active) setData(result)
      } catch (requestError) {
        if (active) {
          setError(requestError.message || 'Something went wrong while loading movies.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [resourceKey, attempt, fetcher])

  return { data, loading, error, refetch: () => setAttempt((value) => value + 1) }
}
