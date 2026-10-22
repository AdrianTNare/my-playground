export default function Hero() {
  return (
    <section className="pb-[clamp(40px,6vw,64px)] pt-[clamp(48px,8vw,92px)]">
      <div className="overflow-hidden rounded-xl border border-edge bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 border-b border-edge bg-panel2 px-[15px] py-[11px]">
          <span className="h-[11px] w-[11px] rounded-full bg-accent"></span>
          <span className="h-[11px] w-[11px] rounded-full bg-amber"></span>
          <span className="h-[11px] w-[11px] rounded-full bg-sage"></span>
          <span className="ml-2 font-mono text-[11px] text-muted">adrian@nare: ~</span>
        </div>
        <div className="px-[clamp(22px,4vw,46px)] pb-[clamp(34px,5vw,52px)] pt-[clamp(26px,4.5vw,44px)]">
          <div className="font-mono text-[13px] text-amber">$ whoami</div>
          <h1 className="mt-4 font-display text-[clamp(40px,8.5vw,76px)] font-bold leading-none tracking-[-0.03em] text-bright">
            Adrian Nare
            <span className="ml-2 inline-block h-[clamp(34px,7vw,62px)] w-[clamp(12px,2.2vw,20px)] align-[-0.12em] bg-accent cursor-blink"></span>
          </h1>
          <p className="mt-[22px] max-w-[560px] font-mono text-[clamp(13px,2vw,15px)] leading-[1.75] text-clay">
            Full-stack JavaScript / TypeScript developer · Vim keybindings enthusiast · Computer
            Science graduate. I build stable, performant, well-tested React applications.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <a
              href="mailto:adriantnare@icloud.com"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-[18px] py-[11px] font-mono text-[13px] font-semibold text-ink"
            >
              ./say-hello.sh
            </a>
            <a
              href="https://github.com/AdrianTNare"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-[#4a3f37] px-[18px] py-[11px] font-mono text-[13px] font-medium text-bright transition-colors hover:border-accent hover:text-accent"
            >
              github ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
