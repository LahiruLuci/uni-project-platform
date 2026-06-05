import type { UserType } from "@prisma/client";

export type SignupRole = "STUDENT" | "INDUSTRY_PARTNER";

export type AuthActionState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export const initialAuthState: AuthActionState = {
  ok: false,
};

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidOptionalUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function roleRedirect(userType: UserType | string | null | undefined) {
  if (userType === "STUDENT") return "/onboarding/student";
  if (userType === "INDUSTRY_PARTNER") return "/explore";
  if (userType === "ADMIN") return "/admin";
  return "/onboarding";
}

export function friendlyAuthError(message?: string) {
  const value = message?.toLowerCase() ?? "";

  if (!value) {
    return "Unable to connect to the authentication service. Please try again.";
  }

  if (value.includes("already") || value.includes("registered") || value.includes("exists")) {
    return "This email is already registered. Please login instead.";
  }

  if (value.includes("api key") || value.includes("invalid key") || value.includes("jwt")) {
    return "Supabase authentication is not configured correctly. Please check the project URL and publishable key.";
  }

  if (value.includes("signups not allowed") || value.includes("signup is disabled") || value.includes("sign up disabled")) {
    return "Account signup is currently disabled in Supabase Auth settings.";
  }

  if (value.includes("redirect") || value.includes("not allowed") || value.includes("url")) {
    return "The signup redirect URL is not allowed in Supabase Auth settings.";
  }

  if (value.includes("email")) {
    return "Please check your email address and try again.";
  }

  if (value.includes("invalid login") || value.includes("invalid credentials")) {
    return "Invalid email or password.";
  }

  if (value.includes("password")) {
    return "Password is too weak or invalid.";
  }

  return "Signup could not be completed. Please check your auth setup and try again.";
}
