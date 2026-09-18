import { Card, SectionTitle, Button, ProgressBar, EmptyState } from './ui'
import { todayISO, daysBetween, formatDateLong, formatTime12, formatDateShort } from '../utils/date'
import { SEVERITY_LABELS, CHECKIN_LABELS } from '../utils/constants'

export default function TodayView({ state, endDate, onLogSymptom, onLogMeal, onLogSleep, onLogLifestyle, onEditSymptom }) {
  const today = todayISO()
  const dayNumber = daysBetween(state.settings.startDate, today) + 1
  const totalDays = state.settings.durationWeeks * 7
  const clampedDay = Math.max(1, Math.min(dayNumber, totalDays))

  const todaySymptoms = state.symptomEntries.filter((e) => e.date === today)
  const todayMeals = state.meals.filter((e) => e.date === today).sort((a, b) => a.time.localeCompare(b.time))
  const todayLifestyle = state.lifestyle.find((e) => e.date === today)
  const recentSleep = state.sleep.slice().sort((a, b) => b.date.localeCompare(a.date))[0]

  const isProgramOver = today > endDate

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-brand-500">{formatDateLong(today)}</p>
            <p className="text-lg font-semibold text-brand-900">
              Day {clampedDay} of {totalDays}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-brand-500">Ends</p>
            <p className="text-sm font-medium text-brand-700">{formatDateShort(endDate)}</p>
          </div>
        </div>
        <ProgressBar fraction={clampedDay / totalDays} />
        {isProgramOver && (
          <p className="text-sm text-flare-600 mt-2 font-medium">
            Your tracking window has ended — check the Trends tab for your summary, or keep logging if you'd like more data.
          </p>
        )}
      </Card>

      <Card>
        <SectionTitle subtitle="Log symptoms at each check-in, even if you're feeling fine">
          Today's check-ins
        </SectionTitle>
        <div className="space-y-2">
          {state.settings.checkInTimes.map((time, i) => {
            const entry = todaySymptoms.find((e) => e.slot === i)
            return (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
                  entry ? 'bg-brand-50 border-brand-200' : 'bg-white border-dashed border-brand-300'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-brand-800">
                    {CHECKIN_LABELS[i] || `Check-in ${i + 1}`} <span className="text-brand-400 font-normal">· {formatTime12(time)}</span>
                  </p>
                  {entry && (
                    <p className="text-xs text-brand-600">
                      Severity: {SEVERITY_LABELS[entry.severity]}
                      {entry.types?.length ? ` · ${entry.types.join(', ')}` : ''}
                    </p>
                  )}
                </div>
                <Button
                  variant={entry ? 'secondary' : 'primary'}
                  onClick={() => (entry ? onEditSymptom(entry) : onLogSymptom(i))}
                >
                  {entry ? 'Edit' : 'Log'}
                </Button>
              </div>
            )
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Today's meals</SectionTitle>
          <Button variant="secondary" onClick={() => onLogMeal()}>
            + Add meal
          </Button>
        </div>
        {todayMeals.length === 0 ? (
          <EmptyState text="No meals logged yet today" />
        ) : (
          <div className="space-y-2">
            {todayMeals.map((m) => (
              <button
                key={m.id}
                onClick={() => onLogMeal(m)}
                className="w-full text-left rounded-xl bg-brand-50 px-3 py-2.5 hover:bg-brand-100 transition"
              >
                <p className="text-sm font-medium text-brand-800">
                  {m.mealType} <span className="text-brand-400 font-normal">· {formatTime12(m.time)}</span>
                </p>
                <p className="text-sm text-brand-600">{m.foods}</p>
                {m.triggers?.length > 0 && <p className="text-xs text-flare-600 mt-0.5">{m.triggers.join(', ')}</p>}
              </button>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Last night's sleep</SectionTitle>
          <Button
            variant="secondary"
            onClick={() => onLogSleep(recentSleep && recentSleep.date === today ? recentSleep : undefined)}
          >
            {recentSleep && recentSleep.date === today ? 'Edit' : '+ Add'}
          </Button>
        </div>
        {!recentSleep ? (
          <EmptyState text="No sleep logged yet" />
        ) : (
          <div className="rounded-xl bg-brand-50 px-3 py-2.5">
            <p className="text-sm font-medium text-brand-800">
              {formatTime12(recentSleep.bedtime)} → {formatTime12(recentSleep.waketime)} ({recentSleep.hoursSlept}h)
            </p>
            <p className="text-sm text-brand-600">
              Quality {recentSleep.quality}/5{recentSleep.nightSymptoms ? ' · Woke with reflux symptoms' : ''}
            </p>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>Lifestyle factors</SectionTitle>
          <Button variant="secondary" onClick={() => onLogLifestyle(todayLifestyle)}>
            {todayLifestyle ? 'Edit' : '+ Add'}
          </Button>
        </div>
        {!todayLifestyle ? (
          <EmptyState text="Not logged yet today" />
        ) : (
          <div className="rounded-xl bg-brand-50 px-3 py-2.5 text-sm text-brand-700 space-y-0.5">
            <p>Stress {todayLifestyle.stressLevel}/5</p>
            {todayLifestyle.exerciseType && (
              <p>
                Exercise: {todayLifestyle.exerciseType} ({todayLifestyle.exerciseMinutes || 0} min)
              </p>
            )}
            <p>
              Alcohol: {todayLifestyle.alcoholDrinks} · Caffeine: {todayLifestyle.caffeineServings}
              {todayLifestyle.smoked ? ' · Smoked' : ''}
            </p>
            {todayLifestyle.medications?.length > 0 && (
              <p>Meds: {todayLifestyle.medications.map((m) => m.name).join(', ')}</p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
