import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatEnumLabel } from "@/src/components/explore/format";

export const thumbnailAccents: Record<string, string> = {
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

export const opportunityLabels: Record<string, string> = {
  INVESTMENT: "Open for Investment",
  LICENSING: "Available for Licensing",
  ACQUISITION: "Available for Acquisition",
  COLLABORATION: "Open for Collaboration",
  HIRING: "Hiring Opportunity",
  RESEARCH_PARTNER: "Research Partnership",
  SPONSORSHIP: "Sponsorship Open",
};

export function getCategoryLabel(project: ProjectDetail) {
  return [project.category.name, project.subcategory?.name].filter(Boolean).join(" - ");
}

export function getMainOpportunities(project: ProjectDetail, limit = 2) {
  const values = project.opportunities.map((opportunity) => opportunity.opportunityType);
  const ordered = opportunityPriority.filter((type) => values.includes(type));

  return ordered.slice(0, limit).map((type) => opportunityLabels[type] ?? formatEnumLabel(type));
}

export function getTrustBadges(project: ProjectDetail) {
  const labels = new Set<string>();

  for (const badge of project.badges) {
    if (badge.includes("Investment") || badge.includes("Licensing") || badge.includes("Acquisition") || badge.includes("Collaboration")) {
      continue;
    }
    labels.add(badge);
  }

  if (project.verified) labels.add("Admin Reviewed");
  if (project.demoUrl) labels.add("Demo Available");
  if (project.visibility === "REQUEST_ONLY" || project.files.length > 0) labels.add("Private Files Locked");
  if (project.ownership?.allMembersAgreed) labels.add("Team Consent Added");

  return Array.from(labels);
}

export function formatProjectValue(value: string) {
  return formatEnumLabel(value);
}

export function formatDate(value: Date | null) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export function CategoryMeta({ project }: { project: ProjectDetail }) {
  return (
    <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-blue-600">
      {getCategoryLabel(project)}
    </p>
  );
}

export function OpportunityBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
      {label}
    </span>
  );
}

export function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-sm shadow-slate-900/[0.03]">
      {label}
    </span>
  );
}

export function GradientVisual({ project, className = "" }: { project: ProjectDetail; className?: string }) {
  const accent = thumbnailAccents[project.category.name] ?? "from-blue-500 via-indigo-500 to-emerald-400";
  const initials = project.category.name
    .split(/[ /]+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${accent} ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,255,255,0.5),transparent_28%),radial-gradient(circle_at_80%_74%,rgba(15,23,42,0.32),transparent_34%)]" />
      <div className="absolute -left-10 bottom-4 h-32 w-32 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
      <div className="absolute right-5 top-5 rounded-2xl border border-white/35 bg-white/18 px-3 py-2 text-xs font-black text-white shadow-lg backdrop-blur-md">
        {initials}
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-slate-950/30 px-4 py-3 text-sm font-extrabold text-white shadow-xl backdrop-blur-md">
        {getMainOpportunities(project, 1)[0] ?? "Open for Opportunities"}
      </div>
    </div>
  );
}
