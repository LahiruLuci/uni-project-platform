"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { formatEnumLabel } from "./format";

type FilterOption = {
  id?: string;
  name: string;
  slug?: string;
};

type ExploreSearchFiltersProps = {
  categories: FilterOption[];
  universities: FilterOption[];
  projectTypes: string[];
  opportunityTypes: string[];
  currentParams: Record<string, string | undefined>;
};

function createExploreUrl(form: HTMLFormElement) {
  const data = new FormData(form);
  const params = new URLSearchParams();

  for (const [key, value] of data.entries()) {
    const textValue = String(value).trim();
    if (textValue) {
      params.set(key, textValue);
    }
  }

  const query = params.toString();
  return query ? `/explore?${query}` : "/explore";
}

function DesktopSelect({
  name,
  label,
  defaultValue,
  children,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold normal-case tracking-normal text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      >
        {children}
      </select>
    </label>
  );
}

function ExplorePendingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-20 grid place-items-center rounded-[1.75rem] border border-blue-200/70 bg-white/82 px-5 text-center shadow-2xl shadow-blue-950/10 backdrop-blur-xl">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-950 shadow-2xl shadow-slate-950/20">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/25 border-t-emerald-300" />
        </div>
        <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-blue-700">Searching marketplace</p>
        <p className="mt-2 text-sm font-semibold text-slate-600">Finding the best student innovations for your filters.</p>
      </div>
    </div>
  );
}

export function ExploreSearchFilters({
  categories,
  universities,
  projectTypes,
  opportunityTypes,
  currentParams,
}: ExploreSearchFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showLocalLoader, setShowLocalLoader] = useState(false);
  const isLoading = isPending || showLocalLoader;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextUrl = createExploreUrl(event.currentTarget);
    setShowLocalLoader(true);
    window.setTimeout(() => setShowLocalLoader(false), 5500);

    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  return (
    <section className="relative z-20 -mt-10 px-5 sm:px-6 lg:px-8" aria-label="Search and filters">
      <div className="relative mx-auto max-w-7xl rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/[0.08]">
        <ExplorePendingOverlay isVisible={isLoading} />

        <form action="/explore" className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Search projects
              <input
                name="q"
                type="search"
                defaultValue={currentParams.q ?? ""}
                placeholder="Search by project, category, university, field, or keyword..."
                className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="hidden min-h-12 rounded-2xl bg-slate-950 px-6 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-wait disabled:opacity-70 lg:inline-flex lg:items-center"
            >
              {isLoading ? "Searching" : "Search"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-wait disabled:opacity-70 lg:hidden"
          >
            {isLoading ? "Searching" : "Search"}
          </button>

          <div className="hidden grid-cols-5 gap-3 lg:grid">
            <DesktopSelect name="category" label="Category" defaultValue={currentParams.category}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </DesktopSelect>
            <DesktopSelect name="university" label="University" defaultValue={currentParams.university}>
              <option value="">All universities</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </DesktopSelect>
            <DesktopSelect name="type" label="Project type" defaultValue={currentParams.type}>
              <option value="">All types</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {formatEnumLabel(type)}
                </option>
              ))}
            </DesktopSelect>
            <DesktopSelect name="opportunity" label="Opportunity" defaultValue={currentParams.opportunity}>
              <option value="">All opportunities</option>
              {opportunityTypes.map((type) => (
                <option key={type} value={type}>
                  {formatEnumLabel(type)}
                </option>
              ))}
            </DesktopSelect>
            <DesktopSelect name="sort" label="Sort" defaultValue={currentParams.sort}>
              <option value="newest">Newest</option>
              <option value="featured">Featured</option>
              <option value="views">Most Viewed</option>
              <option value="az">A-Z</option>
            </DesktopSelect>
          </div>
        </form>

        <div className="mt-3 lg:hidden">
          <MobileFilterDrawer
            categories={categories}
            universities={universities}
            projectTypes={projectTypes}
            opportunityTypes={opportunityTypes}
            currentParams={currentParams}
          />
        </div>
      </div>
    </section>
  );
}
