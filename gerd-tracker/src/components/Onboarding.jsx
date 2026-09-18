import { useState } from 'react'
import { Card, Field, TextInput, Button, SectionTitle } from './ui'
import { DEFAULT_CHECKIN_TIMES, CHECKIN_LABELS } from '../utils/constants'
import { todayISO } from '../utils/date'

export default function Onboarding({ onComplete }) {
  const [startDate, setStartDate] = useState(todayISO())
  const [durationWeeks, setDurationWeeks] = useState(8)
  const [checkInTimes, setCheckInTimes] = useState([...DEFAULT_CHECKIN_TIMES])

  function updateTime(i, val) {
    const next = [...checkInTimes]
    next[i] = val
    setCheckInTimes(next)
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <SectionTitle subtitle="A few quick settings for your tracking window. You can change these later.">
          Set up your GERD tracker
        </SectionTitle>

        <Field label="Start date">
          <TextInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>

        <Field label="Tracking duration" hint="Most elimination/diagnostic periods run 6-8 weeks.">
          <div className="flex gap-2">
            {[6, 7, 8].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setDurationWeeks(w)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium ${
                  durationWeeks === w
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-brand-700 border-brand-200'
                }`}
              >
                {w} weeks
              </button>
            ))}
          </div>
        </Field>

        <Field label="Daily symptom check-in times" hint="5 check-ins spread across the day works well; adjust to fit your schedule.">
          <div className="space-y-2">
            {checkInTimes.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-brand-600 w-28 shrink-0">{CHECKIN_LABELS[i]}</span>
                <TextInput type="time" value={t} onChange={(e) => updateTime(i, e.target.value)} />
              </div>
            ))}
          </div>
        </Field>

        <Button
          className="w-full mt-2"
          onClick={() => onComplete({ startDate, durationWeeks, checkInTimes })}
        >
          Start tracking
        </Button>
      </Card>
    </div>
  )
}
