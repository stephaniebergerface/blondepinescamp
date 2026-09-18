import { useState } from 'react'
import { Card, SectionTitle, Field, TextInput, TextArea, Chip, Button } from './ui'
import { MEAL_TYPES, TRIGGER_TAGS } from '../utils/constants'
import { todayISO, nowTime } from '../utils/date'

export default function MealForm({ initial, onSave, onCancel }) {
  const [date] = useState(initial?.date || todayISO())
  const [time, setTime] = useState(initial?.time || nowTime())
  const [mealType, setMealType] = useState(initial?.mealType || 'Breakfast')
  const [foods, setFoods] = useState(initial?.foods || '')
  const [portionSize, setPortionSize] = useState(initial?.portionSize || 'Normal')
  const [triggers, setTriggers] = useState(initial?.triggers || [])
  const [minutesBeforeLyingDown, setMinutesBeforeLyingDown] = useState(initial?.minutesBeforeLyingDown ?? '')
  const [notes, setNotes] = useState(initial?.notes || '')

  function toggleTrigger(t) {
    setTriggers((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  function handleSave() {
    if (!foods.trim()) return
    onSave({
      date,
      time,
      mealType,
      foods: foods.trim(),
      portionSize,
      triggers,
      minutesBeforeLyingDown: minutesBeforeLyingDown === '' ? null : Number(minutesBeforeLyingDown),
      notes: notes.trim(),
    })
  }

  return (
    <Card>
      <SectionTitle>Log a meal</SectionTitle>

      <Field label="Time">
        <TextInput type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </Field>

      <Field label="Meal type">
        <div className="flex flex-wrap gap-2">
          {MEAL_TYPES.map((t) => (
            <Chip key={t} label={t} selected={mealType === t} onClick={() => setMealType(t)} />
          ))}
        </div>
      </Field>

      <Field label="What did you eat/drink?">
        <TextArea rows={2} value={foods} onChange={(e) => setFoods(e.target.value)} placeholder="e.g. grilled chicken, rice, side salad" />
      </Field>

      <Field label="Portion size">
        <div className="flex gap-2">
          {['Small', 'Normal', 'Large'].map((p) => (
            <Chip key={p} label={p} selected={portionSize === p} onClick={() => setPortionSize(p)} />
          ))}
        </div>
      </Field>

      <Field label="Possible trigger ingredients" hint="Select all that apply">
        <div className="flex flex-wrap gap-2">
          {TRIGGER_TAGS.map((t) => (
            <Chip key={t} label={t} selected={triggers.includes(t)} onClick={() => toggleTrigger(t)} />
          ))}
        </div>
      </Field>

      <Field label="Minutes before lying down (optional)" hint="Lying down soon after eating is a common trigger">
        <TextInput
          type="number"
          min="0"
          value={minutesBeforeLyingDown}
          onChange={(e) => setMinutesBeforeLyingDown(e.target.value)}
          placeholder="e.g. 30"
        />
      </Field>

      <Field label="Notes (optional)">
        <TextArea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleSave} disabled={!foods.trim()}>
          Save meal
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
