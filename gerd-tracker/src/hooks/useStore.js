import { useEffect, useState, useCallback, useMemo } from 'react'
import { STORAGE_KEY, DEFAULT_CHECKIN_TIMES, DEFAULT_DURATION_WEEKS } from '../utils/constants'
import { todayISO, addDays } from '../utils/date'
import { makeId } from '../utils/id'

function emptyState() {
  return {
    settings: {
      startDate: todayISO(),
      durationWeeks: DEFAULT_DURATION_WEEKS,
      checkInTimes: [...DEFAULT_CHECKIN_TIMES],
      onboarded: false,
      reminderNote: '',
    },
    symptomEntries: [],
    meals: [],
    sleep: [],
    lifestyle: [],
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    return { ...emptyState(), ...parsed, settings: { ...emptyState().settings, ...parsed.settings } }
  } catch (e) {
    console.error('Failed to load stored data, starting fresh', e)
    return emptyState()
  }
}

export function useStore() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('Failed to persist data', e)
    }
  }, [state])

  const updateSettings = useCallback((patch) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
  }, [])

  const completeOnboarding = useCallback((patch) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch, onboarded: true } }))
  }, [])

  const addEntry = useCallback((collection, entry) => {
    setState((s) => ({
      ...s,
      [collection]: [...s[collection], { id: makeId(), createdAt: Date.now(), ...entry }],
    }))
  }, [])

  const updateEntry = useCallback((collection, id, patch) => {
    setState((s) => ({
      ...s,
      [collection]: s[collection].map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const deleteEntry = useCallback((collection, id) => {
    setState((s) => ({
      ...s,
      [collection]: s[collection].filter((e) => e.id !== id),
    }))
  }, [])

  const importState = useCallback((data) => {
    setState({ ...emptyState(), ...data, settings: { ...emptyState().settings, ...data.settings } })
  }, [])

  const resetAll = useCallback(() => {
    setState(emptyState())
  }, [])

  const endDate = useMemo(
    () => addDays(state.settings.startDate, state.settings.durationWeeks * 7),
    [state.settings.startDate, state.settings.durationWeeks]
  )

  return {
    state,
    endDate,
    updateSettings,
    completeOnboarding,
    addEntry,
    updateEntry,
    deleteEntry,
    importState,
    resetAll,
  }
}
