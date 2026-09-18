import { useMemo } from 'react'
import { Card, SectionTitle, EmptyState } from './ui'
import { BarChart, HorizontalBarChart, severityToColor } from './charts'
import { daysBetween } from '../utils/date'

export default function TrendsView({ state }) {
  const { symptomEntries, meals, sleep } = state

  const stats = useMemo(() => {
    const daysWithData = new Set([
      ...symptomEntries.map((e) => e.date),
      ...meals.map((e) => e.date),
      ...sleep.map((e) => e.date),
    ])
    const avgSeverity = symptomEntries.length
      ? symptomEntries.reduce((sum, e) => sum + e.severity, 0) / symptomEntries.length
      : 0
    const symptomFreeCount = symptomEntries.filter((e) => e.severity === 0).length
    return {
      daysTracked: daysWithData.size,
      totalCheckIns: symptomEntries.length,
      avgSeverity: Math.round(avgSeverity * 10) / 10,
      symptomFreeRate: symptomEntries.length ? Math.round((symptomFreeCount / symptomEntries.length) * 100) : 0,
    }
  }, [symptomEntries, meals, sleep])

  const weeklyTrend = useMemo(() => {
    if (symptomEntries.length === 0) return []
    const byWeek = new Map()
    for (const e of symptomEntries) {
      const weekNum = Math.floor(daysBetween(state.settings.startDate, e.date) / 7)
      if (!byWeek.has(weekNum)) byWeek.set(weekNum, [])
      byWeek.get(weekNum).push(e.severity)
    }
    return Array.from(byWeek.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([week, severities]) => {
        const avg = severities.reduce((a, b) => a + b, 0) / severities.length
        return { label: `Wk ${week + 1}`, value: Math.round(avg * 10) / 10, color: severityToColor(avg) }
      })
  }, [symptomEntries, state.settings.startDate])

  const symptomFrequency = useMemo(() => {
    const counts = {}
    for (const e of symptomEntries) {
      for (const t of e.types || []) counts[t] = (counts[t] || 0) + 1
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value]) => ({ label, value }))
  }, [symptomEntries])

  const triggerCorrelation = useMemo(() => {
    const severityByDate = new Map()
    for (const e of symptomEntries) {
      const cur = severityByDate.get(e.date) ?? 0
      severityByDate.set(e.date, Math.max(cur, e.severity))
    }
    const byTrigger = new Map()
    for (const m of meals) {
      for (const t of m.triggers || []) {
        if (!byTrigger.has(t)) byTrigger.set(t, [])
        const sev = severityByDate.get(m.date)
        if (sev !== undefined) byTrigger.get(t).push(sev)
      }
    }
    return Array.from(byTrigger.entries())
      .filter(([, sevs]) => sevs.length >= 2)
      .map(([label, sevs]) => ({
        label,
        value: Math.round((sevs.reduce((a, b) => a + b, 0) / sevs.length) * 10) / 10,
        count: sevs.length,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [symptomEntries, meals])

  const sleepCorrelation = useMemo(() => {
    if (sleep.length === 0) return null
    const withReflux = sleep.filter((s) => s.nightSymptoms)
    const withoutReflux = sleep.filter((s) => !s.nightSymptoms)
    const avg = (arr, key) => (arr.length ? Math.round((arr.reduce((a, b) => a + b[key], 0) / arr.length) * 10) / 10 : null)
    return {
      qualityWithReflux: avg(withReflux, 'quality'),
      qualityWithoutReflux: avg(withoutReflux, 'quality'),
      nightsWithReflux: withReflux.length,
      totalNights: sleep.length,
    }
  }, [sleep])

  const hasAnyData = symptomEntries.length > 0 || meals.length > 0 || sleep.length > 0

  if (!hasAnyData) {
    return (
      <Card>
        <EmptyState text="Log a few days of data to see trends here" />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>Overview</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Days tracked" value={stats.daysTracked} />
          <Stat label="Symptom check-ins" value={stats.totalCheckIns} />
          <Stat label="Avg severity (0-5)" value={stats.avgSeverity} />
          <Stat label="Symptom-free check-ins" value={`${stats.symptomFreeRate}%`} />
        </div>
      </Card>

      {weeklyTrend.length > 0 && (
        <Card>
          <SectionTitle subtitle="Average symptom severity per week">Weekly trend</SectionTitle>
          <BarChart data={weeklyTrend} maxValue={5} />
        </Card>
      )}

      {symptomFrequency.length > 0 && (
        <Card>
          <SectionTitle subtitle="Most frequently logged symptoms">Common symptoms</SectionTitle>
          <HorizontalBarChart data={symptomFrequency} />
        </Card>
      )}

      {triggerCorrelation.length > 0 && (
        <Card>
          <SectionTitle subtitle="Avg. worst same-day symptom severity on days you ate this (min. 2 occurrences)">
            Possible food triggers
          </SectionTitle>
          <HorizontalBarChart data={triggerCorrelation.map((t) => ({ ...t, color: severityToColor(t.value) }))} />
          <p className="text-xs text-brand-400 mt-2">
            This is a rough correlation, not proof of causation — discuss patterns with your doctor.
          </p>
        </Card>
      )}

      {sleepCorrelation && sleepCorrelation.nightsWithReflux > 0 && (
        <Card>
          <SectionTitle>Sleep & nighttime reflux</SectionTitle>
          <p className="text-sm text-brand-700">
            {sleepCorrelation.nightsWithReflux} of {sleepCorrelation.totalNights} logged nights included waking due to reflux.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Stat label="Avg quality (reflux nights)" value={sleepCorrelation.qualityWithReflux ?? '—'} />
            <Stat label="Avg quality (other nights)" value={sleepCorrelation.qualityWithoutReflux ?? '—'} />
          </div>
        </Card>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-brand-50 rounded-xl px-3 py-2.5">
      <p className="text-xl font-semibold text-brand-900">{value}</p>
      <p className="text-xs text-brand-500">{label}</p>
    </div>
  )
}
