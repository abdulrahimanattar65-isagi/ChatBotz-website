import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

export default function HeroSmoke() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!hero || !context) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(any-pointer: fine)')
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 128
    const brush = sprite.getContext('2d')
    if (!brush) return
    const color = theme === 'light' ? '35, 35, 35' : '245, 245, 245'
    const gradient = brush.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, `rgba(${color}, 0.55)`)
    gradient.addColorStop(0.28, `rgba(${color}, 0.32)`)
    gradient.addColorStop(0.65, `rgba(${color}, 0.1)`)
    gradient.addColorStop(1, `rgba(${color}, 0)`)
    brush.fillStyle = gradient
    brush.fillRect(0, 0, 128, 128)
    let particles = []
    let previous = null
    let frame = 0
    let lastTime = 0
    let width = 0
    let height = 0
    let pixelRatio = 1
    let inView = true
    const allowed = () => !reducedMotion.matches && finePointer.matches && !document.hidden && inView
    const erase = () => {
      // Clear every backing pixel independently of the drawing transform.
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }
    const clear = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      previous = null
      particles = []
      erase()
    }
    const resize = () => {
      const bounds = hero.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.ceil(width * pixelRatio)
      canvas.height = Math.ceil(height * pixelRatio)
      clear()
    }
    const draw = (time) => {
      frame = 0
      if (!allowed()) { clear(); return }
      const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 1 / 60
      lastTime = time
      erase()
      particles = particles.filter((particle) => particle.age < particle.life)
      for (const particle of particles) {
        particle.age += elapsed
        const progress = Math.min(particle.age / particle.life, 1)
        // Curl and upward drift let each puff billow and disperse.
        particle.x += (particle.vx + Math.sin(particle.phase + progress * 5) * 28) * elapsed
        particle.y += (particle.vy - progress * 22) * elapsed
        particle.vx *= Math.exp(-elapsed * 1.8)
        const radius = particle.radius * (1 + progress * 2.8)
        context.globalAlpha = Math.min(particle.age / 0.1, 1) * (1 - progress) ** 1.7 * (theme === 'light' ? 0.19 : 0.27)
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.angle + progress * particle.spin)
        context.drawImage(sprite, -radius, -radius * 0.65, radius * 2, radius * 1.3)
        context.restore()
      }
      context.globalAlpha = 1
      if (particles.length) frame = window.requestAnimationFrame(draw)
      else lastTime = 0
    }
    const move = (event) => {
      if (!allowed() || event.pointerType === 'touch') return
      const bounds = hero.getBoundingClientRect()
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (point.x < 0 || point.y < 0 || point.x > width || point.y > height) {
        previous = null
        return
      }
      const distance = previous ? Math.hypot(point.x - previous.x, point.y - previous.y) : 0
      // Ignore tiny pointer jitter and avoid drawing a solid line across jumps.
      if (previous && distance < 5) return
      const origin = previous && distance < 160 ? previous : point
      const dx = point.x - origin.x
      const dy = point.y - origin.y
      const count = Math.min(5, Math.max(1, Math.ceil(Math.hypot(dx, dy) / 14)))
      for (let index = 0; index < count; index++) {
        const fraction = (index + 1) / count
        particles.push({
          x: origin.x + dx * fraction + (Math.random() - 0.5) * 12,
          y: origin.y + dy * fraction + (Math.random() - 0.5) * 12,
          vx: Math.max(-100, Math.min(100, dx * 2)) + (Math.random() - 0.5) * 30,
          vy: Math.max(-60, Math.min(60, dy)) - 12 - Math.random() * 15,
          radius: 22 + Math.random() * 19,
          angle: Math.random() * Math.PI,
          phase: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 2,
          age: 0,
          life: 1.3 + Math.random() * 1.2,
        })
      }
      // Keep drawing costs bounded during fast pointer movements.
      if (particles.length > 80) particles.splice(0, particles.length - 80)
      previous = point
      if (!frame) frame = window.requestAnimationFrame(draw)
    }
    const leave = () => { previous = null }
    const onPreferenceChange = () => { if (!allowed()) clear() }
    const observer = new ResizeObserver(resize)
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (!inView) clear()
    })
    resize()
    observer.observe(hero)
    visibility.observe(hero)
    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', leave, { passive: true })
    document.addEventListener('visibilitychange', onPreferenceChange)
    reducedMotion.addEventListener('change', onPreferenceChange)
    finePointer.addEventListener('change', onPreferenceChange)
    return () => {
      clear()
      observer.disconnect()
      visibility.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', leave)
      document.removeEventListener('visibilitychange', onPreferenceChange)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      finePointer.removeEventListener('change', onPreferenceChange)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="hero-smoke" aria-hidden="true" />
}
