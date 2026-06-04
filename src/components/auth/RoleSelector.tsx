"use client";

import type { SignupRole } from "@/lib/auth/auth-utils";

const roles: Array<{ value: SignupRole; label: string; helper: string }> = [
  { value: "STUDENT", label: "Student", helper: "Showcase your completed university work." },
  { value: "INDUSTRY_PARTNER", label: "Industry & Partner", helper: "Discover projects, research, and talent." },
];

export function RoleSelector({ value, onChange }: { value: SignupRole; onChange: (value: SignupRole) => void }) {
  return (
    <div className="grid gap-3 min-[390px]:grid-cols-2" role="radiogroup" aria-label="Choose account type">
      {roles.map((role) => {
        const isActive = value === role.value;

        return (
          <button
            key={role.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`group relative min-w-0 overflow-hidden rounded-2xl border p-3.5 text-left transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              isActive
                ? "border-slate-950 bg-[linear-gradient(135deg,#020617,#111827)] text-white shadow-xl shadow-slate-900/15"
                : "border-slate-200 bg-slate-50 text-slate-950 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-lg hover:shadow-slate-900/[0.05]"
            }`}
            onClick={() => onChange(role.value)}
          >
            <span className={`absolute right-3.5 top-3.5 h-5 w-5 rounded-full border ${isActive ? "border-emerald-300 bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.55)]" : "border-slate-300 bg-white"}`}>
              {isActive ? <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950" /> : null}
            </span>
            <span className={`block pr-7 text-sm font-black ${isActive ? "text-white" : "text-slate-950"}`}>{role.label}</span>
            <span className={`mt-1.5 block text-xs font-semibold leading-5 ${isActive ? "text-white/68" : "text-slate-500"}`}>{role.helper}</span>
          </button>
        );
      })}
    </div>
  );
}
