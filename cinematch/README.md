# CineMatch

A simple, responsive movie discovery app built with React, Vite, Tailwind CSS, and React Router. Search and filter paginated movies, save a browser-local watchlist, open a movie detail page, and compare two picks side by side.

## Run locally

```sh
npm install
npm run dev
```

Create `.env.local` using `.env.example` as a guide and set `TMDB_API_KEY` to your TMDB API key. The key is read only by the server and is not included in the browser bundle. `npm run dev` starts the Vite app and API proxy together. For production, run `npm run build` and then `npm start`; set `TMDB_API_KEY` in the server environment.

Movie data is loaded from TMDB. An internet connection is needed to load the catalog and movie details. The watchlist is saved in browser local storage.

## Project structure

- `src/components/` — reusable header, cards, filters, and loading/error states
- `src/context/` — global watchlist and compare state
- `src/hooks/` — reusable data-fetching hook
- `src/pages/` — Discover, movie detail, Compare, and Watchlist routes
- `src/services/` — movie API requests
- `src/utils/` — pure movie normalization, filtering, and genre helpers

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run lint` — run Oxlint
- `npm start` — serve the production build and private API proxy
