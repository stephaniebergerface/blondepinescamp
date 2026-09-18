import { useState, useMemo } from 'react'
import { Card, SectionTitle, Field, TextInput, TextArea, Chip, Button } from './ui'
import { todayISO, addDays, minutesBetweenTimes } from '../utils/date'

export default function SleepForm({ initial, onSave, onCancel }) {
  const [date] = useState(initial?.date || addDays(todayISO(), -1))
  const [bedtime, setBedtime] = useState(initial?.bedtime || '22:30')
  const [waketime, setWaketime] = useState(initial?.waketime || '07:00')
  const [quality, setQuality] = useState(initial?.quality ?? 3)
  const [headElevated, setHeadElevated] = useState(initial?.headElevated ?? false)
  const [nightSymptoms, setNightSymptoms] = useState(initial?.nightSymptoms ?? false)
  const [notes, setNotes] = useState(initial?.notes || '')

  const hoursSlept = useMemo(() => {
    const mins = minutesBetweenTimes(bedtime, waketime, true)
    return Math.round((mins / 60) * 10) / 10
  }, [bedtime, waketime])

  function handleSave() {
    onSave({
      date,
      bedtime,
      waketime,
      hoursSlept,
      quality,
      headElevated,
      nightSymptoms,
      notes: notes.trim(),
    })
  }

  return (
    <Card>
      <SectionTitle subtitle={`Night of ${date}`}>Log last night's sleep</SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Bedtime">
          <TextInput type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} />
        </Field>
        <Field label="Wake time">
          <TextInput type="time" value={waketime} onChange={(e) => setWaketime(e.target.value)} />
        </Field>
      </div>

      <p className="text-sm text-brand-600 -mt-2 mb-4">Approx. {hoursSlept} hours slept</p>

      <Field label="Sleep quality">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((q) => (
            <Chip key={q} label={String(q)} selected={quality === q} onClick={() => setQuality(q)} />
          ))}
        </div>
        <span className="block text-xs text-brand-500 mt-1">1 = very poor, 5 = excellent</span>
      </Field>

      <Field label="Head of bed elevated / wedge pillow used?">
        <div className="flex gap-2">
          <Chip label="Yes" selected={headElevated === true} onClick={() => setHeadElevated(true)} />
          <Chip label="No" selected={headElevated === false} onClick={() => setHeadElevated(false)} />
        </div>
      </Field>

      <Field label="Woke up due to reflux/heartburn?">
        <div className="flex gap-2">
          <Chip label="Yes" selected={nightSymptoms === true} onClick={() => setNightSymptoms(true)} />
          <Chip label="No" selected={nightSymptoms === false} onClick={() => setNightSymptoms(false)} />
        </div>
      </Field>

      <Field label="Notes (optional)">
        <TextArea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleSave}>
          Save sleep log
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Card>
  )
}
