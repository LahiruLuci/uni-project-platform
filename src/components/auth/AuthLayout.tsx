import { AuthBrandPanel } from "./AuthBrandPanel";

export function AuthLayout({ mode, children }: { mode: "login" | "signup"; children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fafc] px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14rem] top-[-14rem] h-[36rem] w-[36rem] rounded-full bg-cyan-100/80 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-blue-100/90 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-white/80 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-5 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,0.92fr)] lg:items-center lg:gap-8">
        <AuthBrandPanel mode={mode} />
        <div className="mx-auto w-full max-w-[650px] lg:py-6">{children}</div>
      </div>
    </main>
  );
}
