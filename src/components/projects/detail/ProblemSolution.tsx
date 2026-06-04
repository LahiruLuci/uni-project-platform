import type { ProjectDetail } from "@/lib/projects/detail-queries";

export function ProblemSolution({ project }: { project: ProjectDetail }) {
  const panels = [
    {
      title: "Problem",
      text: project.problemStatement,
      tone: "border-rose-100 bg-rose-50/70",
    },
    {
      title: "Solution",
      text: project.solutionOverview,
      tone: "border-emerald-100 bg-emerald-50/70",
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-2">
      {panels.map((panel) => (
        <div key={panel.title} className={`rounded-[1.75rem] border p-6 shadow-lg shadow-slate-900/[0.04] ${panel.tone}`}>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{panel.title}</p>
          <h2 className="mt-3 !text-slate-950 text-2xl font-black">{panel.title === "Problem" ? "Why it matters" : "How it works"}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            {panel.text ?? `${panel.title} details have not been added by the project owner yet.`}
          </p>
        </div>
      ))}
    </section>
  );
}
