import Link from "next/link";
import type { ExploreProject } from "@/lib/projects/queries";

const thumbnailAccents: Record<string, string> = {
  Technology: "from-blue-500 via-cyan-500 to-indigo-500",
  Engineering: "from-slate-500 via-blue-500 to-cyan-500",
  Business: "from-amber-400 via-orange-400 to-rose-400",
  Health: "from-rose-400 via-fuchsia-500 to-violet-500",
  Agriculture: "from-emerald-400 via-green-500 to-cyan-500",
  Tourism: "from-sky-400 via-teal-500 to-blue-500",
  Education: "from-indigo-400 via-blue-500 to-cyan-400",
  Science: "from-lime-400 via-emerald-500 to-teal-500",
  "Creative / Design": "from-violet-500 via-orange-400 to-rose-400",
  "Social Impact": "from-emerald-400 via-teal-500 to-blue-500",
};

const opportunityPriority = [
  "INVESTMENT",
  "LICENSING",
  "ACQUISITION",
  "COLLABORATION",
  "HIRING",
  "RESEARCH_PARTNER",
  "SPONSORSHIP",
] as const;

const opportunityLabels: Record<string, string> = {
  INVESTMENT: "Open for Investment",
  LICENSING: "Available for Licensing",
  ACQUISITION: "Available for Acquisition",
  COLLABORATION: "Open for Collaboration",
  HIRING: "Hiring Opportunity",
  RESEARCH_PARTNER: "Research Partnership",
  SPONSORSHIP: "Sponsorship Open",
};

const trustBadgeTone = (label: string) => {
  if (label.includes("Private")) return "border-purple-200 bg-purple-50 text-purple-700";
  if (label.includes("Demo")) return "border-blue-200 bg-blue-50 text-blue-700";
  if (label.includes("University")) return "border-indigo-200 bg-indigo-50 text-indigo-700";
  if (label.includes("Admin")) return "border-slate-200 bg-slate-100 text-slate-700";
  if (label.includes("Verified")) return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-slate-200 bg-slate-50 text-slate-700";
};

function getMainOpportunity(project: ExploreProject) {
  const opportunityTypes = project.opportunities.map((opportunity) => opportunity.opportunityType);
  const selected = opportunityPriority.find((type) => opportunityTypes.includes(type));

  return selected ? opportunityLabels[selected] : "Open for Opportunities";
}

function getTrustBadges(project: ExploreProject) {
  const labels = new Set<string>();

  for (const badge of project.badges) {
    if (opportunityLabels[badge.toUpperCase().replaceAll(" ", "_")]) continue;
    if (badge.includes("Investment") || badge.includes("Licensing") || badge.includes("Acquisition") || badge.includes("Collaboration")) {
      continue;
    }
    labels.add(badge);
  }

  if (project.verified) {
    labels.add("Admin Reviewed");
  }

  if (project.demoUrl) {
    labels.add("Demo Available");
  }

  if (project.visibility === "REQUEST_ONLY") {
    labels.add("Private Files Locked");
  }

  return Array.from(labels);
}

function CategoryLabel({ project }: { project: ExploreProject }) {
  const label = [project.category.name, project.subcategory?.name].filter(Boolean).join(" - ");

  return <p className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-blue-600">{label}</p>;
}

function OpportunityBadge({ label }: { label: string }) {
  return (
    <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/35 bg-slate-950/48 px-3.5 py-2 text-xs font-black text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      {label}
    </div>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[0.72rem] font-extrabold leading-none ${trustBadgeTone(label)}`}>
      {label}
    </span>
  );
}

function ProjectThumbnail({ project }: { project: ExploreProject }) {
  const accent = thumbnailAccents[project.category.name] ?? "from-blue-500 via-indigo-500 to-emerald-400";
  const initials = project.category.name
    .split(/[ /]+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br ${accent}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.5),transparent_28%),radial-gradient(circle_at_76%_72%,rgba(15,23,42,0.28),transparent_34%)]" />
      <div className="absolute -left-8 bottom-3 h-28 w-28 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
      <div className="absolute right-5 top-5 rounded-2xl border border-white/40 bg-white/18 px-3 py-2 text-xs font-black text-white shadow-lg shadow-slate-900/10 backdrop-blur-md">
        {initials}
      </div>
      <OpportunityBadge label={getMainOpportunity(project)} />
    </div>
  );
}

export function ExploreProjectCard({ project }: { project: ExploreProject }) {
  const trustBadges = getTrustBadges(project);
  const visibleTrustBadges = trustBadges.slice(0, 3);
  const hiddenTrustCount = Math.max(0, trustBadges.length - visibleTrustBadges.length);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-900/[0.06] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/[0.1]">
      <div className="transition duration-500 group-hover:scale-[1.02]">
        <ProjectThumbnail project={project} />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <CategoryLabel project={project} />

        <h2 className="mt-3 line-clamp-2 text-xl font-extrabold leading-tight text-slate-950">{project.title}</h2>
        <p className="mt-2 line-clamp-1 text-sm font-bold text-slate-500">{project.university?.name ?? "University project"}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{project.shortSummary}</p>

        <div className="mt-5 flex min-h-8 flex-wrap gap-2">
          {visibleTrustBadges.map((badge) => (
            <TrustBadge key={badge} label={badge} />
          ))}
          {hiddenTrustCount > 0 ? <TrustBadge label={`+${hiddenTrustCount} more`} /> : null}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-extrabold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            View Project
            <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-black text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            aria-label={`Save ${project.title}`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
