export function OnboardingLayout({ children, aside }: { children: React.ReactNode; aside: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fafc] px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-cyan-100/80 blur-3xl" />
        <div className="absolute right-[-12rem] top-32 h-[32rem] w-[32rem] rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-white/80 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="lg:sticky lg:top-24">{aside}</aside>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
