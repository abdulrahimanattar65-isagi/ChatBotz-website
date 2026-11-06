import { Lightbulb, LightbulbOff } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
  const Icon = theme === 'light' ? Lightbulb : LightbulbOff
  return (
    <button type="button" onClick={toggleTheme} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:bg-ink/10" aria-label={label} title={label} aria-pressed={theme === 'light'}>
      <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
    </button>
  )
}
