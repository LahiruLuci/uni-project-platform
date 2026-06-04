import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatDate, formatProjectValue, getTrustBadges, TrustBadge } from "./project-detail-utils";
import { ProjectActionButtons } from "./ProjectActionButtons";

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}

export function ProjectQuickPanel({ project }: { project: ProjectDetail }) {
  const trustBadges = getTrustBadges(project).slice(0, 5);
  const privateFileCount = project.files.length;

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06] lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:overscroll-contain">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Quick actions</p>
      <h2 className="mt-2 !text-slate-950 text-2xl font-black">Interested in this project?</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">Request contact or protected files through the platform. No phone numbers or emails are shown publicly.</p>

      <div className="mt-5">
        <ProjectActionButtons projectTitle={project.title} compact />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Fact label="Type" value={formatProjectValue(project.projectType)} />
        <Fact label="Status" value={formatProjectValue(project.completionStatus)} />
        <Fact label="University" value={project.university?.shortName ?? project.university?.name ?? "Not listed"} />
        <Fact label="Category" value={project.category.name} />
        <Fact label="Published" value={formatDate(project.publishedAt)} />
        <Fact label="Visibility" value={formatProjectValue(project.visibility)} />
        <Fact label="Commercial" value={formatProjectValue(project.commercialStatus)} />
        <Fact label="Demo" value={project.demoUrl ? "Available" : "Not yet"} />
      </div>

      <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50 p-4">
        <p className="text-sm font-black text-purple-900">Private files</p>
        <p className="mt-1 text-sm font-semibold text-purple-700">
          {privateFileCount > 0 ? `${privateFileCount} protected file item${privateFileCount === 1 ? "" : "s"} available by approval.` : "No protected file metadata listed yet."}
        </p>
      </div>

      {trustBadges.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <TrustBadge key={badge} label={badge} />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
