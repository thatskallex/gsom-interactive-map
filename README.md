# GSOM Interactive Map MVP

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` and navigate to `/organizer`.

## Replacing the SVG floorplan

1. Replace `public/floors/floor-1.svg` with your real SVG.
2. Keep every room polygon/shape as a unique SVG element with an `id`.
3. Ensure each `Room.polygonId` in `src/data/rooms.ts` matches the SVG element `id`.

If IDs do not match, rooms will not respond to hover/click events.

## Data sources

- `src/data/rooms.ts` holds mock room data.
- `src/data/events.ts` holds mock events (visitor mode).

The async functions in `src/lib/api.ts` are written so you can replace them with real API calls later.
