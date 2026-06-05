"use client";

import { useActionState, useId, useState } from "react";
import { completeOnboardingAction } from "./actions";
import { AuthCard } from "@/components/auth/AuthCard";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { initialAuthState, type SignupRole } from "@/lib/auth/auth-utils";

type UniversityOption = {
  id: string;
  name: string;
  shortName: string | null;
};

type OnboardingFormProps = {
  lockedRole?: SignupRole;
  needsName: boolean;
  universities: UniversityOption[];
};

const organizationTypes = [
  ["COMPANY", "Company"],
  ["INVESTOR", "Investor"],
  ["INCUBATOR", "Incubator"],
  ["UNIVERSITY", "University"],
  ["NGO", "NGO"],
  ["RECRUITER", "Recruiter"],
  ["RESEARCHER", "Researcher"],
  ["STARTUP", "Startup"],
  ["GOVERNMENT", "Government"],
  ["OTHER", "Other"],
];

function TextField({ name, label, error }: { name: string; label: string; error?: string }) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      />
      <p className="mt-2 min-h-4 text-xs font-semibold text-red-600">{error ?? ""}</p>
    </div>
  );
}

function SelectField({ name, label, error, children }: { name: string; label: string; error?: string; children: React.ReactNode }) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      >
        {children}
      </select>
      <p className="mt-2 min-h-4 text-xs font-semibold text-red-600">{error ?? ""}</p>
    </div>
  );
}

export function OnboardingForm({ lockedRole, needsName, universities }: OnboardingFormProps) {
  const [role, setRole] = useState<SignupRole>(lockedRole ?? "STUDENT");
  const [state, action, isPending] = useActionState(completeOnboardingAction, initialAuthState);
  const errors = state.errors ?? {};
  const currentRole = lockedRole ?? role;

  return (
    <AuthCard>
      <div>
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
          Profile repair
        </p>
        <h1 className="mt-4 !text-slate-950 text-[clamp(2rem,8vw,2.75rem)] font-black leading-[1.02]">Complete your profile</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          Your authentication account exists, but the platform profile needs a few details before you continue.
        </p>
      </div>

      {state.message ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">{state.message}</div>
      ) : null}

      <form action={action} className="mt-7 grid gap-6">
        <input type="hidden" name="role" value={currentRole} />
        {!lockedRole ? <RoleSelector value={role} onChange={setRole} /> : null}
        {needsName ? <TextField name="fullName" label="Full name" error={errors.fullName} /> : null}

        {currentRole === "STUDENT" ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-1 lg:grid-cols-2">
            <SelectField name="universityId" label="University" error={errors.universityId}>
              <option value="">{universities.length ? "Select university" : "No universities available"}</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </SelectField>
            <TextField name="faculty" label="Faculty" error={errors.faculty} />
            <TextField name="degreeProgram" label="Degree program" error={errors.degreeProgram} />
            <TextField name="academicYear" label="Academic year" error={errors.academicYear} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-1 lg:grid-cols-2">
            <TextField name="organizationName" label="Organization name" error={errors.organizationName} />
            <SelectField name="organizationType" label="Organization type" error={errors.organizationType}>
              <option value="">Select type</option>
              {organizationTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="h-14 w-full rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Completing setup..." : "Complete profile"}
        </button>
      </form>
    </AuthCard>
  );
}
