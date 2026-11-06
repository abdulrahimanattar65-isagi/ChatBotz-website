import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="glass rounded-2xl">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-semibold text-ink">
            {it.q}
            <ChevronDown size={20} className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-6 pb-5 leading-relaxed text-neutral-400">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
