import Image from "next/image";

const heroStats = [
  { value: "12+", label: "published demos" },
  { value: "10", label: "innovation fields" },
  { value: "100%", label: "public listings reviewed" },
];

export function ExploreHero() {
  return (
    <section className="relative isolate min-h-[360px] overflow-hidden bg-slate-950 pt-24 text-white sm:min-h-[400px] lg:min-h-[460px]">
      <Image
        src="/images/explore-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-[56%_center] sm:object-center"
        style={{ filter: "brightness(1.02) contrast(0.78) saturate(0.9)" }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/76 via-slate-950/34 to-slate-950/0" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-slate-950/46 via-transparent to-slate-950/10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_34%,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(16,185,129,0.08),transparent_32%)]" />

      <div className="mx-auto flex min-h-[360px] w-full max-w-[1680px] items-center px-5 pb-16 sm:min-h-[400px] sm:px-6 md:px-8 lg:min-h-[460px] lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-slate-950/28 px-3.5 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-blue-50 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              Student innovation discovery
            </div>

            <h1
              className="mt-7 max-w-4xl !text-white text-[clamp(2.65rem,10vw,4.75rem)] font-black leading-[0.94] tracking-tight md:text-[clamp(4rem,7vw,5.75rem)]"
              style={{
                color: "#ffffff",
                textShadow: "0 4px 18px rgba(0,0,0,0.82), 0 18px 56px rgba(0,0,0,0.62)",
              }}
            >
              Explore Student Innovations
            </h1>

            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/82 sm:text-lg lg:text-xl lg:leading-8">
              Discover completed projects, research, prototypes, and creative work from universities across Sri Lanka.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-white/78">
              <span className="rounded-full border border-white/18 bg-slate-950/28 px-4 py-2 backdrop-blur-xl">Published projects only</span>
              <span className="rounded-full border border-white/18 bg-slate-950/28 px-4 py-2 backdrop-blur-xl">Private files protected</span>
              <span className="rounded-full border border-white/18 bg-slate-950/28 px-4 py-2 backdrop-blur-xl">Contact through platform</span>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-sm rounded-[2rem] border border-white/18 bg-slate-950/22 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/56">Marketplace signal</p>
                  <p className="mt-2 text-2xl font-black text-white">Fresh ideas, ready to discover</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-xl shadow-black/20">
                  UI
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/14 bg-white/[0.08] p-3">
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-[0.68rem] font-bold leading-4 text-white/58">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-300/24 bg-emerald-300/12 px-4 py-3 text-sm font-bold text-emerald-50">
                Search by field, university, opportunity type, or keyword.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
