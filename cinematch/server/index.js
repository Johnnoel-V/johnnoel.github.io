import dotenv from 'dotenv'
import express from 'express'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
dotenv.config({ path: join(projectRoot, '.env.local') })

const app = express()
const port = Number(process.env.PORT) || 3001
const tmdbApiKey = process.env.TMDB_API_KEY
const distDirectory = join(projectRoot, 'dist')
const indexFile = join(distDirectory, 'index.html')
const tmdbBaseUrl = 'https://api.themoviedb.org/3'

async function proxyTmdb(path, response) {
  if (!tmdbApiKey) {
    response.status(500).json({ status_message: 'TMDB_API_KEY is missing from the server environment.' })
    return
  }

  const url = new URL(`${tmdbBaseUrl}${path}`)
  url.searchParams.set('api_key', tmdbApiKey)

  try {
    const tmdbResponse = await fetch(url)
    const data = await tmdbResponse.json()
    response.status(tmdbResponse.status).json(data)
  } catch (error) {
    console.error('TMDB request failed:', error)
    response.status(502).json({ status_message: 'Could not connect to TMDB. Please try again.' })
  }
}

app.get('/api/movies', (request, response) => {
  const page = Number(request.query.page || 1)
  if (!Number.isInteger(page) || page < 1) {
    response.status(400).json({ status_message: 'Page must be a positive whole number.' })
    return
  }

  proxyTmdb(`/movie/popular?language=en-US&page=${page}`, response)
})

app.get('/api/genres', (_request, response) => {
  proxyTmdb('/genre/movie/list?language=en-US', response)
})

app.get('/api/movies/:id', (request, response) => {
  if (!/^\d+$/.test(request.params.id)) {
    response.status(400).json({ status_message: 'Movie ID must be numeric.' })
    return
  }

  proxyTmdb(`/movie/${request.params.id}?language=en-US&append_to_response=credits`, response)
})

app.use('/api', (_request, response) => {
  response.status(404).json({ status_message: 'API route not found.' })
})

app.use(express.static(distDirectory))
app.get(/.*/, (_request, response) => {
  if (!existsSync(indexFile)) {
    response.status(404).send('Build the app with npm run build before starting the production server.')
    return
  }

  response.sendFile(indexFile)
})

app.listen(port, () => {
  console.log(`CineMatch server listening on http://localhost:${port}`)
})
