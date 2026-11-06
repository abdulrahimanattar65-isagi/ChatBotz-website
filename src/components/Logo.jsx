import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="ChatBotz home">
      <svg viewBox="0 0 64 64" width="34" height="34" className="shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="16" className="fill-ink" />
        <path d="M18 22h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H32l-8 7v-7h-6a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" className="fill-canvas" />
        <circle cx="26" cy="33" r="2.5" className="fill-ink" />
        <circle cx="38" cy="33" r="2.5" className="fill-ink" />
      </svg>
      <span className="font-display text-xl font-bold text-ink">ChatBotz</span>
    </Link>
  )
}
