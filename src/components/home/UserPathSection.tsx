type UserPath = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  chips: string[];
  tone: "student" | "partner";
};

const userPaths: UserPath[] = [
  {
    eyebrow: "Create visibility",
    title: "For Students",
    description:
      "Showcase your completed projects, research, prototypes, and creative work. Get discovered for collaboration, hiring, funding, or commercialization.",
    cta: "Submit Your Project",
    href: "/submit",
    chips: ["Projects", "Research", "Prototypes"],
    tone: "student",
  },
  {
    eyebrow: "Discover opportunity",
    title: "For Industry & Partners",
    description:
      "Discover student innovations, research, prototypes, and fresh talent from universities. Connect for hiring, investment, collaboration, licensing, or acquisition.",
    cta: "Discover Projects",
    href: "/projects",
    chips: ["Hire", "Invest", "License"],
    tone: "partner",
  },
];

const toneStyles = {
  student: {
    panel: "from-white via-cyan-50/70 to-emerald-50/60",
    orb: "from-cyan-400 via-blue-500 to-emerald-400",
    halo: "bg-cyan-400/20",
    chip: "border-cyan-200/80 bg-white/70 text-cyan-800",
    button: "bg-slate-950 text-white hover:bg-slate-800 focus:ring-cyan-200",
    line: "from-cyan-300 to-emerald-300",
  },
  partner: {
    panel: "from-white via-indigo-50/80 to-violet-50/70",
    orb: "from-violet-400 via-indigo-500 to-blue-500",
    halo: "bg-violet-400/20",
    chip: "border-violet-200/80 bg-white/70 text-violet-800",
    button: "bg-slate-950 text-white hover:bg-slate-800 focus:ring-violet-200",
    line: "from-violet-300 to-blue-300",
  },
} satisfies Record<UserPath["tone"], Record<string, string>>;

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400">Two ways into the marketplace</p>
      <h2 id="user-path-title" className="mt-4 text-[clamp(2.125rem,9vw,2.75rem)] font-extrabold leading-tight text-slate-950 md:text-6xl">
        Choose Your Path
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        Whether you are a student creator or an industry partner, start with the path that fits your goal.
      </p>
    </div>
  );
}

function PathChips({ chips, tone }: { chips: string[]; tone: UserPath["tone"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span key={chip} className={`rounded-full border px-3 py-1.5 text-xs font-extrabold ${toneStyles[tone].chip}`}>
          {chip}
        </span>
      ))}
    </div>
  );
}

function PathSignal({ tone }: { tone: UserPath["tone"] }) {
  return (
    <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36" aria-hidden="true">
      <div className={`absolute inset-0 rounded-full ${toneStyles[tone].halo} blur-2xl`} />
      <div className="absolute inset-3 rounded-full border border-white/80 bg-white/60 shadow-2xl shadow-slate-900/10 backdrop-blur-md" />
      <div className={`absolute inset-8 rounded-3xl bg-gradient-to-br ${toneStyles[tone].orb} shadow-xl shadow-slate-900/15`} />
      <div className="absolute left-4 right-4 top-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="absolute bottom-6 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/90 bg-white" />
    </div>
  );
}

function UserPathPanel({ path, index }: { path: UserPath; index: number }) {
  return (
    <article className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br ${toneStyles[path.tone].panel} p-6 shadow-2xl shadow-slate-900/[0.08] transition duration-500 hover:-translate-y-1 hover:shadow-slate-900/[0.14] sm:p-8 lg:p-10`}>
      <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl ${toneStyles[path.tone].halo}`} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">{path.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">{path.title}</h3>
          </div>
          <span className={`hidden h-12 min-w-12 place-items-center rounded-2xl bg-gradient-to-br ${toneStyles[path.tone].orb} text-sm font-black text-white shadow-lg shadow-slate-900/15 sm:grid`}>
            0{index + 1}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between lg:mt-10">
          <PathSignal tone={path.tone} />
          <p className="max-w-md text-base leading-8 text-slate-600">{path.description}</p>
        </div>

        <div className="mt-8">
          <PathChips chips={path.chips} tone={path.tone} />
        </div>

        <div className="mt-9 flex flex-col gap-4 sm:mt-auto sm:flex-row sm:items-end sm:justify-between sm:pt-10">
          <a
            href={path.href}
            className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl px-5 text-sm font-extrabold shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 sm:w-auto ${toneStyles[path.tone].button}`}
          >
            {path.cta}
            <span className="ml-2 transition duration-300 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <div className={`hidden h-1 w-24 rounded-full bg-gradient-to-r ${toneStyles[path.tone].line} sm:block`} />
        </div>
      </div>
    </article>
  );
}

function BridgeMark() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[56%] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block" aria-hidden="true">
      <div className="grid h-20 w-20 place-items-center rounded-full border border-white/80 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-400 shadow-lg shadow-blue-500/20" />
      </div>
    </div>
  );
}

export function UserPathSection() {
  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#eef6ff_100%)] py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="user-path-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_84%_68%,rgba(124,58,237,0.14),transparent_32%),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:auto,auto,64px_64px,64px_64px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="relative mt-11 lg:mt-16">
          <BridgeMark />
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            {userPaths.map((path, index) => (
              <UserPathPanel key={path.title} path={path} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
