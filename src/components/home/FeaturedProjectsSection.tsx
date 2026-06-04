type BadgeTone =
  | "blue"
  | "emerald"
  | "green"
  | "purple"
  | "amber"
  | "indigo"
  | "slate"
  | "cyan"
  | "rose";

type FeaturedProject = {
  title: string;
  category: string;
  university: string;
  summary: string;
  badges: string[];
  accent: string;
  initial: string;
  opportunity: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "Smart Farming Irrigation System",
    category: "Agriculture · Engineering",
    university: "University of Peradeniya",
    summary: "An IoT-based irrigation system that helps farmers reduce water waste and monitor soil conditions.",
    badges: ["Demo Available", "Open for Collaboration"],
    accent: "from-emerald-400 via-green-500 to-cyan-500",
    initial: "Ag",
    opportunity: "Collaboration ready",
  },
  {
    title: "AI Learning Assistant",
    category: "Education · Technology",
    university: "University of Moratuwa",
    summary: "An AI-powered study assistant that helps students understand lecture notes and prepare for exams.",
    badges: ["Student Verified", "Private Access"],
    accent: "from-blue-500 via-cyan-500 to-indigo-500",
    initial: "AI",
    opportunity: "Verified creator",
  },
  {
    title: "Eco Packaging Research",
    category: "Science · Business",
    university: "University of Sri Jayewardenepura",
    summary: "A research project focused on biodegradable packaging materials for small businesses.",
    badges: ["Open for Licensing", "Research"],
    accent: "from-amber-400 via-lime-500 to-emerald-500",
    initial: "Eco",
    opportunity: "Licensing potential",
  },
  {
    title: "Tourism Experience Platform",
    category: "Tourism · Technology",
    university: "Sabaragamuwa University",
    summary: "A digital platform that connects local travel experiences with tourists and small service providers.",
    badges: ["Prototype", "Open for Investment"],
    accent: "from-sky-400 via-teal-500 to-blue-500",
    initial: "Tour",
    opportunity: "Investment open",
  },
  {
    title: "Mental Health Support App",
    category: "Health · Social Impact",
    university: "University of Colombo",
    summary: "A mobile-first support tool that helps university students track mood and access wellbeing resources.",
    badges: ["Private Files Locked", "Collaboration"],
    accent: "from-rose-400 via-fuchsia-500 to-violet-500",
    initial: "Care",
    opportunity: "Protected access",
  },
  {
    title: "Creative Brand Identity System",
    category: "Creative / Design · Business",
    university: "University of Kelaniya",
    summary: "A complete brand identity and campaign concept created for a youth-focused social enterprise.",
    badges: ["Portfolio", "Hire Talent"],
    accent: "from-violet-500 via-orange-400 to-rose-400",
    initial: "Art",
    opportunity: "Talent showcase",
  },
];

const badgeTones: Record<string, BadgeTone> = {
  "Demo Available": "blue",
  "Open for Collaboration": "emerald",
  "Student Verified": "green",
  "Private Access": "purple",
  "Private Files Locked": "purple",
  "Open for Licensing": "amber",
  "Open for Investment": "indigo",
  Research: "slate",
  Prototype: "cyan",
  Collaboration: "emerald",
  Portfolio: "slate",
  "Hire Talent": "rose",
};

const badgeClasses: Record<BadgeTone, string> = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  green: "border-green-200 bg-green-50 text-green-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
  slate: "border-slate-200 bg-slate-100 text-slate-700",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
};

function SectionHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">Marketplace showcase</p>
        <h2 id="featured-projects-title" className="mt-3 text-[clamp(2.125rem,8vw,2.75rem)] font-extrabold leading-tight text-slate-950 md:text-5xl">
          Featured Student Innovations
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Explore selected projects, research, prototypes, and creative work from university students across different fields.
        </p>
      </div>

      <a
        href="/explore"
        className="hidden min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 shadow-lg shadow-slate-900/[0.05] transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100 lg:inline-flex"
      >
        View All Projects
        <span className="ml-2" aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}

function ProjectThumbnail({ project }: { project: FeaturedProject }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br ${project.accent}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgba(255,255,255,0.52),transparent_28%),radial-gradient(circle_at_76%_72%,rgba(15,23,42,0.26),transparent_32%)]" />
      <div className="absolute -left-10 bottom-4 h-28 w-28 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
      <div className="absolute right-5 top-5 rounded-2xl border border-white/40 bg-white/18 px-3 py-2 text-xs font-black text-white shadow-lg shadow-slate-900/10 backdrop-blur-md">
        {project.initial}
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/18 px-4 py-3 text-sm font-extrabold text-white shadow-xl shadow-slate-900/10 backdrop-blur-md">
        {project.opportunity}
      </div>
    </div>
  );
}

function ProjectBadge({ label }: { label: string }) {
  const tone = badgeTones[label] ?? "slate";

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[0.72rem] font-extrabold leading-none ${badgeClasses[tone]}`}>
      {label}
    </span>
  );
}

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-900/[0.06] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/[0.11]">
      <div className="overflow-hidden rounded-3xl">
        <div className="transition duration-500 group-hover:scale-[1.03]">
          <ProjectThumbnail project={project} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">{project.category}</p>
        <h3 className="mt-3 text-xl font-extrabold leading-tight text-slate-950">{project.title}</h3>
        <p className="mt-2 text-sm font-bold text-slate-500">{project.university}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.badges.map((badge) => (
            <ProjectBadge key={badge} label={badge} />
          ))}
        </div>

        <div className="mt-auto pt-6">
          <a
            href="/explore"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-extrabold text-slate-900 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            View Project
            <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="featured-projects-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(37,99,235,0.09),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-8 lg:hidden">
          <a
            href="/explore"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-xl shadow-slate-900/15 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
          >
            View All Projects
            <span className="ml-2" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
