import { motion } from 'framer-motion'
import { steps } from '../data/content'

export default function Steps() {
  return (
    <ol className="mx-auto max-w-3xl space-y-4">
      {steps.map((s, i) => (
        <motion.li key={s.title} className="card flex gap-5" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-ink">{i + 1}</span>
          <div><h3 className="text-lg font-semibold">{s.title}</h3><p className="mt-1 text-neutral-400">{s.text}</p></div>
        </motion.li>
      ))}
    </ol>
  )
}
