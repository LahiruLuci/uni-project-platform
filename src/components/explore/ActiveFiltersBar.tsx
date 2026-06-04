import Link from "next/link";
import { createExploreHref, formatEnumLabel } from "./format";

type FilterLookup = {
  categories: Array<{ name: string; slug: string }>;
  universities: Array<{ id: string; name: string }>;
};

type ActiveFiltersBarProps = {
  totalCount: number;
  currentParams: Record<string, string | undefined>;
  filters: FilterLookup;
};

export function ActiveFiltersBar({ totalCount, currentParams, filters }: ActiveFiltersBarProps) {
  const chips = [
    currentParams.q ? { key: "q", label: `"${currentParams.q}"` } : null,
    currentParams.category
      ? {
          key: "category",
          label: filters.categories.find((category) => category.slug === currentParams.category)?.name ?? currentParams.category,
        }
      : null,
    currentParams.university
      ? {
          key: "university",
          label: filters.universities.find((university) => university.id === currentParams.university)?.name ?? "University",
        }
      : null,
    currentParams.type ? { key: "type", label: formatEnumLabel(currentParams.type) } : null,
    currentParams.opportunity ? { key: "opportunity", label: formatEnumLabel(currentParams.opportunity) } : null,
  ].filter(Boolean) as Array<{ key: string; label: string }>;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-extrabold text-slate-700">
        {totalCount} {totalCount === 1 ? "project" : "projects"} found
      </p>
      {chips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <Link
              key={chip.key}
              href={createExploreHref(currentParams, { [chip.key]: undefined, page: undefined })}
              scroll={false}
              className="inline-flex min-h-9 items-center rounded-full border border-blue-100 bg-blue-50 px-3 text-xs font-extrabold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {chip.label}
              <span className="ml-2" aria-hidden="true">
                x
              </span>
            </Link>
          ))}
          <Link
            href="/explore"
            scroll={false}
            className="inline-flex min-h-9 items-center rounded-full px-3 text-xs font-extrabold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            Clear all
          </Link>
        </div>
      ) : null}
    </div>
  );
}
