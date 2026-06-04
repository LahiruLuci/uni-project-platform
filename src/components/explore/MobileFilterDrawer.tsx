"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { formatEnumLabel } from "./format";

type FilterOption = {
  id?: string;
  name: string;
  slug?: string;
};

type MobileFilterDrawerProps = {
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

function SelectField({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      >
        {children}
      </select>
    </label>
  );
}

export function MobileFilterDrawer({
  categories,
  universities,
  projectTypes,
  opportunityTypes,
  currentParams,
}: MobileFilterDrawerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <button
        type="button"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        {isLoading ? "Applying Filters" : "Filter & Sort"}
      </button>

      <div
        className={`fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-[80] max-h-[88svh] overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-2xl shadow-black/25 transition duration-300 lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-extrabold text-slate-950">Filter & Sort</p>
            <p className="text-sm text-slate-500">Refine the project marketplace.</p>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-lg font-black text-slate-700"
            aria-label="Close filters"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
        </div>

        {isLoading ? (
          <div className="mb-4 rounded-3xl border border-blue-200 bg-blue-50 p-4 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-slate-950" />
            <p className="mt-3 text-sm font-extrabold text-slate-950">Applying filters</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">Refreshing project results...</p>
          </div>
        ) : null}

        <form action="/explore" className="grid gap-4" onSubmit={handleSubmit}>
          <input type="hidden" name="q" value={currentParams.q ?? ""} />
          <SelectField label="Category" name="category" defaultValue={currentParams.category}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="University" name="university" defaultValue={currentParams.university}>
            <option value="">All universities</option>
            {universities.map((university) => (
              <option key={university.id} value={university.id}>
                {university.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Project type" name="type" defaultValue={currentParams.type}>
            <option value="">All types</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {formatEnumLabel(type)}
              </option>
            ))}
          </SelectField>
          <SelectField label="Opportunity" name="opportunity" defaultValue={currentParams.opportunity}>
            <option value="">All opportunities</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {formatEnumLabel(type)}
              </option>
            ))}
          </SelectField>
          <SelectField label="Sort" name="sort" defaultValue={currentParams.sort}>
            <option value="newest">Newest</option>
            <option value="featured">Featured</option>
            <option value="views">Most Viewed</option>
            <option value="az">A-Z</option>
          </SelectField>

          <div className="sticky bottom-0 grid gap-3 bg-white pt-2">
            <button
              className="min-h-12 rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white disabled:cursor-wait disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Applying" : "Apply Filters"}
            </button>
            <a className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-extrabold text-slate-800" href="/explore">
              Clear Filters
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
