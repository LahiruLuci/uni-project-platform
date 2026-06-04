import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorTeamSection } from "@/src/components/projects/detail/CreatorTeamSection";
import { DocumentationPreview } from "@/src/components/projects/detail/DocumentationPreview";
import { OpportunitySection } from "@/src/components/projects/detail/OpportunitySection";
import { ProblemSolution } from "@/src/components/projects/detail/ProblemSolution";
import { ProjectGallery } from "@/src/components/projects/detail/ProjectGallery";
import { ProjectFactsGrid } from "@/src/components/projects/detail/ProjectFactsGrid";
import { ProjectHero } from "@/src/components/projects/detail/ProjectHero";
import { ProjectOverview } from "@/src/components/projects/detail/ProjectOverview";
import { ProjectQuickPanel } from "@/src/components/projects/detail/ProjectQuickPanel";
import { SimilarProjects } from "@/src/components/projects/detail/SimilarProjects";
import { TrustProtectionBox } from "@/src/components/projects/detail/TrustProtectionBox";
import { getProjectBySlug, getSimilarProjects } from "@/src/lib/projects/detail-queries";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | UniVenture",
    };
  }

  return {
    title: `${project.title} | UniVenture`,
    description: project.shortSummary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const similarProjects = await getSimilarProjects(project);

  return (
    <main className="min-h-screen bg-slate-50">
      <ProjectHero project={project} />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-14 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid gap-6">
          <ProjectOverview project={project} />
          <ProjectFactsGrid project={project} />
          <ProblemSolution project={project} />
          <ProjectGallery project={project} />
          <DocumentationPreview project={project} />
          <OpportunitySection project={project} />
          <CreatorTeamSection project={project} />
          <TrustProtectionBox project={project} />
        </div>

        <div className="order-first lg:order-none">
          <ProjectQuickPanel project={project} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <SimilarProjects projects={similarProjects} />
      </section>
    </main>
  );
}
