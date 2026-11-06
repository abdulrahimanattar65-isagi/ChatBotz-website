import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { LOGIN_URL, SIGNUP_URL } from '../config'

const main = [['Platform', '/platform'], ['Services', '/services'], ['Solutions', '/solutions'], ['How it works', '/how-it-works'], ['Features', '/features'], ['Pricing', '/pricing']]
const more = [['About us', '/about'], ['Contact', '/contact'], ['FAQ', '/faq']]
const link = ({ isActive }) => `text-sm font-medium transition hover:text-ink ${isActive ? 'text-ink' : 'text-neutral-400'}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false); setMenu(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'border-b border-ink/10 bg-surface-950/85 backdrop-blur-xl' : ''}`}>
      <div className="container-x flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {main.map(([l, to]) => <NavLink key={to} to={to} className={link}>{l}</NavLink>)}
          <div className="relative" onMouseLeave={() => setMenu(false)}>
            <button type="button" aria-expanded={menu} onClick={() => setMenu(!menu)} onMouseEnter={() => setMenu(true)} className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-ink">Company <ChevronDown size={15} /></button>
            {menu && (
              <div className="absolute right-0 top-full w-40 pt-2">
                <div className="glass rounded-xl bg-surface-900 p-2">
                  {more.map(([l, to]) => <NavLink key={to} to={to} className="block rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-ink/10 hover:text-ink">{l}</NavLink>)}
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 xl:flex">
            <a href={LOGIN_URL} className="px-3 text-sm font-semibold text-ink hover:text-neutral-100">Login</a>
            <a href={SIGNUP_URL} className="rounded-full button-primary px-5 py-2.5 text-sm font-semibold transition">Get started</a>
          </div>
          <button type="button" className="p-2 text-ink xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto pb-6 xl:hidden" aria-label="Mobile">
          {[...main, ...more].map(([l, to]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-lg px-3 py-3 font-medium ${isActive ? 'bg-ink/10 text-ink' : 'text-neutral-300'}`}>{l}</NavLink>)}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={LOGIN_URL} className="glass rounded-full py-3 text-center text-sm font-semibold text-ink">Login</a>
            <a href={SIGNUP_URL} className="rounded-full button-primary py-3 text-center text-sm font-semibold">Get started</a>
          </div>
        </nav>
      )}
    </header>
  )
}
