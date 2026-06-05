"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { friendlyAuthError, isValidEmail, type AuthActionState } from "@/lib/auth/auth-utils";
import { ensureUserProfile } from "@/lib/auth/profile-service";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = value(formData, "email");
  const password = value(formData, "password");
  const errors: Record<string, string> = {};

  if (!email || !isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (!password) errors.password = "Please enter your password.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  let redirectTo = "/onboarding";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return { ok: false, message: friendlyAuthError(error?.message) };
    }

    const profile = await ensureUserProfile(data.user.id);

    if (profile.status === "SUSPENDED" || profile.status === "DELETED") {
      return { ok: false, message: profile.message };
    }

    redirectTo = profile.status === "MISSING_USER" && data.user.user_metadata?.role === "STUDENT" ? "/onboarding/student" : profile.redirectTo;
  } catch (error) {
    console.error("Login failed:", error);
    return { ok: false, message: "Unable to login. Please try again." };
  }

  redirect(redirectTo);
}
