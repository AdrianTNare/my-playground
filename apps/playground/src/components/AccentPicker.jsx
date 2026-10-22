'use client'

import { useEffect, useState } from 'react'

const OPTIONS = [
  { name: 'terracotta', value: '#c0613f' },
  { name: 'amber', value: '#cf9b5c' },
  { name: 'sage', value: '#8a9a6d' },
  { name: 'clay', value: '#b0764f' },
]

export default function AccentPicker() {
  const [accent, setAccent] = useState(
    () => (typeof localStorage !== 'undefined' && localStorage.getItem('accent')) || '#c0613f',
  )

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
    try {
      localStorage.setItem('accent', accent)
    } catch (e) {
      /* storage unavailable */
    }
  }, [accent])

  return (
    <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-2 shadow-lg">
      <span className="hidden font-mono text-[10px] text-muted sm:inline">accent</span>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setAccent(o.value)}
          title={o.name}
          aria-label={o.name}
          className="h-4 w-4 rounded-full border border-black/30"
          style={{
            background: o.value,
            outline: accent === o.value ? '2px solid #f3e9d8' : 'none',
            outlineOffset: '1px',
          }}
        />
      ))}
    </div>
  )
}
