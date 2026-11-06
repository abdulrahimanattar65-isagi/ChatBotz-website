import { motion } from 'framer-motion'
import { Inbox, Users, Workflow, BarChart3, Megaphone, Bot } from 'lucide-react'

const nav = [Inbox, Bot, Workflow, Users, Megaphone, BarChart3]
const bars = [40, 62, 48, 78, 58, 90, 70]
const chats = [['New enquiry', 'Asking about availability'], ['Follow-up', 'Waiting for reply'], ['Lead captured', 'Contact details saved']]

export default function DashboardMockup() {
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-glow" role="img" aria-label="Illustrative ChatBotz dashboard">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-3">
        {['bg-neutral-500', 'bg-neutral-400', 'bg-neutral-300'].map((c) => <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />)}
        <span className="ml-3 text-xs text-neutral-500">Dashboard (illustrative)</span>
      </div>
      <div className="flex">
        <div className="hidden w-14 flex-col items-center gap-4 border-r border-ink/10 py-5 sm:flex">
          {nav.map((Icon, i) => <Icon key={i} size={18} className={i === 0 ? 'text-neutral-400' : 'text-neutral-500'} />)}
        </div>
        <div className="flex-1 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3">
            {['Conversations', 'Leads', 'Replies'].map((l, i) => (
              <div key={l} className="rounded-xl bg-ink/5 p-3">
                <p className="text-[11px] text-neutral-400">{l}</p>
                <motion.div className="mt-2 h-2 rounded-full bg-brand-gradient" initial={{ width: 0 }} animate={{ width: `${[75, 50, 88][i]}%` }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-32 items-end gap-2 rounded-xl bg-ink/5 p-4">
            {bars.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t bg-gradient-to-t from-neutral-400 to-neutral-300" initial={{ height: 0 }}
                animate={{ height: [`${h}%`, `${Math.max(25, h - 18)}%`, `${h}%`] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }} />
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {chats.map(([a, b], i) => (
              <motion.li key={a} className="flex items-center gap-3 rounded-xl bg-ink/5 p-2.5" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.2 }}>
                <span className="h-8 w-8 rounded-full bg-brand-gradient opacity-80" />
                <span><span className="block text-xs font-semibold text-ink">{a}</span><span className="block text-[11px] text-neutral-400">{b}</span></span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
