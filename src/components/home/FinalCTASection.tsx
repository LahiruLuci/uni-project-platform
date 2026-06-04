function CTAActions() {
  return (
    <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
      <a
        href="/submit"
        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-6 text-sm font-extrabold text-slate-950 shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30"
      >
        Submit Your Project
      </a>
      <a
        href="/explore"
        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/22 bg-white/10 px-6 text-sm font-extrabold text-white shadow-lg shadow-black/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
      >
        Explore Projects
      </a>
    </div>
  );
}

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24" aria-labelledby="final-cta-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(16,185,129,0.25),transparent_28%)] bg-slate-950 px-5 py-12 text-center shadow-2xl shadow-slate-900/20 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative mx-auto max-w-[780px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-100/80">Ready to begin?</p>
            <h2 id="final-cta-title" className="mt-4 !text-white text-[clamp(2.125rem,8vw,2.9rem)] font-extrabold leading-tight md:text-5xl">
              Bring university innovation into the real world.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
              Submit completed student work or discover projects, research, prototypes, and creative ideas from Sri
              Lankan universities.
            </p>

            <CTAActions />

            <a
              href="/partners"
              className="mt-5 inline-flex rounded-xl text-sm font-extrabold text-white/78 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Join as Industry Partner
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
