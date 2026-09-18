import { useRef, useState } from 'react'
import { Card, SectionTitle, Field, TextInput, Button } from './ui'
import { CHECKIN_LABELS } from '../utils/constants'
import { exportSymptomsCsv, exportMealsCsv, exportSleepCsv, exportLifestyleCsv, exportAllJson } from '../utils/csv'

export default function SettingsView({ state, endDate, updateSettings, importState, resetAll }) {
  const fileInputRef = useRef(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [importMessage, setImportMessage] = useState('')

  function handleTimeChange(i, val) {
    const next = [...state.settings.checkInTimes]
    next[i] = val
    updateSettings({ checkInTimes: next })
  }

  function handleImportFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (!data.settings) throw new Error('Not a valid backup file')
        importState(data)
        setImportMessage('Backup restored successfully.')
      } catch (err) {
        setImportMessage('Could not import that file — is it a GERD Tracker backup JSON?')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>Tracking window</SectionTitle>
        <Field label="Start date">
          <TextInput
            type="date"
            value={state.settings.startDate}
            onChange={(e) => updateSettings({ startDate: e.target.value })}
          />
        </Field>
        <Field label="Duration">
          <div className="flex gap-2">
            {[6, 7, 8].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => updateSettings({ durationWeeks: w })}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium ${
                  state.settings.durationWeeks === w
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-brand-700 border-brand-200'
                }`}
              >
                {w} weeks
              </button>
            ))}
          </div>
        </Field>
        <p className="text-sm text-brand-600">Ends {endDate}</p>
      </Card>

      <Card>
        <SectionTitle>Daily check-in times</SectionTitle>
        <div className="space-y-2">
          {state.settings.checkInTimes.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-brand-600 w-28 shrink-0">{CHECKIN_LABELS[i]}</span>
              <TextInput type="time" value={t} onChange={(e) => handleTimeChange(i, e.target.value)} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle subtitle="Download CSV files to share with your doctor or open in a spreadsheet">
          Export data
        </SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => exportSymptomsCsv(state.symptomEntries, CHECKIN_LABELS)}>
            Symptoms CSV
          </Button>
          <Button variant="secondary" onClick={() => exportMealsCsv(state.meals)}>
            Meals CSV
          </Button>
          <Button variant="secondary" onClick={() => exportSleepCsv(state.sleep)}>
            Sleep CSV
          </Button>
          <Button variant="secondary" onClick={() => exportLifestyleCsv(state.lifestyle)}>
            Lifestyle CSV
          </Button>
        </div>
        <Button className="w-full mt-2" onClick={() => exportAllJson(state)}>
          Download full backup (JSON)
        </Button>
      </Card>

      <Card>
        <SectionTitle subtitle="Restore all data from a previously downloaded backup file. This replaces what's currently stored.">
          Import backup
        </SectionTitle>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportFile}
          className="hidden"
        />
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
          Choose backup file...
        </Button>
        {importMessage && <p className="text-sm text-brand-600 mt-2">{importMessage}</p>}
      </Card>

      <Card>
        <SectionTitle subtitle="This stores everything only on this device, in this browser. Export a backup regularly, especially before clearing browser data.">
          About your data
        </SectionTitle>
        <p className="text-sm text-brand-600">
          Nothing is sent to a server — all entries live in this browser's local storage.
        </p>
      </Card>

      <Card>
        <SectionTitle>Danger zone</SectionTitle>
        {!confirmReset ? (
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            Erase all data
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-red-600">
              This permanently deletes all logged entries and settings on this device. Export a backup first if you want to keep it.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" onClick={resetAll}>
                Yes, erase everything
              </Button>
              <Button variant="secondary" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
