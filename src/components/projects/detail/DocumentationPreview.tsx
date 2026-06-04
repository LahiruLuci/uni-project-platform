import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatProjectValue } from "./project-detail-utils";
import { PrivateAccessModal } from "./PrivateAccessModal";

export function DocumentationPreview({ project }: { project: ProjectDetail }) {
  const fileEntries = Object.entries(project.fileSummary);

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-600">Protected documentation</p>
      <h2 className="mt-2 !text-slate-950 text-2xl font-black">Documentation preview</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        {project.fullDescription ?? project.shortSummary}
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-purple-200 bg-purple-50 p-5">
        <h3 className="!text-purple-950 text-xl font-black">Full documentation is protected</h3>
        <p className="mt-3 text-sm leading-7 text-purple-800">
          Reports, source code, datasets, presentations, and detailed project files are available only after approved private access.
        </p>

        {fileEntries.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {fileEntries.map(([type, count]) => (
              <span key={type} className="rounded-full border border-purple-200 bg-white px-3 py-1.5 text-xs font-black text-purple-800">
                {formatProjectValue(type)} available ({count})
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm font-bold text-purple-700">No private file metadata has been published yet.</p>
        )}

        <div className="mt-5">
          <PrivateAccessModal
            projectTitle={project.title}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
