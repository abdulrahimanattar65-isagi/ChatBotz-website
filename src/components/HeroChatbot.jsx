import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Bot, Check, ChevronDown, Mail, MessageSquare, MoreHorizontal, Pause, Play, Sparkles } from 'lucide-react'
import SocialIcon from './SocialIcon'

const channels = [
  { name: 'WhatsApp', brand: 'whatsapp' },
  { name: 'Instagram', brand: 'instagram' },
  { name: 'Messenger', brand: 'messenger' },
  { name: 'Email', Icon: Mail },
  { name: 'SMS', Icon: MessageSquare },
  { name: 'Telegram', brand: 'telegram' },
]

export default function HeroChatbot() {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [step, setStep] = useState(0)
  const messagesRef = useRef(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const timer = window.setInterval(() => setStep((current) => (current + 1) % 5), 2200)
    return () => window.clearInterval(timer)
  }, [paused, reduced])

  const visible = reduced ? 4 : step

  useEffect(() => {
    const messages = messagesRef.current
    if (messages) messages.scrollTop = visible === 0 ? 0 : messages.scrollHeight
  }, [visible])

  return (
    <div className={`hero-chatbot ${paused || reduced ? 'is-paused' : ''}`}>
      <div className="hero-demo-toolbar">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Bot size={18} /> ChatBotz <span className="ml-2 hidden font-normal text-neutral-500 sm:inline">/ Unified workspace</span></div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs text-neutral-400 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-ink" /> Interactive preview</span>
          <button type="button" className="rounded-lg p-2 text-neutral-400 transition hover:bg-ink/10 hover:text-ink" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play chatbot animation' : 'Pause chatbot animation'} aria-pressed={paused} disabled={reduced}>
            {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>

      <div className="hero-demo-body">
        <div className="hero-flow" role="img" aria-label="WhatsApp, Instagram, Messenger, email, SMS and Telegram messages flow into one AI assistant">
          <div className="hero-flow-heading"><span className="hero-eyebrow">EVERY CHANNEL. ONE ASSISTANT.</span><p>Meet your always-on teammate.</p></div>
          <svg className="hero-flow-lines" viewBox="0 0 600 360" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {channels.map(({ name }, index) => {
              const path = `M 168 ${42 + index * 55} C 305 ${42 + index * 55}, 310 180, 437 180`
              return <g key={name}><path d={path} stroke="currentColor" strokeOpacity="0.12" /><path d={path} pathLength="100" className="hero-flow-particle" style={{ animationDelay: `${index * -0.7}s` }} /></g>
            })}
            <path d="M 493 180 H 600" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="4 5" />
            <path d="m 588 175 6 5-6 5" stroke="currentColor" strokeOpacity="0.6" />
          </svg>
          <div className="hero-channel-list">
            {channels.map(({ name, Icon, brand }, index) => <div key={name} className="hero-channel" style={{ '--channel-delay': `${index * 0.65}s` }}><span>{name}</span><span className="hero-channel-icon">{brand ? <SocialIcon brand={brand} /> : <Icon size={21} strokeWidth={1.6} />}</span></div>)}
          </div>
          <div className="hero-bot-node">
            <div className="hero-bot-orbit" />
            <div className="hero-bot-face"><Bot size={46} strokeWidth={1.35} /><span className="hero-bot-spark"><Sparkles size={13} /></span></div>
            <span className="mt-4 text-sm font-semibold text-ink">ChatBotz AI</span>
            <span className="mt-1 text-[11px] text-neutral-500">Understands. Replies. Connects.</span>
          </div>
          <div className="hero-flow-caption"><span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink/20"><Check size={11} /></span> Connected conversations. Effortless replies.</div>
        </div>

        <div className="hero-conversation">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <div className="flex items-center gap-3"><SocialIcon brand="whatsapp" size={36} /><div><p className="text-sm font-semibold text-ink">Alex Morgan</p><p className="mt-0.5 text-[11px] text-neutral-500">WhatsApp · New conversation</p></div></div>
            <MoreHorizontal size={18} className="text-neutral-500" />
          </div>
          <div ref={messagesRef} className="hero-messages" aria-label="Illustrative automated conversation">
            <p className="mb-5 text-center text-[10px] text-neutral-500">TODAY</p>
            <div className="hero-message hero-message-customer">Hi! Can I book a demo for my team?<span>Just now</span></div>
            {visible >= 1 && <div className="hero-message hero-message-assistant"><span className="hero-assistant-label"><Sparkles size={11} /> ChatBotz AI</span>Of course! I can help with that. How many people are on your team?<span>Just now <Check size={10} /></span></div>}
            {visible >= 2 && <div className="hero-message hero-message-customer">There are 12 of us. Tomorrow works!</div>}
            {visible >= 3 && <div className="hero-message hero-message-assistant">Perfect. I’ve passed your request to our team. They’ll confirm a time with you.<span>Just now <Check size={10} /></span></div>}
            {visible < 3 && <div className="hero-typing" aria-label="Assistant typing"><span /><span /><span /></div>}
            {visible >= 4 && <div className="hero-lead-saved"><Check size={12} /> Lead captured · Team notified</div>}
          </div>
          <div className="hero-composer"><span>AI is taking care of the conversation</span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-canvas"><ArrowUp size={14} /></span></div>
        </div>
      </div>
      <div className="hero-demo-footer"><span className="flex items-center gap-2"><Sparkles size={12} /> Built for conversations that move your business forward.</span><span className="hidden items-center gap-1 sm:flex">Illustrative demo <ChevronDown size={12} /></span></div>
    </div>
  )
}
