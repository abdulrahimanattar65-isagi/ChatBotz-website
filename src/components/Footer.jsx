import { Link } from 'react-router-dom'
import Logo from './Logo'
import { LOGIN_URL, SIGNUP_URL, CONTACT_EMAIL } from '../config'

const cols = [
  ['Product', [['Platform', '/platform'], ['Services', '/services'], ['Features', '/features'], ['Pricing', '/pricing']]],
  ['Explore', [['Solutions', '/solutions'], ['How it works', '/how-it-works'], ['FAQ', '/faq']]],
  ['Company', [['About us', '/about'], ['Contact', '/contact']]],
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/10 bg-surface-900/50">
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-neutral-400">AI chatbots and messaging automation for businesses.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block text-sm text-neutral-100 hover:underline">{CONTACT_EMAIL}</a>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}>
            <h3 className="mb-4 text-sm font-semibold">{h}</h3>
            <ul className="space-y-2.5 text-sm">{links.map(([l, to]) => <li key={to}><Link to={to} className="text-neutral-400 hover:text-ink">{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col items-center justify-between gap-3 border-t border-ink/10 py-6 text-sm text-neutral-500 sm:flex-row">
        <p>© {new Date().getFullYear()} ChatBotz. All rights reserved.</p>
        <div className="flex gap-5"><a href={LOGIN_URL} className="hover:text-ink">Login</a><a href={SIGNUP_URL} className="hover:text-ink">Get started</a></div>
      </div>
    </footer>
  )
}
