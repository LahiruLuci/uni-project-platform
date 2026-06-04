import type { ProjectDetail } from "@/lib/projects/detail-queries";

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
      <h2 className="!text-slate-950 text-2xl font-black">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{children}</div>
    </div>
  );
}

export function ProjectOverview({ project }: { project: ProjectDetail }) {
  const tags = project.tags.map((item) => item.tag.name);

  return (
    <DetailBlock title="Project Overview">
      <p>{project.fullDescription ?? project.shortSummary}</p>
      {tags.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Tools / Methods / Technologies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-500">Tools, methods, or technologies have not been added by the project owner yet.</p>
        </div>
      )}
    </DetailBlock>
  );
}
