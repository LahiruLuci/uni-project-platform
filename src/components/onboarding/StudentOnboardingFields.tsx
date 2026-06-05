"use client";

import { useId } from "react";

export function TextField({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
  helper,
  error,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
}) {
  const id = useId();
  const helperId = `${id}-helper`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={helper || error ? helperId : undefined}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      />
      <p id={helperId} className={`mt-2 min-h-4 text-xs font-semibold ${error ? "text-red-600" : "text-slate-500"}`}>
        {error ?? helper ?? ""}
      </p>
    </div>
  );
}

export function SelectField({
  name,
  label,
  defaultValue,
  helper,
  error,
  children,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const helperId = `${id}-helper`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={helper || error ? helperId : undefined}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      >
        {children}
      </select>
      <p id={helperId} className={`mt-2 min-h-4 text-xs font-semibold ${error ? "text-red-600" : "text-slate-500"}`}>
        {error ?? helper ?? ""}
      </p>
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
}) {
  const id = useId();

  return (
    <div className="min-w-0 lg:col-span-2">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={4}
        aria-invalid={Boolean(error)}
        className={`mt-2 w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      />
      <p className="mt-2 min-h-4 text-xs font-semibold text-red-600">{error ?? ""}</p>
    </div>
  );
}
