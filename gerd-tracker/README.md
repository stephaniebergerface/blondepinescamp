# GERD Tracker

A personal symptom, meal, sleep, and lifestyle tracker built for a 6-8 week GERD diagnostic period. All data is stored locally in your browser — nothing is sent to a server.

## Features

- **Symptom check-ins** at 5 configurable times a day (default: waking, mid-morning, afternoon, evening, before bed), with a 0-5 severity scale and common GERD symptom tags (heartburn, regurgitation, chest pain, etc.)
- **Meal logging** with food description, portion size, common trigger tags (spicy, fatty, citrus, caffeine, alcohol...), and time-before-lying-down
- **Sleep logging** with bedtime/wake time, computed hours slept, sleep quality, head-of-bed elevation, and nighttime reflux symptoms
- **Lifestyle logging** for stress level, exercise, alcohol/caffeine intake, smoking, and medications (with dose/time)
- **Today view** showing your progress through the tracking window and quick-add buttons for everything due
- **History** — a searchable/filterable log of every entry, editable and deletable
- **Trends** — weekly severity trend, most common symptoms, rough food-trigger correlation, and sleep/reflux correlation
- **Export** — CSV per data type (for sharing with your doctor) and a full JSON backup/restore

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. On first load you'll set your start date, tracking duration (6-8 weeks), and daily check-in times.

## Building for deployment

```bash
npm run build
```

Outputs a static site to `dist/` — deployable to Vercel, Netlify, GitHub Pages, or any static host. No backend or environment variables required.

## Data & privacy

Everything is stored in this browser's `localStorage` under the key `gerdTracker.v1`. Because it's device/browser-specific:

- Use the **same browser on the same device** for the whole tracking period, or
- Regularly download a **JSON backup** from Settings and restore it wherever you continue tracking.

Clearing browser data/history for this site will erase your logs unless you've exported a backup first.
