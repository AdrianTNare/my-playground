import { stack } from '../data'

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-[#2a221d] py-[clamp(34px,5vw,56px)]">
      <div className="font-mono text-[13px] text-amber">$ cat stack.txt</div>
      <div className="mt-6 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {stack.map((s) => (
          <div key={s.k} className="rounded-[10px] border border-edge bg-panel px-[22px] py-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {s.k}
            </div>
            <div className="mt-3.5 flex flex-col gap-2 font-mono text-[13.5px] text-[#d6c8b3]">
              {s.items.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
