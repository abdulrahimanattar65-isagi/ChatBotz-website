import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

const script = [
  { from: 'user', text: 'Hi! Do you have tables free tonight?' },
  { from: 'bot', text: 'Hello! Yes, we can help. How many people will be dining?' },
  { from: 'user', text: 'Four of us, around 8 pm.' },
  { from: 'bot', text: 'Thanks! I have noted your request and passed it to our team to confirm.' },
]

export default function ChatDemo() {
  const [count, setCount] = useState(1)
  useEffect(() => {
    const id = setTimeout(() => setCount((c) => (c >= script.length ? 1 : c + 1)), count >= script.length ? 3500 : 1800)
    return () => clearTimeout(id)
  }, [count])
  const shown = script.slice(0, count)
  const typing = count < script.length && script[count].from === 'bot'

  return (
    <div className="glass w-full max-w-sm rounded-3xl p-4 shadow-glow" role="img" aria-label="Illustrative chatbot conversation">
      <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-ink"><Bot size={18} /></span>
        <div><p className="text-sm font-semibold text-ink">ChatBotz assistant</p><p className="text-xs text-neutral-300">Online</p></div>
      </div>
      <div className="flex min-h-[250px] flex-col gap-2.5 py-4">
        {shown.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.from === 'user' ? 'self-end bg-brand-gradient text-ink' : 'self-start bg-ink/10 text-neutral-100'}`}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1 self-start rounded-2xl bg-ink/10 px-4 py-3" aria-hidden="true">
            {[0, 1, 2].map((d) => <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-neutral-300" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} />)}
          </div>
        )}
      </div>
      <p className="text-center text-[11px] text-neutral-500">Illustrative demo</p>
    </div>
  )
}
