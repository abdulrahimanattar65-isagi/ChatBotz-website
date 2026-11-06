import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRobot() {
  const robotRef = useRef(null)
  const [atBottom, setAtBottom] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let frame = 0
    let idleTimer
    let previousY = window.scrollY
    const update = () => {
      frame = 0
      const robot = robotRef.current
      if (!robot) return
      const maximum = document.documentElement.scrollHeight - window.innerHeight
      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0
      const delta = window.scrollY - previousY
      previousY = window.scrollY
      robot.style.setProperty('--scroll-progress', progress)
      if (Math.abs(delta) > 1) {
        robot.dataset.direction = delta > 0 ? 'down' : 'up'
        robot.dataset.scrolling = 'true'
        window.clearTimeout(idleTimer)
        idleTimer = window.setTimeout(() => { robot.dataset.scrolling = 'false' }, 160)
      }
      setAtBottom(maximum > 0 && maximum - window.scrollY < 80)

      // Sample the page beneath the mascot, ignoring the mascot itself.
      const bounds = robot.getBoundingClientRect()
      const underneath = document.elementsFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
        .find((element) => !robot.contains(element) && element !== robot)
      let element = underneath
      while (element) {
        const color = window.getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number)
        if (color && (color.length === 3 || color[3] >= 0.8)) {
          const luminance = (color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722) / 255
          robot.dataset.surface = luminance > 0.5 ? 'light' : 'dark'
          break
        }
        element = element.parentElement
      }
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('themechange', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('themechange', schedule)
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.clearTimeout(idleTimer)
    }
  }, [pathname])

  const scroll = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: atBottom ? 0 : window.scrollY + window.innerHeight * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button ref={robotRef} type="button" className="scroll-robot" data-surface="dark" onClick={scroll} aria-label={atBottom ? 'Scroll back to top' : 'Scroll down the page'}>
      <span className="scroll-robot-tooltip">{atBottom ? 'Back to top?' : 'Let’s explore'}</span>
      <svg className="scroll-robot-art" viewBox="0 0 120 154" fill="none" aria-hidden="true">
        <ellipse className="robot-ground" cx="60" cy="147" rx="27" ry="4" />
        <g className="robot-body">
          <path className="robot-shell" d="M37 97C24 97 22 113 28 125L36 131M83 97C96 97 98 113 92 125L84 131" />
          <path className="robot-face" d="M40 94C31 102 31 118 37 134C42 146 78 146 83 134C89 118 89 102 80 94Z" strokeWidth="2.5" />
          <path className="robot-seam" d="M35 121Q60 133 85 121" />
          <circle className="robot-seam" cx="60" cy="112" r="12" strokeWidth="2" />
          <circle className="robot-progress-track" cx="60" cy="112" r="8" strokeWidth="2.5" />
          <circle className="robot-progress" cx="60" cy="112" r="8" pathLength="100" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-90 60 112)" />
        </g>
        <g className="robot-head">
          <path className="robot-seam" d="M60 20V10" strokeWidth="3" strokeLinecap="round" />
          <circle className="robot-shell" cx="60" cy="7" r="4" />
          <path className="robot-seam" d="M15 48V33M105 48V33" strokeWidth="3" strokeLinecap="round" />
          <rect className="robot-shell" x="9" y="43" width="14" height="33" rx="7" />
          <rect className="robot-shell" x="97" y="43" width="14" height="33" rx="7" />
          <path className="robot-shell" d="M60 17C30 17 15 34 15 60C15 86 30 96 60 96C90 96 105 86 105 60C105 34 90 17 60 17Z" />
          <path className="robot-face" d="M60 32C35 32 25 40 25 60C25 79 36 85 60 85C84 85 95 79 95 60C95 40 85 32 60 32Z" />
          <g className="robot-eyes"><circle className="robot-shell" cx="43" cy="58" r="8" /><circle className="robot-shell" cx="77" cy="58" r="8" /></g>
          <path className="robot-smile" d="M55 70Q60 75 65 70" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      </svg>
    </button>
  )
}
