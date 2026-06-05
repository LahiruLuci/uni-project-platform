import Image from "next/image";
import Link from "next/link";

function HeroActions() {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-center md:gap-3.5">
      <a
        href="/explore"
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-white px-6 text-base font-bold text-slate-950 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/35 md:h-[52px] md:w-auto md:rounded-xl md:text-sm"
      >
        Explore Projects
      </a>
      <a
        href="/submit"
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-6 text-base font-bold text-white shadow-lg shadow-black/10 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/25 md:h-[52px] md:w-auto md:rounded-xl md:text-sm"
      >
        <span className="md:hidden">Submit Project</span>
        <span className="hidden md:inline">Submit Your Project</span>
      </a>
      <Link
        href="/signup?role=industry"
        className="inline-flex min-h-10 items-center justify-center rounded-xl px-3 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/20 md:ml-1 md:min-h-11"
        aria-label="Join as Company"
      >
        Join as Company <span className="ml-2" aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}

function HeroTrustLine() {
  return (
    <p className="hidden max-w-md text-sm font-semibold leading-6 text-white/76 sm:block">
      Verified projects. Private access. Built for students and industry.
    </p>
  );
}

function HeroGlassCard() {
  return (
    <aside className="hidden max-w-xs rounded-xl border border-white/20 bg-white/12 p-5 text-white shadow-2xl shadow-black/18 backdrop-blur-xl lg:absolute lg:bottom-14 lg:right-12 lg:block xl:bottom-16 xl:right-20 [@media(max-height:700px)]:bottom-6 [@media(max-height:700px)]:max-w-[280px] [@media(max-height:700px)]:p-4">
      <p className="text-3xl font-extrabold leading-none [@media(max-height:700px)]:text-2xl">120+</p>
      <p className="mt-2 text-sm font-bold text-white">student innovations</p>
      <p className="mt-3 text-sm leading-6 text-white/74 [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:leading-5">
        Across technology, business, health, agriculture, design, and research
      </p>
      <a
        href="/explore"
        className="mt-5 inline-flex rounded-lg text-sm font-bold text-white/88 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-white/20 [@media(max-height:700px)]:mt-3"
      >
        Explore verified projects <span className="ml-2" aria-hidden="true">&rarr;</span>
      </a>
    </aside>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate h-auto min-h-[640px] overflow-hidden bg-slate-950 text-white md:min-h-[100svh] lg:h-[100svh] lg:max-h-[860px]">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-[65%_center] sm:object-[60%_center] md:object-[64%_center]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,6,23,0.88)_0%,rgba(15,23,42,0.72)_46%,rgba(2,6,23,0.8)_100%)] md:bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(15,23,42,0.45)_52%,rgba(15,23,42,0.14)_80%,rgba(15,23,42,0.05)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(2,6,23,0.62)_0%,rgba(2,6,23,0.16)_36%,transparent_68%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_30%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_76%_74%,rgba(16,185,129,0.12),transparent_32%)]" />

      <div className="mx-auto flex min-h-[640px] w-full max-w-[1680px] items-center px-5 pb-16 pt-24 sm:min-h-[680px] sm:px-6 sm:pt-[5.5rem] md:min-h-[100svh] md:px-8 md:pt-20 lg:h-full lg:min-h-0 lg:px-12 lg:pb-0 lg:pt-20 xl:px-16 2xl:px-20 [@media(max-height:700px)]:pt-20 sm:[@media(max-height:700px)]:pt-16">
        <div className="w-full max-w-[680px] lg:-translate-y-4 xl:-translate-y-6 [@media(max-height:700px)]:translate-y-0">
          <p className="flex max-w-sm items-center gap-2.5 text-[0.7rem] font-bold uppercase leading-5 tracking-[0.18em] text-blue-50/86 sm:max-w-none sm:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.7)]" aria-hidden="true" />
            <span>Sri Lankan University Innovation Marketplace</span>
          </p>

          <h1
            className="mt-5 max-w-[680px] !text-white text-[clamp(2.5rem,12vw,2.9rem)] font-extrabold leading-[0.95] md:text-[clamp(3.25rem,7vw,4rem)] lg:text-[clamp(4rem,4.6vw,5.1rem)] 2xl:text-[5.4rem] md:[@media(max-height:700px)]:text-[clamp(3.25rem,6vw,4rem)]"
            style={{ textShadow: "0 2px 28px rgba(2, 6, 23, 0.42)" }}
          >
            <span className="block md:hidden">
              Student Ideas.
              <br />
              Real Opportunities.
            </span>
            <span className="hidden md:block">Where Student Ideas Meet Real Opportunities</span>
          </h1>

          <p className="mt-6 max-w-[620px] text-base leading-[1.7] text-white/82 sm:text-lg lg:text-[1.08rem] [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:max-w-[580px] [@media(max-height:700px)]:leading-7">
            <span className="md:hidden">
              Discover university projects and connect with students for collaboration, hiring, investment, or licensing.
            </span>
            <span className="hidden md:inline">
              Discover completed projects, research, prototypes, and creative work from university students. Connect for
              collaboration, hiring, investment, licensing, or acquisition.
            </span>
          </p>

          <div className="mt-8 [@media(max-height:700px)]:mt-6">
            <HeroActions />
          </div>

          <div className="mt-6 hidden sm:block [@media(max-height:700px)]:mt-4">
            <HeroTrustLine />
          </div>
        </div>

        <HeroGlassCard />
      </div>
    </section>
  );
}
