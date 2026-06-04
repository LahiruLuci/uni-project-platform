"use client";

import Link from "next/link";

export default function ExploreError() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5">
      <div className="max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.06]">
        <h1 className="text-2xl font-extrabold text-slate-950">Unable to load projects</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Please try again in a moment.</p>
        <Link
          href="/explore"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-extrabold text-white"
        >
          Reload Explore
        </Link>
      </div>
    </main>
  );
}
