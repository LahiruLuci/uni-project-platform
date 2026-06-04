const categories = [
  "Technology",
  "Engineering",
  "Business",
  "Health",
  "Agriculture",
  "Tourism",
  "Education",
  "Science",
  "Creative / Design",
  "Social Impact",
];

function SearchIcon() {
  return (
    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m20 20-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchBox() {
  return (
    <form className="mx-auto mt-8 w-full max-w-[900px]" role="search">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/[0.08] sm:p-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-h-[54px] flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 sm:bg-transparent">
            <SearchIcon />
            <label htmlFor="project-search" className="sr-only">
              Search student projects
            </label>
            <input
              id="project-search"
              type="search"
              placeholder="Search by project, category, university, field, or keyword..."
              className="min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

function CategoryChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-9 items-center rounded-full border border-slate-200 bg-white/80 px-4 text-sm font-bold text-slate-600 shadow-sm shadow-slate-900/[0.03] transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
    >
      {label}
    </button>
  );
}

export function SearchDiscoverySection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20 xl:py-24"
      aria-labelledby="search-discovery-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="search-discovery-title" className="text-[clamp(2rem,8vw,2.5rem)] font-extrabold leading-tight text-slate-950 md:text-5xl">
            Explore Student Innovation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Search projects, research, prototypes, and creative work across universities.
          </p>
        </div>

        <SearchBox />

        <div className="mx-auto mt-6 flex max-w-[900px] flex-wrap justify-center gap-2.5 sm:mt-7">
          {categories.map((category) => (
            <CategoryChip key={category} label={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
