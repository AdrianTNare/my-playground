'use client'

import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    try {
      navigator.clipboard?.writeText('adriantnare@icloud.com')
    } catch (e) {
      /* clipboard unavailable */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-[#2a221d] pb-[clamp(56px,8vw,90px)] pt-[clamp(34px,5vw,56px)]"
    >
      <div className="font-mono text-[13px] text-amber">$ contact</div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-edge bg-panel p-[clamp(26px,4vw,38px)]">
        <div>
          <div className="font-display text-[clamp(20px,3.4vw,30px)] font-semibold tracking-[-0.01em] text-bright">
            Let&apos;s build something.
          </div>
          <button
            onClick={copy}
            className="mt-3.5 inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#4a3f37] px-3.5 py-[9px] font-mono text-[14px] font-medium text-accent"
          >
            {copied ? 'copied to clipboard ✓' : 'adriantnare@icloud.com'}
          </button>
        </div>
        <div className="flex flex-col gap-2.5 font-mono text-[13px] font-medium">
          <a
            href="https://github.com/AdrianTNare"
            target="_blank"
            rel="noopener"
            className="text-[#d6c8b3] transition-colors hover:text-accent"
          >
            → github.com/AdrianTNare
          </a>
          <a
            href="https://www.linkedin.com/in/adriantnare/"
            target="_blank"
            rel="noopener"
            className="text-[#d6c8b3] transition-colors hover:text-accent"
          >
            → linkedin.com/in/adriantnare
          </a>
        </div>
      </div>
      <div className="mt-[30px] font-mono text-[11px] text-[#5e5248]">
        Made with React · Adrian Nare © 2026 <span className="text-accent cursor-blink">_</span>
      </div>
    </section>
  )
}
