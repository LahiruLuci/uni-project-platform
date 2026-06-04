function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/[0.05]">
      <div className="aspect-[16/10] animate-pulse rounded-3xl bg-gradient-to-br from-slate-200 via-blue-100 to-emerald-100" />
      <div className="px-3 pb-4 pt-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-4 h-6 w-4/5 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-5 space-y-2">
          <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="mt-6 flex gap-2">
          <div className="h-7 w-24 animate-pulse rounded-full bg-emerald-100" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-indigo-100" />
        </div>
      </div>
    </div>
  );
}

export default function ExploreLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 pt-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.26),transparent_34%),radial-gradient(circle_at_80%_28%,rgba(16,185,129,0.16),transparent_30%)]" />
        <div className="mx-auto flex min-h-[380px] max-w-[1680px] items-center px-5 pb-16 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              Loading discovery
            </div>
            <div className="mt-7 h-16 w-[min(680px,82vw)] animate-pulse rounded-3xl bg-white/14" />
            <div className="mt-4 h-16 w-[min(520px,70vw)] animate-pulse rounded-3xl bg-white/10" />
            <div className="mt-7 h-5 w-[min(620px,82vw)] animate-pulse rounded-full bg-white/14" />
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-12 w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/[0.08]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="h-14 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-14 animate-pulse rounded-2xl bg-slate-950 lg:w-32" />
          </div>
          <div className="mt-4 hidden grid-cols-5 gap-3 lg:grid">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-12 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
