export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
      <div className="relative text-center">
        <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="h-8 w-8 animate-pulse rounded-xl bg-gradient-to-br from-white via-blue-100 to-emerald-200 shadow-[0_0_30px_rgba(110,231,183,0.65)]" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-white/62">Loading marketplace</p>
        <h1 className="mt-3 !text-white text-3xl font-black">Preparing UniVenture</h1>
      </div>
    </main>
  );
}
