export function AuthBrandPanel({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const title = isSignup ? "Start with a trusted innovation profile." : "Return to your innovation workspace.";
  const text = isSignup
    ? "Create a secure account for student projects, partner discovery, protected requests, and future collaboration."
    : "Continue discovering projects, managing access requests, and following promising university innovation.";
  const steps = isSignup ? ["Choose your path", "Create profile", "Access marketplace"] : ["Secure login", "Protected account", "Marketplace access"];

  return (
    <aside className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/[0.06] sm:p-5 lg:min-h-[680px] lg:rounded-[2.25rem] lg:bg-slate-950 lg:p-8 lg:text-white lg:shadow-2xl lg:shadow-slate-950/25">
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.34),transparent_30%),radial-gradient(circle_at_86%_28%,rgba(16,185,129,0.22),transparent_28%),radial-gradient(circle_at_54%_92%,rgba(99,102,241,0.24),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0,transparent_28%),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/10 lg:border-white/15 lg:bg-white/10">UV</div>
            <div>
              <p className="text-base font-black text-slate-950 lg:text-white">UniVenture</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 lg:text-white/45">Protected access</p>
            </div>
          </div>
          <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 sm:inline-flex lg:border-emerald-300/20 lg:bg-emerald-300/10 lg:text-emerald-100">
            Live marketplace
          </div>
        </div>

        <div className="mt-5 max-w-2xl lg:mt-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600 lg:text-cyan-100/80">University innovation marketplace</p>
          <h1 className="mt-3 !text-slate-950 text-[clamp(1.65rem,8vw,2.35rem)] font-black leading-[1.02] lg:!text-white lg:text-[clamp(3.1rem,5.2vw,4.75rem)] lg:leading-[0.95]">{title}</h1>
          <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base lg:mt-4 lg:text-lg lg:font-medium lg:leading-8 lg:text-white/68">{text}</p>
        </div>

        <div className="mt-4 hidden gap-2 sm:grid sm:grid-cols-3 lg:mt-10">
          {steps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:border-white/10 lg:bg-white/[0.075]">
              <p className="text-xs font-black text-blue-600 lg:text-emerald-200">0{index + 1}</p>
              <p className="mt-1 text-sm font-black text-slate-950 lg:text-white">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 hidden lg:block lg:flex-1" />
        <div className="mt-6 hidden overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:block">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Marketplace passport</p>
              <p className="mt-3 text-2xl font-black text-white">{isSignup ? "Account setup" : "Access verified"}</p>
              <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-white/58">Student identity, partner intent, project requests, and private files stay separated through protected platform workflows.</p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-xl shadow-white/10">{isSignup ? "ID" : "OK"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
