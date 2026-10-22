import { now } from '../data'

export default function Now() {
  return (
    <section id="now" className="scroll-mt-20 border-t border-[#2a221d] py-[clamp(34px,5vw,56px)]">
      <div className="font-mono text-[13px] text-amber">
        $ now <span className="text-[#5e5248]">— what I&apos;m up to · updated Jun 2026</span>
      </div>
      <div className="mt-6 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {now.map((n) => (
          <div key={n.k} className="rounded-[10px] border border-edge bg-panel px-[22px] py-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
              {n.k}
            </div>
            <div className="mt-3 font-mono text-[14px] leading-[1.6] text-[#d6c8b3]">{n.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
