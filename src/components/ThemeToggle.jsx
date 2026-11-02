import { SunIcon, MoonIcon } from './Icons'

function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span key={theme} className="theme-toggle__icon">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}

export default ThemeToggle
