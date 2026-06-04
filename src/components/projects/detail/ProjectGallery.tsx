import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatProjectValue, GradientVisual } from "./project-detail-utils";

function isRenderablePublicMedia(url: string) {
  return Boolean(url) && !url.startsWith("/images/project-");
}

export function ProjectGallery({ project }: { project: ProjectDetail }) {
  const media = project.media.filter((item) => isRenderablePublicMedia(item.url)).slice(0, 4);

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Gallery / Demo</p>
          <h2 className="mt-2 !text-slate-950 text-2xl font-black">Project visuals and public links</h2>
        </div>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white"
          >
            View Demo
          </a>
        ) : (
          <span className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-100 px-5 text-sm font-black text-slate-500">
            Demo not available
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {media.length > 0 ? (
          media.map((item) => (
            <div
              key={item.id}
              className="aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.url})` }}
              role="img"
              aria-label={item.altText ?? project.title}
            />
          ))
        ) : (
          <GradientVisual project={project} className="aspect-[16/10] rounded-3xl sm:col-span-2" />
        )}
      </div>

      {project.publicLinks.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.publicLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {formatProjectValue(link.linkType)}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
