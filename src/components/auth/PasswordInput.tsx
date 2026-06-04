"use client";

import { useId, useState } from "react";

export function PasswordInput({
  name,
  label,
  autoComplete,
  error,
  hint,
}: {
  name: string;
  label: string;
  autoComplete: string;
  error?: string;
  hint?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = useId();
  const helperId = `${inputId}-helper`;

  return (
    <div className="min-w-0">
      <label htmlFor={inputId} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <div className="relative mt-2 w-full">
        <input
          id={inputId}
          name={name}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          aria-describedby={hint || error ? helperId : undefined}
          aria-invalid={Boolean(error)}
          className={`h-14 w-full rounded-2xl border bg-white px-4 pr-20 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:ring-4 ${
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
          }`}
        />
        <button
          type="button"
          aria-label={isVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl px-2.5 py-1.5 text-xs font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      <p id={helperId} className={`mt-2 min-h-4 text-xs font-semibold ${error ? "text-red-600" : "text-slate-500"}`}>
        {error ?? hint ?? ""}
      </p>
    </div>
  );
}
