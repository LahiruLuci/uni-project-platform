import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatDate, formatProjectValue, getCategoryLabel } from "./project-detail-utils";

function FactCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/78 p-5 shadow-lg shadow-slate-900/[0.035]">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-sm font-black leading-6 text-slate-950">{value}</p>
    </div>
  );
}

export function ProjectFactsGrid({ project }: { project: ProjectDetail }) {
  const privateFileCount = project.files.length;

  const facts = [
    { label: "Field", value: getCategoryLabel(project) },
    { label: "Project Type", value: formatProjectValue(project.projectType) },
    { label: "Completion Status", value: formatProjectValue(project.completionStatus) },
    { label: "Commercial Status", value: formatProjectValue(project.commercialStatus) },
    { label: "University", value: project.university?.name ?? "Not listed" },
    { label: "Private Access", value: project.visibility === "REQUEST_ONLY" ? "Request required" : "Public summary" },
    { label: "Published Date", value: formatDate(project.publishedAt) },
    { label: "Demo", value: project.demoUrl ? "Available" : "Not available yet" },
    { label: "Private Files", value: privateFileCount > 0 ? `${privateFileCount} protected item${privateFileCount === 1 ? "" : "s"}` : "No file metadata" },
  ];

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.06),transparent_30%)] p-5 shadow-lg shadow-slate-900/[0.04] sm:p-6">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Dossier facts</p>
      <h2 className="mt-2 !text-slate-950 text-2xl font-black">Project Details</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {facts.map((fact) => (
          <FactCard key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>
    </section>
  );
}
