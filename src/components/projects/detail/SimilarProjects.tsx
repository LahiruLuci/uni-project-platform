import type { SimilarProject } from "@/lib/projects/detail-queries";
import { ExploreProjectCard } from "@/src/components/explore/ExploreProjectCard";

export function SimilarProjects({ projects }: { projects: SimilarProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">More to discover</p>
          <h2 className="mt-2 !text-slate-950 text-3xl font-black">Similar projects</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <ExploreProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
