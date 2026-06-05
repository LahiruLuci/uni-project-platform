export function ProfileCompletionCard({ completion }: { completion: number }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06] sm:p-6">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Profile setup</p>
      <h2 className="mt-4 !text-slate-950 text-2xl font-black leading-tight">Complete your student profile</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        Add your university details so your projects can be reviewed, trusted, and connected with real opportunities.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-black text-slate-700">Profile completion</span>
          <span className="text-sm font-black text-slate-950">{completion}%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {["Private details protected", "Reviewed project listings", "Built for students and industry partners"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
