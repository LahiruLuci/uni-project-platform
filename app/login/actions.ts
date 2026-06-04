"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAppUserByAuthId } from "@/lib/auth/auth-queries";
import { friendlyAuthError, isValidEmail, roleRedirect, type AuthActionState } from "@/lib/auth/auth-utils";

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

    const appUser = await getAppUserByAuthId(data.user.id);
    if (!appUser) {
      return {
        ok: false,
        message: "Your account setup is incomplete. Please complete your profile.",
      };
    }

    redirectTo = roleRedirect(appUser.userType);
  } catch (error) {
    console.error("Login failed:", error);
    return { ok: false, message: "Unable to login. Please try again." };
  }

  redirect(redirectTo);
}
