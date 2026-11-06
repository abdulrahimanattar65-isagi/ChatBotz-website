import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value))

export default function HeroLiquid() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const context = canvas.getContext('2d')
    if (!context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(any-pointer: fine)')
    const buffer = document.createElement('canvas')
    const paint = buffer.getContext('2d')
    if (!paint) return
    let columns, rows, size, ink, nextInk, vx, vy, nextX, nextY, pressure, nextPressure, divergence, curl, image
    let frame = 0
    let previous = null
    let lastTime = 0
    let lastInput = 0
    let visible = true
    let pending = []
    const enabled = () => !reduced.matches && pointer.matches && visible && !document.hidden

    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      previous = null
      pending = []
      lastTime = 0
      for (const field of [ink, nextInk, vx, vy, nextX, nextY, pressure, nextPressure, divergence, curl]) field?.fill(0)
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
    const resize = () => {
      reset()
      const bounds = host.getBoundingClientRect()
      columns = Math.max(40, Math.min(240, Math.ceil(bounds.width / 5)))
      rows = Math.max(30, Math.ceil(columns * bounds.height / Math.max(bounds.width, 1)))
      size = columns * rows
      buffer.width = columns
      buffer.height = rows
      canvas.width = Math.ceil(bounds.width)
      canvas.height = Math.ceil(bounds.height)
      ;[ink, nextInk, vx, vy, nextX, nextY, pressure, nextPressure, divergence, curl] = Array.from({ length: 10 }, () => new Float32Array(size))
      image = paint.createImageData(columns, rows)
      for (let index = 0; index < size; index++) {
        image.data[index * 4] = image.data[index * 4 + 1] = image.data[index * 4 + 2] = theme === 'light' ? 0 : 235
      }
    }
    const sample = (field, x, y) => {
      x = clamp(x, 0, columns - 1.001)
      y = clamp(y, 0, rows - 1.001)
      const left = Math.floor(x), top = Math.floor(y)
      const fx = x - left, fy = y - top, offset = top * columns + left
      return (field[offset] * (1 - fx) + field[offset + 1] * fx) * (1 - fy)
        + (field[offset + columns] * (1 - fx) + field[offset + columns + 1] * fx) * fy
    }
    const splat = ({ x, y, dx, dy }) => {
      const radius = Math.max(3, columns * 0.022)
      const extent = Math.ceil(radius * 2)
      for (let py = Math.max(1, Math.floor(y - extent)); py < Math.min(rows - 1, y + extent); py++) {
        for (let px = Math.max(1, Math.floor(x - extent)); px < Math.min(columns - 1, x + extent); px++) {
          const offset = py * columns + px
          const weight = Math.exp(-((px - x) ** 2 + (py - y) ** 2) / (radius * radius))
          ink[offset] = Math.min(2, ink[offset] + weight * 0.6)
          // Tangential motion rolls the edges into small liquid curls.
          vx[offset] += weight * (dx * 12 - (py - y) * 3.2)
          vy[offset] += weight * (dy * 12 + (px - x) * 3.2)
        }
      }
    }
    const draw = (time) => {
      frame = 0
      if (!enabled()) { reset(); return }
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.032) : 1 / 60
      lastTime = time
      pending.splice(0).forEach(splat)
      // Advect the velocity field, then remove divergence to preserve fluid flow.
      for (let y = 1; y < rows - 1; y++) for (let x = 1; x < columns - 1; x++) {
        const i = y * columns + x
        const sx = x - vx[i] * dt, sy = y - vy[i] * dt
        nextX[i] = sample(vx, sx, sy) * Math.exp(-dt * 1.4)
        nextY[i] = sample(vy, sx, sy) * Math.exp(-dt * 1.4)
      }
      ;[vx, nextX] = [nextX, vx]
      ;[vy, nextY] = [nextY, vy]
      // Preserve the small vortices that give the trail its rolling, wispy edges.
      for (let y = 1; y < rows - 1; y++) for (let x = 1; x < columns - 1; x++) {
        const i = y * columns + x
        curl[i] = (vy[i + 1] - vy[i - 1] - vx[i + columns] + vx[i - columns]) * 0.5
      }
      for (let y = 2; y < rows - 2; y++) for (let x = 2; x < columns - 2; x++) {
        const i = y * columns + x
        const dx = Math.abs(curl[i + 1]) - Math.abs(curl[i - 1])
        const dy = Math.abs(curl[i + columns]) - Math.abs(curl[i - columns])
        const length = Math.hypot(dx, dy) + 0.0001
        const strength = clamp(curl[i] * 16, -160, 160) * dt
        vx[i] += dy / length * strength
        vy[i] -= dx / length * strength
      }
      pressure.fill(0)
      for (let y = 1; y < rows - 1; y++) for (let x = 1; x < columns - 1; x++) {
        const i = y * columns + x
        divergence[i] = (vx[i + 1] - vx[i - 1] + vy[i + columns] - vy[i - columns]) * 0.5
      }
      for (let iteration = 0; iteration < 8; iteration++) {
        for (let y = 1; y < rows - 1; y++) for (let x = 1; x < columns - 1; x++) {
          const i = y * columns + x
          nextPressure[i] = (pressure[i - 1] + pressure[i + 1] + pressure[i - columns] + pressure[i + columns] - divergence[i]) * 0.25
        }
        ;[pressure, nextPressure] = [nextPressure, pressure]
      }
      let peak = 0
      const decay = Math.exp(-dt * 0.85)
      for (let y = 1; y < rows - 1; y++) for (let x = 1; x < columns - 1; x++) {
        const i = y * columns + x
        vx[i] = clamp(vx[i] - (pressure[i + 1] - pressure[i - 1]) * 0.5, -120, 120)
        vy[i] = clamp(vy[i] - (pressure[i + columns] - pressure[i - columns]) * 0.5, -120, 120)
        nextInk[i] = sample(ink, x - vx[i] * dt, y - vy[i] * dt) * decay
        peak = Math.max(peak, nextInk[i])
      }
      ;[ink, nextInk] = [nextInk, ink]
      for (let i = 0; i < size; i++) {
        // Continuous density produces translucent ribbons instead of solid circles.
        const density = Math.max(0, ink[i] - 0.012)
        image.data[i * 4 + 3] = Math.round((1 - Math.exp(-density * 1.4)) * 0.68 * 255)
      }
      paint.putImageData(image, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(buffer, 0, 0, canvas.width, canvas.height)
      if (peak > 0.018 || time - lastInput < 100) frame = requestAnimationFrame(draw)
      else reset()
    }
    const move = (event) => {
      if (!enabled() || event.pointerType === 'touch') return
      const bounds = host.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width * columns
      const y = (event.clientY - bounds.top) / bounds.height * rows
      if (x < 0 || y < 0 || x > columns || y > rows) { previous = null; return }
      const dx = previous ? x - previous.x : 0
      const dy = previous ? y - previous.y : 0
      if (previous && Math.hypot(dx, dy) < 0.35) return
      const steps = previous ? Math.min(6, Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3))) : 1
      for (let step = 1; step <= steps; step++) {
        pending.push({ x: x - dx * (1 - step / steps), y: y - dy * (1 - step / steps), dx: clamp(dx, -15, 15), dy: clamp(dy, -15, 15) })
      }
      pending = pending.slice(-16)
      previous = { x, y }
      lastInput = performance.now()
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const leave = () => { previous = null }
    const preferenceChanged = () => { if (!enabled()) reset() }
    const observer = new ResizeObserver(resize)
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) reset() })
    resize()
    observer.observe(host)
    intersection.observe(host)
    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', leave, { passive: true })
    reduced.addEventListener('change', preferenceChanged)
    pointer.addEventListener('change', preferenceChanged)
    document.addEventListener('visibilitychange', preferenceChanged)
    return () => {
      reset()
      observer.disconnect()
      intersection.disconnect()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', leave)
      reduced.removeEventListener('change', preferenceChanged)
      pointer.removeEventListener('change', preferenceChanged)
      document.removeEventListener('visibilitychange', preferenceChanged)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="hero-liquid" aria-hidden="true" />
}
