const links = ['now', 'work', 'stack', 'about', 'contact']

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#2f2722] bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-[940px] flex-wrap items-center justify-between gap-4 px-[clamp(18px,4vw,34px)] py-3.5">
        <div className="font-mono text-[13px] font-semibold text-bright">
          adrian@nare<span className="text-muted">:</span>
          <span className="text-accent">~</span>
          <span className="text-muted">$</span>
        </div>
        <nav className="flex flex-wrap gap-[clamp(12px,2.4vw,24px)] font-mono text-[12.5px] font-medium text-muted">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className={l === 'contact' ? 'text-accent' : 'transition-colors hover:text-accent'}
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
