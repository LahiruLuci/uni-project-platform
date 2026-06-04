import type { Metadata } from "next";
import { ActiveFiltersBar } from "@/src/components/explore/ActiveFiltersBar";
import { ExploreEmptyState } from "@/src/components/explore/ExploreEmptyState";
import { ExploreHero } from "@/src/components/explore/ExploreHero";
import { ExplorePagination } from "@/src/components/explore/ExplorePagination";
import { ExploreSearchFilters } from "@/src/components/explore/ExploreSearchFilters";
import { ProjectGrid } from "@/src/components/explore/ProjectGrid";
import { getExploreFilters, getExploreProjects, type ExploreParams } from "@/src/lib/projects/queries";

export const metadata: Metadata = {
  title: "Explore Projects | UniVenture",
  description: "Discover student projects, research, prototypes, and creative work from universities across Sri Lanka.",
};

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function normalizeSearchParams(params: Record<string, string | string[] | undefined>): ExploreParams {
  const getValue = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    q: getValue("q"),
    category: getValue("category"),
    university: getValue("university"),
    type: getValue("type"),
    opportunity: getValue("opportunity"),
    sort: getValue("sort"),
    page: getValue("page"),
  };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const currentParams = normalizeSearchParams(await searchParams);
  const [filters, result] = await Promise.all([getExploreFilters(), getExploreProjects(currentParams)]);

  return (
    <main className="min-h-screen bg-slate-50">
      <ExploreHero />
      <ExploreSearchFilters
        key={JSON.stringify(currentParams)}
        categories={filters.categories}
        universities={filters.universities}
        projectTypes={filters.projectTypes}
        opportunityTypes={filters.opportunityTypes}
        currentParams={currentParams}
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12" aria-label="Project results">
        <ActiveFiltersBar totalCount={result.totalCount} currentParams={currentParams} filters={filters} />

        <div className="mt-6">
          {result.projects.length > 0 ? <ProjectGrid projects={result.projects} /> : <ExploreEmptyState />}
        </div>

        <ExplorePagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          currentParams={currentParams}
        />
      </section>
    </main>
  );
}
