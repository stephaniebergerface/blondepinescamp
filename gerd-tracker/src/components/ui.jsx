export function Card({ children, className = '' }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-brand-100 p-4 ${className}`}>{children}</div>
}

export function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-brand-900">{children}</h2>
      {subtitle && <p className="text-sm text-brand-600">{subtitle}</p>}
    </div>
  )
}

export function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled }) {
  const base = 'px-4 py-2.5 rounded-xl font-medium text-sm transition active:scale-[0.98] disabled:opacity-50'
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-brand-100 text-brand-800 hover:bg-brand-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    ghost: 'text-brand-700 hover:bg-brand-50',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition ${
        selected
          ? 'bg-brand-600 text-white border-brand-600'
          : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
      }`}
    >
      {label}
    </button>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-brand-800 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-brand-500 mt-1">{hint}</span>}
    </label>
  )
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-brand-200 px-3 py-2.5 text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 ${props.className || ''}`}
    />
  )
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-brand-200 px-3 py-2.5 text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 ${props.className || ''}`}
    />
  )
}

export function SeverityScale({ value, onChange, labels }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(i)}
          className={`flex-1 min-w-[3.2rem] py-2.5 rounded-xl text-xs font-medium border transition ${
            value === i
              ? severityColor(i, true)
              : `bg-white text-brand-600 border-brand-200`
          }`}
        >
          <div className="text-base leading-none mb-0.5">{i}</div>
          {label}
        </button>
      ))}
    </div>
  )
}

export function severityColor(i, selected) {
  const palette = [
    'bg-brand-100 text-brand-800 border-brand-300',
    'bg-yellow-100 text-yellow-800 border-yellow-300',
    'bg-amber-200 text-amber-900 border-amber-400',
    'bg-orange-300 text-orange-950 border-orange-400',
    'bg-orange-400 text-white border-orange-500',
    'bg-red-500 text-white border-red-600',
  ]
  return selected ? palette[i] : ''
}

export function ProgressBar({ fraction }) {
  const pct = Math.max(0, Math.min(1, fraction)) * 100
  return (
    <div className="w-full h-2.5 bg-brand-100 rounded-full overflow-hidden">
      <div className="h-full bg-flare-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function EmptyState({ text }) {
  return <p className="text-sm text-brand-500 italic py-6 text-center">{text}</p>
}
