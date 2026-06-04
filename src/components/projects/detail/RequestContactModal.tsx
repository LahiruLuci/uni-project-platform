"use client";

import { useState } from "react";

const purposes = ["Hiring", "Collaboration", "Investment", "Licensing", "Acquisition", "Research", "Sponsorship", "Other"];

export function RequestContactModal({ projectTitle, className = "" }: { projectTitle: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        Request Contact
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] grid place-items-end bg-slate-950/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-5">
          <div className="w-full max-w-lg rounded-t-[2rem] bg-white p-5 shadow-2xl shadow-black/25 sm:rounded-[2rem] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Platform request</p>
                <h2 className="mt-2 !text-slate-950 text-2xl font-black">Request contact</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Contact details stay private. Create an account or log in to send this request for {projectTitle}.
                </p>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-lg font-black text-slate-700"
                aria-label="Close contact request"
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Purpose
                <select className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100">
                  {purposes.map((purpose) => (
                    <option key={purpose}>{purpose}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Short message
                <textarea
                  rows={4}
                  placeholder="Briefly explain why you want to connect..."
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
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
