import { useState } from 'react'
import { useStore } from './hooks/useStore'
import Onboarding from './components/Onboarding'
import TodayView from './components/TodayView'
import HistoryView from './components/HistoryView'
import TrendsView from './components/TrendsView'
import SettingsView from './components/SettingsView'
import SymptomForm from './components/SymptomForm'
import MealForm from './components/MealForm'
import SleepForm from './components/SleepForm'
import LifestyleForm from './components/LifestyleForm'
import { CHECKIN_LABELS } from './utils/constants'

const TABS = [
  { key: 'today', label: 'Today', icon: '☀️' },
  { key: 'history', label: 'History', icon: '📋' },
  { key: 'trends', label: 'Trends', icon: '📈' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
]

const COLLECTION_BY_KIND = {
  Symptoms: 'symptomEntries',
  Meals: 'meals',
  Sleep: 'sleep',
  Lifestyle: 'lifestyle',
}

export default function App() {
  const { state, endDate, updateSettings, completeOnboarding, addEntry, updateEntry, deleteEntry, importState, resetAll } =
    useStore()
  const [tab, setTab] = useState('today')
  const [activeSheet, setActiveSheet] = useState(null)

  if (!state.settings.onboarded) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  function closeSheet() {
    setActiveSheet(null)
  }

  function openNewSymptom(slotIndex) {
    setActiveSheet({ kind: 'Symptoms', mode: 'create', slotIndex })
  }

  function openEditItem(item) {
    setActiveSheet({ kind: item.kind, mode: 'edit', item })
  }

  function handleDelete(item) {
    if (confirm('Delete this entry?')) {
      deleteEntry(COLLECTION_BY_KIND[item.kind], item.id)
    }
  }

  function handleSave(kind, data) {
    const collection = COLLECTION_BY_KIND[kind]
    if (activeSheet?.mode === 'edit') {
      updateEntry(collection, activeSheet.item.id, data)
    } else {
      addEntry(collection, data)
    }
    closeSheet()
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-24">
      <header className="bg-brand-700 text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-semibold">GERD Tracker</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {tab === 'today' && (
          <TodayView
            state={state}
            endDate={endDate}
            onLogSymptom={openNewSymptom}
            onEditSymptom={(entry) => openEditItem({ ...entry, kind: 'Symptoms' })}
            onLogMeal={(item) => (item ? openEditItem({ ...item, kind: 'Meals' }) : setActiveSheet({ kind: 'Meals', mode: 'create' }))}
            onLogSleep={(item) => (item ? openEditItem({ ...item, kind: 'Sleep' }) : setActiveSheet({ kind: 'Sleep', mode: 'create' }))}
            onLogLifestyle={(item) =>
              item ? openEditItem({ ...item, kind: 'Lifestyle' }) : setActiveSheet({ kind: 'Lifestyle', mode: 'create' })
            }
          />
        )}
        {tab === 'history' && <HistoryView state={state} onEdit={openEditItem} onDelete={handleDelete} />}
        {tab === 'trends' && <TrendsView state={state} />}
        {tab === 'settings' && (
          <SettingsView
            state={state}
            endDate={endDate}
            updateSettings={updateSettings}
            importState={importState}
            resetAll={resetAll}
          />
        )}
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-brand-100 flex z-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex flex-col items-center py-2.5 text-xs font-medium ${
              tab === t.key ? 'text-brand-700' : 'text-brand-400'
            }`}
          >
            <span className="text-lg leading-none mb-0.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {activeSheet && (
        <div className="fixed inset-0 bg-black/40 z-20 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-transparent w-full max-w-lg max-h-[92vh] overflow-y-auto">
            {activeSheet.kind === 'Symptoms' && (
              <SymptomForm
                initial={activeSheet.item}
                slotIndex={activeSheet.item?.slot ?? activeSheet.slotIndex}
                slotLabel={CHECKIN_LABELS[activeSheet.item?.slot ?? activeSheet.slotIndex]}
                onSave={(data) => handleSave('Symptoms', data)}
                onCancel={closeSheet}
              />
            )}
            {activeSheet.kind === 'Meals' && (
              <MealForm initial={activeSheet.item} onSave={(data) => handleSave('Meals', data)} onCancel={closeSheet} />
            )}
            {activeSheet.kind === 'Sleep' && (
              <SleepForm initial={activeSheet.item} onSave={(data) => handleSave('Sleep', data)} onCancel={closeSheet} />
            )}
            {activeSheet.kind === 'Lifestyle' && (
              <LifestyleForm
                initial={activeSheet.item}
                onSave={(data) => handleSave('Lifestyle', data)}
                onCancel={closeSheet}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
