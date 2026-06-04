"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { loginAction } from "@/app/login/actions";
import { initialAuthState } from "@/lib/auth/auth-utils";
import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";

function EmailField({ error }: { error?: string }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        Email
      </label>
      <input
        id={id}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
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

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialAuthState);
  const errors = state.errors ?? {};

  return (
    <AuthCard>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600">
            Secure login
          </p>
          <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Protected session</span>
        </div>
        <h1 className="mt-4 !text-slate-950 text-[clamp(2rem,8vw,2.75rem)] font-black leading-[1.02]">Welcome back</h1>
        <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
          Login to manage projects, requests, saved innovations, and platform access.
        </p>
      </div>

      {state.message ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
          {state.message}
        </div>
      ) : null}

      <form action={action} className="mt-7 grid gap-5">
        <EmailField error={errors.email} />
        <PasswordInput name="password" label="Password" autoComplete="current-password" error={errors.password} />

        <div className="flex flex-col gap-3 text-sm font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="remember" className="h-4 w-4 rounded border-slate-300 accent-slate-950" />
            Remember me
          </label>
          <span className="font-bold text-slate-400">Forgot password?</span>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="h-14 w-full rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Signing in..." : "Login"}
        </button>

        <Link
          href="/signup"
          className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
        >
          Create account
        </Link>
      </form>
    </AuthCard>
  );
}
