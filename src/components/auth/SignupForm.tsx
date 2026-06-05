"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { signupAction } from "@/app/signup/actions";
import { initialAuthState, type SignupRole } from "@/lib/auth/auth-utils";
import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";
import { RoleSelector } from "./RoleSelector";

type UniversityOption = {
  id: string;
  name: string;
  shortName: string | null;
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

function TextField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      />
      <p id={errorId} className="mt-2 min-h-4 text-xs font-semibold text-red-600">
        {error ?? ""}
      </p>
    </div>
  );
}

function SelectField({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      >
        {children}
      </select>
      <p id={errorId} className="mt-2 min-h-4 text-xs font-semibold text-red-600">
        {error ?? ""}
      </p>
    </div>
  );
}

function TextAreaField({ name, label, error }: { name: string; label: string; error?: string }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0 lg:col-span-2">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition hover:border-slate-300 focus:ring-4 ${
          error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-slate-950 focus:ring-slate-100"
        }`}
      />
      <p id={errorId} className="mt-2 min-h-4 text-xs font-semibold text-red-600">
        {error ?? ""}
      </p>
    </div>
  );
}

export function SignupForm({
  universities,
  initialRole = "STUDENT",
}: {
  universities: UniversityOption[];
  initialRole?: SignupRole;
}) {
  const [role, setRole] = useState<SignupRole>(initialRole);
  const [showOptional, setShowOptional] = useState(false);
  const [state, action, isPending] = useActionState(signupAction, initialAuthState);
  const errors = state.errors ?? {};

  return (
    <AuthCard>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
            Account setup
          </p>
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Student or partner</span>
        </div>
        <h1 className="mt-4 !text-slate-950 text-[clamp(2rem,8vw,2.75rem)] font-black leading-[1.02]">Create your account</h1>
        <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
          Join as a student creator or industry partner and start connecting university innovation with real opportunities.
        </p>
      </div>

      {state.message ? (
        <div className={`mt-5 rounded-2xl border p-4 text-sm font-bold leading-6 ${state.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>
          {state.message}
        </div>
      ) : null}

      <form action={action} className="mt-7 grid gap-6">
        <input type="hidden" name="role" value={role} />

        <div className="grid gap-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Choose your path</p>
          <RoleSelector value={role} onChange={setRole} />
          {errors.role ? <p className="text-xs font-semibold text-red-600">{errors.role}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-1 border-t border-slate-100 pt-6 lg:grid-cols-2">
          <TextField name="fullName" label="Full name" autoComplete="name" error={errors.fullName} />
          <TextField name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <PasswordInput name="password" label="Password" autoComplete="new-password" hint="Use at least 8 characters." error={errors.password} />
          <PasswordInput name="confirmPassword" label="Confirm password" autoComplete="new-password" error={errors.confirmPassword} />
        </div>

        {role === "STUDENT" ? (
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
            <TextField name="academicYear" label="Academic year" placeholder="Example: 3rd Year" error={errors.academicYear} />
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
          type="button"
          className="w-fit rounded-xl text-sm font-black text-slate-700 transition hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100"
          onClick={() => setShowOptional((current) => !current)}
        >
          {role === "STUDENT" ? "Add optional profile details" : "Add organization details"}
        </button>

        {showOptional ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-1 rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-2">
            {role === "STUDENT" ? (
              <>
                <TextField name="universityEmail" label="University email" type="email" />
                <TextField name="portfolioUrl" label="Portfolio URL" error={errors.portfolioUrl} />
                <TextField name="linkedinUrl" label="LinkedIn URL" error={errors.linkedinUrl} />
                <TextAreaField name="bio" label="Bio" />
              </>
            ) : (
              <>
                <TextField name="websiteUrl" label="Website URL" error={errors.websiteUrl} />
                <TextField name="industry" label="Industry" />
                <TextField name="location" label="Location" />
                <TextAreaField name="description" label="Description" />
              </>
            )}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="h-14 w-full rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm font-semibold text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-black text-slate-950 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
