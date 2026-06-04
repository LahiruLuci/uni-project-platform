import type { ExploreProject } from "@/lib/projects/queries";
import { ExploreProjectCard } from "./ExploreProjectCard";

export function ProjectGrid({ projects }: { projects: ExploreProject[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {projects.map((project) => (
        <ExploreProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
