"use client";

import { PrivateAccessModal } from "./PrivateAccessModal";
import { RequestContactModal } from "./RequestContactModal";

export function ProjectActionButtons({ projectTitle, compact = false }: { projectTitle: string; compact?: boolean }) {
  const primary =
    "inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-200";
  const secondary =
    "inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100";
  const save =
    "inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100";

  return (
    <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-[1fr_1fr_auto]"}>
      <RequestContactModal projectTitle={projectTitle} className={primary} />
      <PrivateAccessModal projectTitle={projectTitle} className={secondary} />
      <button type="button" className={save} aria-label={`Save ${projectTitle}`}>
        Save +
      </button>
    </div>
  );
}
