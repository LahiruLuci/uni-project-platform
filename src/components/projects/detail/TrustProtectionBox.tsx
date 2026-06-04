import type { ProjectDetail } from "@/lib/projects/detail-queries";

export function TrustProtectionBox({ project }: { project: ProjectDetail }) {
  const items = [
    "Contact starts through platform requests",
    "Private files and source materials stay locked",
    project.verified ? "Admin reviewed listing" : "Published listing review required",
    project.ownership?.allMembersAgreed ? "Team consent recorded" : "Team consent can be reviewed during access request",
    "No public phone number or email shown",
  ];

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Trust & Protection</p>
      <h2 className="mt-2 !text-white text-2xl font-black">Safe public discovery</h2>
      <p className="mt-4 text-sm leading-7 text-white/70">
        This project can be explored publicly, but private files and creator contact details are protected.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-white/82">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
