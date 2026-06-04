"use client";

import { useState } from "react";

export function PrivateAccessModal({ projectTitle, className = "" }: { projectTitle: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        Request Private Access
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] grid place-items-end bg-slate-950/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-5">
          <div className="w-full max-w-lg rounded-t-[2rem] bg-white p-5 shadow-2xl shadow-black/25 sm:rounded-[2rem] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-600">Protected files</p>
                <h2 className="mt-2 !text-slate-950 text-2xl font-black">Request private access</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Full reports, datasets, source code, and documents for {projectTitle} require owner approval.
                </p>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-lg font-black text-slate-700"
                aria-label="Close private access request"
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Reason for access
                <textarea
                  rows={4}
                  placeholder="Explain what you need to review and why..."
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </label>
              <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                <span>I understand private files cannot be copied, shared, or used without permission.</span>
              </label>
              <div className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
                Login is required before this request can be submitted.
              </div>
              <button
                type="button"
                className="min-h-12 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white"
                onClick={() => setIsOpen(false)}
              >
                Got it
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
