import Link from "next/link";

export function ExploreEmptyState() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.05]">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-2xl font-black text-blue-700" aria-hidden="true">
        0
      </div>
      <h2 className="mt-5 text-2xl font-extrabold text-slate-950">No projects found</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
        Try changing your search keywords or clearing some filters.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/explore"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Clear Filters
        </Link>
        <Link
          href="/explore"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Explore All Projects
        </Link>
      </div>
    </div>
  );
}
