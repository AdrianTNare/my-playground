export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-[#2a221d] py-[clamp(34px,5vw,56px)]">
      <div className="font-mono text-[13px] text-amber">$ cat about.md</div>
      <div className="mt-6 flex flex-wrap items-start gap-[clamp(20px,4vw,44px)]">
        <img
          src="/formal_opt.jpg"
          alt="Adrian Nare"
          className="h-[200px] w-[170px] shrink-0 rounded-[10px] border border-[#3a302a] object-cover"
        />
        <div className="min-w-[260px] flex-1">
          <p className="font-mono text-[clamp(14px,2.1vw,16px)] leading-[1.8] text-[#d6c8b3]">
            A full-stack web developer with a focus on the React ecosystem. I mostly work with
            Next.js and TypeScript, leaning on React Testing Library and Vitest to build stable,
            performant and well-tested applications.
          </p>
          <p className="mt-[18px] font-mono text-[clamp(14px,2.1vw,16px)] leading-[1.8] text-clay">
            In my spare time I can be found tinkering with my Vim config — so feel free to send me a
            neat Vim trick you might have up your sleeve.
          </p>
        </div>
      </div>
    </section>
  )
}
