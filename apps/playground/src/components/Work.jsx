import { projects } from '../data'

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-[#2a221d] py-[clamp(34px,5vw,56px)]">
      <div className="font-mono text-[13px] text-amber">$ ls ~/projects</div>
      <div className="mt-6 flex flex-col gap-3">
        {projects.map((p) => (
          <div
            key={p.name}
            className="flex flex-wrap items-start justify-between gap-5 rounded-[10px] border border-edge bg-panel px-6 py-[22px]"
          >
            <div className="min-w-[230px] flex-1">
              <div className="font-mono text-[18px] font-semibold text-bright">{p.name}</div>
              <div className="mt-2 max-w-[440px] font-mono text-[14px] leading-[1.6] text-clay">
                {p.desc}
              </div>
              <div className="mt-3.5 flex flex-wrap gap-3.5">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className={`font-mono text-[12px] font-medium ${l.accent ? 'text-accent' : 'text-amber'}`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-[5px] border border-[#3a302a] px-[9px] py-1 font-mono text-[11px] text-clay"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
