import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatProjectValue, opportunityLabels } from "./project-detail-utils";

const opportunityCopy: Record<string, string> = {
  COLLABORATION: "Work with the creator or team to improve, validate, or deploy the project.",
  HIRING: "Discover student talent for internships, freelance work, or future roles.",
  INVESTMENT: "Explore funding, startup support, or incubation potential.",
  LICENSING: "Discuss permission to use or adapt the solution commercially.",
  ACQUISITION: "Explore acquiring the project, assets, or concept with owner approval.",
  RESEARCH_PARTNER: "Build research partnerships, pilots, or academic-industry work.",
  SPONSORSHIP: "Support project development, testing, or real-world deployment.",
};

export function OpportunitySection({ project }: { project: ProjectDetail }) {
  if (project.opportunities.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
        <h2 className="!text-slate-950 text-2xl font-black">Opportunities</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Not currently open for commercial opportunities.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Available paths</p>
      <h2 className="mt-2 !text-slate-950 text-2xl font-black">Opportunities</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {project.opportunities.map((opportunity) => (
          <div key={opportunity.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="!text-slate-950 text-lg font-black">
              {opportunityLabels[opportunity.opportunityType] ?? formatProjectValue(opportunity.opportunityType)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{opportunityCopy[opportunity.opportunityType] ?? "Discuss a real-world opportunity with the project owner."}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
