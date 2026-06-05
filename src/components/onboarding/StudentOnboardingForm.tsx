"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveStudentOnboardingAction } from "@/app/onboarding/student/actions";
import { initialAuthState } from "@/lib/auth/auth-utils";
import { OptionalProfileFields } from "./OptionalProfileFields";
import { OnboardingTrustNote } from "./OnboardingTrustNote";
import { SelectField, TextField } from "./StudentOnboardingFields";

type UniversityOption = {
  id: string;
  name: string;
  shortName: string | null;
};

type StudentOnboardingDefaults = {
  fullName: string;
  universityId?: string | null;
  faculty?: string | null;
  degreeProgram?: string | null;
  academicYear?: string | null;
  universityEmail?: string | null;
  bio?: string | null;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
  avatarUrl?: string | null;
};

const academicYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year", "Postgraduate", "Other"];

export function StudentOnboardingForm({
  defaults,
  universities,
}: {
  defaults: StudentOnboardingDefaults;
  universities: UniversityOption[];
}) {
  const [state, action, isPending] = useActionState(saveStudentOnboardingAction, initialAuthState);
  const [showOptional, setShowOptional] = useState(false);
  const errors = state.errors ?? {};

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/[0.08] sm:p-6 lg:rounded-[2rem] lg:p-8">
      <div>
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
          Step 1 of 2 · Student profile
        </p>
        <h1 className="mt-4 !text-slate-950 text-[clamp(2rem,8vw,2.75rem)] font-black leading-[1.02]">Complete your student profile</h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
          Add your university details so your projects can be reviewed, trusted, and connected with real opportunities.
        </p>
      </div>

      <div className="mt-5">
        <OnboardingTrustNote />
      </div>

      {state.message ? (
        <div className={`mt-5 rounded-2xl border p-4 text-sm font-bold leading-6 ${state.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      ) : null}

      <form action={action} className="mt-7 grid gap-6">
        <div className="grid grid-cols-1 gap-x-5 gap-y-1 lg:grid-cols-2">
          <TextField name="fullName" label="Full name" defaultValue={defaults.fullName} error={errors.fullName} />
          <SelectField name="universityId" label="University" defaultValue={defaults.universityId ?? ""} error={errors.universityId}>
            <option value="">{universities.length ? "Select university" : "No universities are available yet. Please contact support."}</option>
            {universities.map((university) => (
              <option key={university.id} value={university.id}>
                {university.shortName ? `${university.name} (${university.shortName})` : university.name}
              </option>
            ))}
          </SelectField>
          <TextField name="faculty" label="Faculty" placeholder="Example: Faculty of Computing" defaultValue={defaults.faculty ?? ""} error={errors.faculty} />
          <TextField name="degreeProgram" label="Degree program" placeholder="Example: BSc in Information Technology" defaultValue={defaults.degreeProgram ?? ""} error={errors.degreeProgram} />
          <SelectField name="academicYear" label="Academic year" defaultValue={defaults.academicYear ?? ""} error={errors.academicYear}>
            <option value="">Select academic year</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </SelectField>
        </div>

        <button
          type="button"
          className="w-fit rounded-xl text-sm font-black text-slate-700 transition hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100"
          onClick={() => setShowOptional((current) => !current)}
        >
          {showOptional ? "Hide optional profile details" : "Add optional profile details"}
        </button>

        {showOptional ? <OptionalProfileFields defaults={defaults} errors={errors} /> : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <button
            type="submit"
            disabled={isPending}
            className="h-14 w-full rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Saving profile..." : "Save and continue"}
          </button>
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            Back to home
          </Link>
        </div>
      </form>
    </section>
  );
}
