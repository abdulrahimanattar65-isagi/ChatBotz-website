// Deterministic positions keep the backdrop stable across renders and routes.
const stars = Array.from({ length: 85 }, (_, index) => ({
  x: ((index * 137.508) % 1000),
  y: ((index * index * 29.31 + 53) % 800),
  radius: index % 9 === 0 ? 1.2 : 0.6,
  opacity: 0.15 + (index % 5) * 0.09,
}))

export default function StaticBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
        {stars.map((star, index) => <circle key={index} cx={star.x} cy={star.y} r={star.radius} fill="currentColor" opacity={star.opacity} />)}
      </svg>
    </div>
  )
}
