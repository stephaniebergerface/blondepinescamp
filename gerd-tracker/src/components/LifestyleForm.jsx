import { useState } from 'react'
import { Card, SectionTitle, Field, TextInput, TextArea, Chip, Button } from './ui'
import { todayISO } from '../utils/date'
import { makeId } from '../utils/id'

export default function LifestyleForm({ initial, onSave, onCancel }) {
  const [date] = useState(initial?.date || todayISO())
  const [stressLevel, setStressLevel] = useState(initial?.stressLevel ?? 3)
  const [exerciseType, setExerciseType] = useState(initial?.exerciseType || '')
  const [exerciseMinutes, setExerciseMinutes] = useState(initial?.exerciseMinutes ?? '')
  const [alcoholDrinks, setAlcoholDrinks] = useState(initial?.alcoholDrinks ?? 0)
  const [caffeineServings, setCaffeineServings] = useState(initial?.caffeineServings ?? 0)
  const [smoked, setSmoked] = useState(initial?.smoked ?? false)
  const [medications, setMedications] = useState(initial?.medications || [])
  const [weight, setWeight] = useState(initial?.weight ?? '')
  const [notes, setNotes] = useState(initial?.notes || '')

  const [medName, setMedName] = useState('')
  const [medDose, setMedDose] = useState('')
  const [medTime, setMedTime] = useState('')

  function addMedication() {
    if (!medName.trim()) return
    setMedications((prev) => [...prev, { id: makeId(), name: medName.trim(), dose: medDose.trim(), time: medTime }])
    setMedName('')
    setMedDose('')
    setMedTime('')
  }

  function removeMedication(id) {
    setMedications((prev) => prev.filter((m) => m.id !== id))
  }

  function handleSave() {
    onSave({
      date,
      stressLevel,
      exerciseType: exerciseType.trim(),
      exerciseMinutes: exerciseMinutes === '' ? null : Number(exerciseMinutes),
      alcoholDrinks: Number(alcoholDrinks),
      caffeineServings: Number(caffeineServings),
      smoked,
      medications,
      weight: weight === '' ? null : Number(weight),
      notes: notes.trim(),
    })
  }

  return (
    <Card>
      <SectionTitle>Log lifestyle factors</SectionTitle>

      <Field label="Stress level today">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((q) => (
            <Chip key={q} label={String(q)} selected={stressLevel === q} onClick={() => setStressLevel(q)} />
          ))}
        </div>
        <span className="block text-xs text-brand-500 mt-1">1 = very relaxed, 5 = very stressed</span>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Exercise type">
          <TextInput value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} placeholder="e.g. walk, yoga" />
        </Field>
        <Field label="Minutes">
          <TextInput type="number" min="0" value={exerciseMinutes} onChange={(e) => setExerciseMinutes(e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Alcoholic drinks">
          <TextInput type="number" min="0" value={alcoholDrinks} onChange={(e) => setAlcoholDrinks(e.target.value)} />
        </Field>
        <Field label="Caffeine servings">
          <TextInput type="number" min="0" value={caffeineServings} onChange={(e) => setCaffeineServings(e.target.value)} />
        </Field>
      </div>

      <Field label="Smoked / vaped today?">
        <div className="flex gap-2">
          <Chip label="Yes" selected={smoked === true} onClick={() => setSmoked(true)} />
          <Chip label="No" selected={smoked === false} onClick={() => setSmoked(false)} />
        </div>
      </Field>

      <Field label="Medications taken (GERD-related or otherwise)">
        <div className="space-y-2 mb-2">
          {medications.map((m) => (
            <div key={m.id} className="flex items-center justify-between bg-brand-50 rounded-lg px-3 py-2 text-sm">
              <span>
                {m.name} {m.dose && `• ${m.dose}`} {m.time && `• ${m.time}`}
              </span>
              <button type="button" onClick={() => removeMedication(m.id)} className="text-red-500 text-xs">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <TextInput value={medName} onChange={(e) => setMedName(e.target.value)} placeholder="Name (e.g. omeprazole)" />
          <TextInput value={medDose} onChange={(e) => setMedDose(e.target.value)} placeholder="Dose" className="max-w-[6rem]" />
          <TextInput type="time" value={medTime} onChange={(e) => setMedTime(e.target.value)} className="max-w-[7.5rem]" />
        </div>
        <Button variant="secondary" className="mt-2" onClick={addMedication}>
          Add medication
        </Button>
      </Field>

      <Field label="Weight (optional)">
        <TextInput type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>

      <Field label="Notes (optional)">
        <TextArea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleSave}>
          Save lifestyle log
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
