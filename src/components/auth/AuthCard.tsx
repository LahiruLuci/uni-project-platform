export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/[0.08] sm:p-6 lg:rounded-[2rem] lg:p-8">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      {children}
    </section>
  );
}
