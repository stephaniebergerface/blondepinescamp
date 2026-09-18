import { useState } from 'react'
import { Card, SectionTitle, Field, TextInput, TextArea, Chip, SeverityScale, Button } from './ui'
import { SYMPTOM_TYPES, SEVERITY_LABELS } from '../utils/constants'
import { todayISO, nowTime } from '../utils/date'

export default function SymptomForm({ initial, slotIndex, slotLabel, onSave, onCancel }) {
  const [date] = useState(initial?.date || todayISO())
  const [time, setTime] = useState(initial?.time || nowTime())
  const [severity, setSeverity] = useState(initial?.severity ?? 0)
  const [types, setTypes] = useState(initial?.types || [])
  const [notes, setNotes] = useState(initial?.notes || '')

  function toggleType(t) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  function handleSave() {
    onSave({
      date,
      time,
      slot: slotIndex,
      severity,
      types,
      notes: notes.trim(),
    })
  }

  return (
    <Card>
      <SectionTitle subtitle={slotLabel ? `Check-in: ${slotLabel}` : undefined}>Log symptoms</SectionTitle>

      <Field label="Time">
        <TextInput type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </Field>

      <Field label="Overall severity right now">
        <SeverityScale value={severity} onChange={setSeverity} labels={SEVERITY_LABELS} />
      </Field>

      {severity > 0 && (
        <Field label="What are you feeling?" hint="Select all that apply">
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_TYPES.map((t) => (
              <Chip key={t} label={t} selected={types.includes(t)} onClick={() => toggleType(t)} />
            ))}
          </div>
        </Field>
      )}

      <Field label="Notes (optional)">
        <TextArea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything notable..." />
      </Field>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleSave}>
          Save entry
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
