type TrustFeature = {
  title: string;
  description: string;
  label: string;
  accent: string;
};

const trustFeatures: TrustFeature[] = [
  {
    title: "No Public Contact Details",
    description: "Student phone numbers and emails are not shown publicly. Contact starts through platform requests.",
    label: "Contact",
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "Private Files Stay Locked",
    description: "Reports, source code, datasets, and full documents are shared only after approved access.",
    label: "Files",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: "Admin Reviewed Projects",
    description: "Projects are checked before publishing to reduce fake, copied, or unsafe listings.",
    label: "Review",
    accent: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  {
    title: "Verified Badges",
    description: "Students, universities, demos, team consent, and project status can be verified with clear badges.",
    label: "Verify",
    accent: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    title: "Team Consent",
    description: "Group projects need agreement from all members before commercial interest or private access.",
    label: "Team",
    accent: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    title: "Platform-Based Requests",
    description: "Companies and partners request contact, private access, or collaboration through the platform.",
    label: "Request",
    accent: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
];

function SectionIntro() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm shadow-slate-900/[0.04]">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
        Trust & protection
      </div>
      <h2 id="trust-protection-title" className="mt-5 text-[clamp(2.125rem,8vw,2.75rem)] font-extrabold leading-tight text-slate-950 md:text-5xl">
        Built for Safe Project Discovery
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        Students stay protected. Industry partners discover trusted projects. Every request, file, and contact step is
        handled with care.
      </p>
    </div>
  );
}

function ProtectionSummary() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/[0.07] sm:p-8 lg:p-10">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">Protection flow</p>
      <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">
        Share enough to be discovered. Keep sensitive details controlled.
      </h3>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Public listings help partners understand the opportunity, while private files, creator contact details, and
        sensitive materials stay behind approval steps.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {["Public preview", "Access request", "Approved sharing"].map((item, index) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-xs font-black text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-sm font-extrabold text-slate-900">{item}</p>
          </div>
        ))}
      </div>

      <a
        href="/trust-safety"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
      >
        Learn how protection works
        <span className="ml-2" aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}

function TrustCard({ feature }: { feature: TrustFeature }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/[0.05] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.08]">
      <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${feature.accent}`}>
        {feature.label}
      </div>
      <h3 className="mt-4 text-xl font-extrabold leading-tight text-slate-950">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
    </article>
  );
}

export function TrustProtectionSection() {
  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_54%,#eef6ff_100%)] py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="trust-protection-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_86%_82%,rgba(16,185,129,0.09),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionIntro />

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-6">
          <ProtectionSummary />

          <div className="grid gap-4 sm:grid-cols-2">
            {trustFeatures.map((feature) => (
              <TrustCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
