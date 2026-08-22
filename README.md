# Energy Diary

A personal, energy-aware daily planner that combines tasks, mood tracking, calendar review, and monthly analytics.

## Features

- Calendar-first month view with per-day energy and mood status
- Bilingual UI toggle (中文 / English)
- Daily page: tasks on top, diary and memos below
- Tasks support projects, priorities, and energy direction (consume or recover)
- Daily energy cap works as a net budget; recovered energy can be reused
- Quick mood logging with kaomoji, daily mood summary, and mood timeline
- Monthly report with separate consume/recover lines and mood points
- Fully local and offline when opened as a static page
- Optional LAN sync so phone and computer share the same data file

## Tech

- Vanilla HTML / CSS / JavaScript, no front-end dependencies
- LocalStorage for local persistence
- Optional Python HTTP server for shared data across devices

## Run Locally

Open `index.html` directly in a browser, or start the sync server:

```bash
python server.py
```

Then visit `http://localhost:8765/energy-diary/`.

## Notes

- `data.json` contains personal data and is intentionally gitignored.
- The static build works on GitHub Pages; the sync server is optional.
