import Link from "next/link";
import { createExploreHref } from "./format";

type ExplorePaginationProps = {
  currentPage: number;
  totalPages: number;
  currentParams: Record<string, string | undefined>;
};

export function ExplorePagination({ currentPage, totalPages, currentParams }: ExplorePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/[0.04] sm:flex-row" aria-label="Project pagination">
      <p className="text-sm font-bold text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex w-full gap-3 sm:w-auto">
        <Link
          href={createExploreHref(currentParams, { page: String(Math.max(1, currentPage - 1)) })}
          scroll={false}
          aria-disabled={currentPage === 1}
          className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border px-5 text-sm font-extrabold sm:flex-none ${
            currentPage === 1
              ? "pointer-events-none border-slate-200 bg-slate-50 text-slate-300"
              : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
          }`}
        >
          Previous
        </Link>
        <Link
          href={createExploreHref(currentParams, { page: String(Math.min(totalPages, currentPage + 1)) })}
          scroll={false}
          aria-disabled={currentPage === totalPages}
          className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl px-5 text-sm font-extrabold sm:flex-none ${
            currentPage === totalPages
              ? "pointer-events-none bg-slate-100 text-slate-300"
              : "bg-slate-950 text-white hover:bg-slate-800"
          }`}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
