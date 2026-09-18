export function BarChart({ data, maxValue, height = 120, barColor = '#40654d', formatLabel }) {
  if (data.length === 0) return null
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((d, i) => {
        const h = max === 0 ? 0 : (d.value / max) * (height - 20)
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end min-w-0 group relative">
            <span className="text-[10px] text-brand-500 mb-0.5 hidden sm:block">
              {d.value > 0 ? d.value : ''}
            </span>
            <div
              className="w-full rounded-t-sm transition-all"
              style={{ height: `${Math.max(h, d.value > 0 ? 3 : 0)}px`, backgroundColor: d.color || barColor }}
              title={`${formatLabel ? formatLabel(d) : d.label}: ${d.value}`}
            />
            <span className="text-[9px] text-brand-400 mt-1 truncate w-full text-center">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export function HorizontalBarChart({ data, barColor = '#40654d' }) {
  if (data.length === 0) return null
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-brand-700 w-32 shrink-0 truncate">{d.label}</span>
          <div className="flex-1 h-4 bg-brand-50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color || barColor }}
            />
          </div>
          <span className="text-xs text-brand-500 w-6 text-right shrink-0">{d.value}</span>
        </div>
      ))}
    </div>
  )
}

export function severityToColor(value) {
  const palette = ['#c9dacf', '#fde68a', '#fbbf24', '#fb923c', '#f97316', '#ef4444']
  return palette[Math.max(0, Math.min(5, Math.round(value)))]
}
