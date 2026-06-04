type MissionMilestone = {
  step: string;
  title: string;
  description: string;
};

const milestones: MissionMilestone[] = [
  {
    step: "01",
    title: "Submitted",
    description: "Students complete projects, research, prototypes, or creative work.",
  },
  {
    step: "02",
    title: "Discovered",
    description: "Industry partners find work by category, university, field, or opportunity type.",
  },
  {
    step: "03",
    title: "Connected",
    description: "Creators receive requests for collaboration, hiring, investment, licensing, or access.",
  },
  {
    step: "04",
    title: "Impact",
    description: "Academic work becomes real visibility, career proof, partnerships, and innovation.",
  },
];

function MissionIntro() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-emerald-700">From Submission to Impact</p>
      <h2 id="impact-mission-title" className="mt-5 text-[clamp(2.125rem,9vw,2.75rem)] font-extrabold leading-[1.02] text-slate-950 md:text-5xl lg:text-6xl">
        Your university work deserves a life beyond the classroom.
      </h2>
      <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg lg:text-[1.18rem]">
        Every year, students create useful projects, research, prototypes, and creative work. Most of them disappear after
        grading. This platform helps bring them to the people who can use, support, fund, hire, or grow them.
      </p>
      <a
        href="/how-it-works"
        className="group mt-7 inline-flex rounded-xl text-sm font-extrabold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        See how projects create opportunities
        <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}

function TimelineItem({ milestone, index }: { milestone: MissionMilestone; index: number }) {
  const desktopOffsets = ["lg:translate-y-2", "lg:-translate-y-8", "lg:translate-y-10", "lg:-translate-y-2"];

  return (
    <li className={`relative flex gap-4 lg:block ${desktopOffsets[index]}`}>
      <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white bg-slate-950 text-xs font-black text-white shadow-xl shadow-slate-900/15 lg:mx-auto">
        {milestone.step}
      </div>
      <div className="pb-8 lg:mt-5 lg:pb-0 lg:text-center">
        <h3 className="text-xl font-extrabold leading-tight text-slate-950">{milestone.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 lg:mx-auto">{milestone.description}</p>
      </div>
    </li>
  );
}

function ImpactTimeline() {
  return (
    <div className="relative mt-12 lg:mt-0">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-emerald-300 via-blue-300 to-transparent lg:left-0 lg:right-0 lg:top-[5.2rem] lg:mx-auto lg:h-px lg:w-[82%] lg:bg-gradient-to-r" aria-hidden="true" />
      <div className="absolute right-0 top-8 hidden h-72 w-72 rounded-full bg-blue-400/10 blur-3xl lg:block" aria-hidden="true" />
      <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-6">
        {milestones.map((milestone, index) => (
          <TimelineItem key={milestone.title} milestone={milestone} index={index} />
        ))}
      </ol>
    </div>
  );
}

export function ImpactMissionSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAFAF7] py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="impact-mission-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(37,99,235,0.10),transparent_28%)]" />
      <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-white/70 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-14 lg:px-8">
        <MissionIntro />
        <ImpactTimeline />
      </div>
    </section>
  );
}
