export function todayISO() {
  return toISODate(new Date())
}

export function toISODate(d) {
  const yr = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${yr}-${mo}-${day}`
}

export function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return toISODate(d)
}

export function daysBetween(isoStart, isoEnd) {
  const start = new Date(isoStart + 'T00:00:00')
  const end = new Date(isoEnd + 'T00:00:00')
  return Math.round((end - start) / 86400000)
}

export function formatDateLong(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatDateShort(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function formatTime12(hhmm) {
  if (!hhmm) return ''
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

// Returns minutes between two HH:MM times, handling overnight wrap (bedtime -> waketime)
export function minutesBetweenTimes(start, end, overnight = false) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let startMin = sh * 60 + sm
  let endMin = eh * 60 + em
  if (overnight && endMin <= startMin) endMin += 24 * 60
  return endMin - startMin
}

export function nearestUpcomingSlot(checkInTimes) {
  const now = nowTime()
  const idx = checkInTimes.findIndex((t) => t >= now)
  return idx === -1 ? checkInTimes.length - 1 : idx
}
