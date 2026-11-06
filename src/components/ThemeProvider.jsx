import { createContext, useContext, useLayoutEffect, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
    try { localStorage.setItem('chatbotz-theme', theme) } catch { /* Storage may be disabled. */ }
    window.dispatchEvent(new Event('themechange'))
  }, [theme])

  useEffect(() => {
    const sync = (event) => {
      if (event.key === 'chatbotz-theme') setTheme(event.newValue === 'light' ? 'light' : 'dark')
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
