import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { CategoryMeta, getHeroMediaUrl, getMainOpportunities, getTrustBadges, GradientVisual, OpportunityBadge, TrustBadge } from "./project-detail-utils";
import { ProjectActionButtons } from "./ProjectActionButtons";

export function ProjectHero({ project }: { project: ProjectDetail }) {
  const opportunities = getMainOpportunities(project, 2);
  const trustBadges = getTrustBadges(project).slice(0, 4);
  const heroMediaUrl = getHeroMediaUrl(project);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_16%_18%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(16,185,129,0.12),transparent_28%)] bg-slate-50 pt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 sm:px-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.78fr)] lg:px-8 lg:pb-20">
        <div className="flex flex-col justify-center">
          <CategoryMeta project={project} />
          <div className="mt-4 flex flex-wrap gap-2">
            {(opportunities.length ? opportunities : ["Open for Opportunities"]).map((label) => (
              <OpportunityBadge key={label} label={label} />
            ))}
          </div>

          <h1
            className="mt-5 !text-slate-950 text-[clamp(2.4rem,10vw,4.75rem)] font-black leading-[0.98] tracking-tight"
            style={{ color: "#0f172a" }}
          >
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">{project.shortSummary}</p>
          <p className="mt-4 text-sm font-black text-slate-500">{project.university?.name ?? "Sri Lankan university project"}</p>

          {trustBadges.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <TrustBadge key={badge} label={badge} />
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            <ProjectActionButtons projectTitle={project.title} />
          </div>
        </div>

        <div className="lg:pt-8">
          <div className="rounded-[2rem] border border-white bg-white/75 p-3 shadow-2xl shadow-slate-900/[0.1] backdrop-blur">
            {heroMediaUrl ? (
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroMediaUrl})` }}
                role="img"
                aria-label={`${project.title} preview`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-transparent to-transparent" />
                {opportunities[0] ? (
                  <div className="absolute bottom-5 left-5 max-w-[calc(100%-2.5rem)] rounded-2xl border border-white/30 bg-slate-950/40 px-4 py-3 text-sm font-black text-white shadow-xl backdrop-blur-md">
                    {opportunities[0]}
                  </div>
                ) : null}
              </div>
            ) : (
              <GradientVisual project={project} className="aspect-[4/3] rounded-[1.55rem]" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
