import { useEffect, useId, useRef } from 'react'

const eyes = [480, 705]

export default function HeroRobot() {
  const robotRef = useRef(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const robot = robotRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let pointer = null

    const update = () => {
      frame = 0
      const bounds = robot.getBoundingClientRect()
      let x = 0
      let y = 0
      if (pointer && !reduced.matches && !document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight) {
        const faceX = bounds.left + bounds.width * 0.5
        const faceY = bounds.top + bounds.height * (442 / 1328)
        const dx = (pointer.x - faceX) / Math.max(bounds.width * 0.5, window.innerWidth * 0.35)
        const dy = (pointer.y - faceY) / Math.max(bounds.height * 0.35, window.innerHeight * 0.35)
        const distance = Math.max(1, Math.hypot(dx, dy))
        x = dx / distance * 22
        y = dy / distance * 16
      }
      robot.style.setProperty('--eye-x', `${x}px`)
      robot.style.setProperty('--eye-y', `${y}px`)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    const move = (event) => {
      if (event.pointerType === 'touch') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const reset = () => { pointer = null; schedule() }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('blur', reset)
    document.documentElement.addEventListener('pointerleave', reset)
    document.addEventListener('visibilitychange', reset)
    reduced.addEventListener('change', reset)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('blur', reset)
      document.documentElement.removeEventListener('pointerleave', reset)
      document.removeEventListener('visibilitychange', reset)
      reduced.removeEventListener('change', reset)
    }
  }, [])

  return (
    <svg ref={robotRef} className="hero-robot-image" viewBox="0 0 1184 1328" width="1184" height="1328" role="img" aria-label="ChatBotz robot with friendly illuminated eyes that follow your cursor">
      <defs>
        <radialGradient id={`${id}-screen`}>
          <stop offset="0.72" stopColor="#080d13" />
          <stop offset="1" stopColor="#080d13" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-feather`}>
          <stop offset="0.83" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        {eyes.map((x, index) => (
          <mask key={x} id={`${id}-eye-${index}`} maskUnits="userSpaceOnUse" x={x - 76} y="362" width="152" height="160">
            <ellipse cx={x} cy="442" rx="76" ry="80" fill={`url(#${id}-feather)`} />
          </mask>
        ))}
      </defs>
      <image href="/images/chatbotz-robot-front.png" width="1184" height="1328" />
      {eyes.map((x, index) => (
        <g key={x} aria-hidden="true">
          <ellipse cx={x} cy="442" rx="102" ry="104" fill={`url(#${id}-screen)`} />
          <g className="hero-robot-eye">
            <image href="/images/chatbotz-robot-front.png" width="1184" height="1328" mask={`url(#${id}-eye-${index})`} />
          </g>
        </g>
      ))}
    </svg>
  )
}
