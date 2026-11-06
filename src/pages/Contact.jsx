import { useState } from 'react'
import SEO from '../components/SEO'
import { Section, PageHeader } from '../components/Section'
import { CONTACT_EMAIL } from '../config'

const field = 'w-full rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-ink placeholder-neutral-500 focus:border-neutral-400 focus:outline-none'

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    // No backend: opens the visitor's email app addressed to your configured contact email.
    const body = encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\n\n${f.message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('ChatBotz enquiry')}&body=${body}`
  }
  return (
    <>
      <SEO title="Contact" description="Contact the ChatBotz team with questions about the platform or pricing." path="/contact" />
      <PageHeader title="Contact us" text="Questions about ChatBotz or pricing? Send us a message." />
      <Section>
        <form onSubmit={submit} className="glass mx-auto max-w-xl space-y-4 rounded-2xl p-6 sm:p-8">
          <label className="block text-sm font-medium text-ink">Name<input required className={`${field} mt-1.5`} value={f.name} onChange={on('name')} autoComplete="name" /></label>
          <label className="block text-sm font-medium text-ink">Email<input required type="email" className={`${field} mt-1.5`} value={f.email} onChange={on('email')} autoComplete="email" /></label>
          <label className="block text-sm font-medium text-ink">Message<textarea required rows="5" className={`${field} mt-1.5`} value={f.message} onChange={on('message')} /></label>
          <button type="submit" className="w-full rounded-full button-primary py-3 font-semibold">Send message</button>
          <p className="text-center text-xs text-neutral-500">This opens your email app. You can also write to {CONTACT_EMAIL}.</p>
        </form>
      </Section>
    </>
  )
}
