import { motion } from 'framer-motion'
import SocialIcon from './SocialIcon'

export default function FeatureGrid({ items, cols = 'lg:grid-cols-4' }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map(({ icon: Icon, title, text, socials }, i) => (
        <motion.article
          key={title} className="card"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06, duration: 0.45 }}
        >
          {socials ? <span className="mb-4 inline-flex h-11 items-center gap-1.5">{socials.map((brand) => <SocialIcon key={brand} brand={brand} size={36} />)}</span> : <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-ink"><Icon size={22} aria-hidden="true" /></span>}
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p>
        </motion.article>
      ))}
    </div>
  )
}
