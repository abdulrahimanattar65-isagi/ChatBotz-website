import { motion, useReducedMotion } from 'framer-motion'

export function Section({ children, className = '', id }) {
  const reducedMotion = useReducedMotion()
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <motion.div className="container-x" initial={reducedMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </section>
  )
}

export function SectionHeading({ title, text, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-neutral-400">{text}</p>}
    </motion.div>
  )
}

export function PageHeader({ title, text }) {
  return (
    <header className="relative overflow-hidden pb-6 pt-36 sm:pt-44">
      <div className="container-x relative text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-400">{text}</p>
      </div>
    </header>
  )
}
