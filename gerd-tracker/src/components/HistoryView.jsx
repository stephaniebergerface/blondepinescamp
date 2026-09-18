import { useMemo, useState } from 'react'
import { Card, SectionTitle, Chip, Button, EmptyState } from './ui'
import { formatDateLong, formatTime12 } from '../utils/date'
import { CHECKIN_LABELS, SEVERITY_LABELS } from '../utils/constants'

const FILTERS = ['All', 'Symptoms', 'Meals', 'Sleep', 'Lifestyle']

export default function HistoryView({ state, onEdit, onDelete }) {
  const [filter, setFilter] = useState('All')

  const items = useMemo(() => {
    const all = [
      ...state.symptomEntries.map((e) => ({ ...e, kind: 'Symptoms', sortKey: e.date + (e.time || '') })),
      ...state.meals.map((e) => ({ ...e, kind: 'Meals', sortKey: e.date + (e.time || '') })),
      ...state.sleep.map((e) => ({ ...e, kind: 'Sleep', sortKey: e.date + '23:59' })),
      ...state.lifestyle.map((e) => ({ ...e, kind: 'Lifestyle', sortKey: e.date + '23:58' })),
    ]
    const filtered = filter === 'All' ? all : all.filter((e) => e.kind === filter)
    return filtered.sort((a, b) => b.sortKey.localeCompare(a.sortKey))
  }, [state, filter])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const item of items) {
      if (!map.has(item.date)) map.set(item.date, [])
      map.get(item.date).push(item)
    }
    return Array.from(map.entries())
  }, [items])

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>History</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip key={f} label={f} selected={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
      </Card>

      {grouped.length === 0 && (
        <Card>
          <EmptyState text="Nothing logged yet" />
        </Card>
      )}

      {grouped.map(([date, entries]) => (
        <Card key={date}>
          <p className="text-sm font-semibold text-brand-800 mb-2">{formatDateLong(date)}</p>
          <div className="space-y-2">
            {entries.map((item) => (
              <HistoryRow key={`${item.kind}-${item.id}`} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

function HistoryRow({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-xl bg-brand-50 px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-brand-500 font-medium">{item.kind}</p>
        <RowSummary item={item} />
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" onClick={() => onEdit(item)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(item)}>
          Delete
        </Button>
      </div>
    </div>
  )
}

function RowSummary({ item }) {
  if (item.kind === 'Symptoms') {
    return (
      <p className="text-sm text-brand-800">
        {CHECKIN_LABELS[item.slot] || 'Check-in'} · {formatTime12(item.time)} · {SEVERITY_LABELS[item.severity]}
        {item.types?.length ? ` · ${item.types.join(', ')}` : ''}
      </p>
    )
  }
  if (item.kind === 'Meals') {
    return (
      <p className="text-sm text-brand-800">
        {item.mealType} · {formatTime12(item.time)} · {item.foods}
      </p>
    )
  }
  if (item.kind === 'Sleep') {
    return (
      <p className="text-sm text-brand-800">
        {formatTime12(item.bedtime)} → {formatTime12(item.waketime)} ({item.hoursSlept}h) · Quality {item.quality}/5
      </p>
    )
  }
  return (
    <p className="text-sm text-brand-800">
      Stress {item.stressLevel}/5 · Alcohol {item.alcoholDrinks} · Caffeine {item.caffeineServings}
    </p>
  )
}
