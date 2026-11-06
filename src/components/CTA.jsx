import Button from './Button'
import { SIGNUP_URL } from '../config'
import { Section } from './Section'

export default function CTA() {
  return (
    <Section className="!pt-0">
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface-800 px-6 py-14 text-center sm:px-12">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">Ready to automate your customer conversations?</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/85">Start on the Free plan and set up your first chatbot.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SIGNUP_URL} className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-surface-900 transition hover:bg-neutral-100">Get started</a>
          <Button to="/contact" variant="secondary" className="!border-ink/40">Contact us</Button>
        </div>
      </div>
    </Section>
  )
}
