import { useId } from 'react'

const backgrounds = {
  whatsapp: '#25D366',
  facebook: '#0866FF',
  telegram: '#26A5E4',
}

export default function SocialIcon({ brand, size = 38 }) {
  const gradientId = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0" aria-hidden="true">
      <defs>
        {brand === 'instagram' && <linearGradient id={gradientId} x1="0" y1="32" x2="30" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#FEDA75" /><stop offset=".28" stopColor="#FA7E1E" /><stop offset=".55" stopColor="#D62976" /><stop offset=".8" stopColor="#962FBF" /><stop offset="1" stopColor="#4F5BD5" /></linearGradient>}
        {brand === 'messenger' && <linearGradient id={gradientId} x1="6" y1="30" x2="25" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#0099FF" /><stop offset=".55" stopColor="#A033FF" /><stop offset="1" stopColor="#FF5280" /></linearGradient>}
      </defs>
      <rect width="32" height="32" rx="9" fill={backgrounds[brand] || `url(#${gradientId})`} />
      {brand === 'whatsapp' && <>
        <path d="M24.5 15.5a8.5 8.5 0 0 1-12.7 7.4L7 24.5l1.5-4.8A8.5 8.5 0 1 1 24.5 15.5Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m12.8 10.7 1.2 2.5-.9 1.2c.9 1.8 2.3 3.1 4.1 3.9l1.2-1 2.4 1.2c.4.2.5.5.3.9-.5 1.3-1.5 1.9-2.8 1.6-4.3-.9-7.8-4.4-8.5-7.9-.3-1.2.2-2.1 1.4-2.7.7-.3 1.3-.2 1.6.3Z" fill="#fff" />
      </>}
      {brand === 'instagram' && <><rect x="7.5" y="7.5" width="17" height="17" rx="5" stroke="#fff" strokeWidth="2" /><circle cx="16" cy="16" r="4" stroke="#fff" strokeWidth="2" /><circle cx="21.4" cy="10.8" r="1.2" fill="#fff" /></>}
      {brand === 'facebook' && <path d="M18.3 27V17.1h3.3l.5-3.8h-3.8v-2.4c0-1.1.3-1.8 1.9-1.8h2V5.7c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.1v2.7H11v3.8h3.2V27h4.1Z" fill="#fff" />}
      {brand === 'messenger' && <><path d="M16 6C10.4 6 6 10.1 6 15.4c0 2.8 1.2 5.2 3.3 6.9V26l3.5-1.9c1 .3 2.1.5 3.2.5 5.6 0 10-4.1 10-9.2S21.6 6 16 6Z" fill="#fff" /><path d="m10.1 18.6 5.1-5.5 3.2 2.4 3.5-2.3-5.1 5.5-3.2-2.4-3.5 2.3Z" fill="#8B46FF" /></>}
      {brand === 'telegram' && <><path d="m6.6 15 17.5-6.8c.8-.3 1.4.2 1.1 1.3l-3 14.1c-.2 1-1 1.2-1.7.6l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.8.4l.3-4.7 8.6-7.7c.4-.3-.1-.5-.5-.2l-10.6 6.7-4.6-1.5c-1-.3-1-1 .5-1.6Z" fill="#fff" /></>}
    </svg>
  )
}
