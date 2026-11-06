import { Check } from 'lucide-react'
import { plans } from '../data/content'
import Button from './Button'
import { SIGNUP_URL } from '../config'

export default function PricingCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((p) => (
        <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.popular ? 'border-neutral-400 bg-ink/[0.07] shadow-glow' : 'border-ink/10 bg-ink/[0.04]'}`}>
          {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-ink">Most popular</span>}
          <h3 className="text-xl font-bold">{p.name}</h3>
          <p className="mt-1 min-h-[3rem] text-sm text-neutral-400">{p.note}</p>
          <p className="mt-4 font-display text-3xl font-extrabold text-ink">{p.price ?? 'Contact us'}</p>
          <ul className="my-6 flex-1 space-y-3 text-sm">
            {p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="shrink-0 text-neutral-100" aria-hidden="true" />{f}</li>)}
          </ul>
          {p.price === 'Free' || p.price === null && p.name !== 'Business'
            ? <Button href={SIGNUP_URL} variant={p.popular ? 'primary' : 'secondary'}>{p.cta}</Button>
            : <Button to="/contact" variant="secondary">{p.cta}</Button>}
        </div>
      ))}
    </div>
  )
}
