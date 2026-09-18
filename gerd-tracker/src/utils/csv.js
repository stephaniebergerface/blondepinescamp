function csvEscape(val) {
  if (val === null || val === undefined) return ''
  const s = Array.isArray(val) ? val.join('; ') : String(val)
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function toCsv(rows, columns) {
  const header = columns.map((c) => c.label).join(',')
  const lines = rows.map((row) => columns.map((c) => csvEscape(row[c.key])).join(','))
  return [header, ...lines].join('\n')
}

function download(filename, content, mime = 'text/csv') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportSymptomsCsv(entries, checkInLabels) {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'slotLabel', label: 'Check-in' },
    { key: 'time', label: 'Time' },
    { key: 'severity', label: 'Severity (0-5)' },
    { key: 'types', label: 'Symptom types' },
    { key: 'notes', label: 'Notes' },
  ]
  const rows = entries
    .slice()
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .map((e) => ({
      ...e,
      slotLabel: checkInLabels[e.slot] ?? '',
    }))
  download('gerd-symptoms.csv', toCsv(rows, columns))
}

export function exportMealsCsv(entries) {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'mealType', label: 'Meal type' },
    { key: 'foods', label: 'Foods' },
    { key: 'portionSize', label: 'Portion size' },
    { key: 'triggers', label: 'Trigger tags' },
    { key: 'minutesBeforeLyingDown', label: 'Minutes before lying down' },
    { key: 'notes', label: 'Notes' },
  ]
  const rows = entries.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  download('gerd-meals.csv', toCsv(rows, columns))
}

export function exportSleepCsv(entries) {
  const columns = [
    { key: 'date', label: 'Night of' },
    { key: 'bedtime', label: 'Bedtime' },
    { key: 'waketime', label: 'Wake time' },
    { key: 'hoursSlept', label: 'Hours slept' },
    { key: 'quality', label: 'Quality (1-5)' },
    { key: 'headElevated', label: 'Head of bed elevated' },
    { key: 'nightSymptoms', label: 'Woke with reflux symptoms' },
    { key: 'notes', label: 'Notes' },
  ]
  const rows = entries.slice().sort((a, b) => a.date.localeCompare(b.date))
  download('gerd-sleep.csv', toCsv(rows, columns))
}

export function exportLifestyleCsv(entries) {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'stressLevel', label: 'Stress (1-5)' },
    { key: 'exerciseType', label: 'Exercise type' },
    { key: 'exerciseMinutes', label: 'Exercise minutes' },
    { key: 'alcoholDrinks', label: 'Alcohol drinks' },
    { key: 'caffeineServings', label: 'Caffeine servings' },
    { key: 'smoked', label: 'Smoked' },
    { key: 'medications', label: 'Medications' },
    { key: 'weight', label: 'Weight' },
    { key: 'notes', label: 'Notes' },
  ]
  const rows = entries.slice().sort((a, b) => a.date.localeCompare(b.date)).map((e) => ({
    ...e,
    medications: (e.medications || []).map((m) => `${m.name} ${m.dose || ''} @ ${m.time || ''}`.trim()),
  }))
  download('gerd-lifestyle.csv', toCsv(rows, columns))
}

export function exportAllJson(state) {
  download('gerd-tracker-backup.json', JSON.stringify(state, null, 2), 'application/json')
}
