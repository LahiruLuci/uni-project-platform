"use server";

import { redirect } from "next/navigation";
import { OrganizationType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getPostLoginRedirect, repairMissingRoleProfile, validatePublicSignupRole } from "@/lib/auth/profile-service";
import { type AuthActionState, type SignupRole } from "@/lib/auth/auth-utils";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function completeOnboardingAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  let redirectTo = "/onboarding";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user?.id || !data.user.email) {
      return { ok: false, message: "Please login to complete your profile." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { authUserId: data.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        userType: true,
        status: true,
      },
    });

    if (existingUser?.status === "SUSPENDED") {
      return { ok: false, message: "Your account is currently suspended. Please contact support." };
    }

    const role = (existingUser?.userType ?? value(formData, "role")) as SignupRole;
    if (!validatePublicSignupRole(role)) {
      return { ok: false, errors: { role: "Invalid account type." } };
    }

    const fullName = existingUser?.fullName ?? value(formData, "fullName") ?? data.user.user_metadata?.fullName ?? "";
    const email = existingUser?.email ?? data.user.email;

    const result =
      role === "STUDENT"
        ? await repairMissingRoleProfile({
            authUserId: data.user.id,
            email,
            fullName,
            role: "STUDENT",
            emailVerified: Boolean(data.user.email_confirmed_at),
            avatarUrl: data.user.user_metadata?.avatar_url,
            universityId: value(formData, "universityId"),
            faculty: value(formData, "faculty"),
            degreeProgram: value(formData, "degreeProgram"),
            academicYear: value(formData, "academicYear"),
            universityEmail: value(formData, "universityEmail"),
            bio: value(formData, "bio"),
            portfolioUrl: value(formData, "portfolioUrl"),
            linkedinUrl: value(formData, "linkedinUrl"),
          })
        : await repairMissingRoleProfile({
            authUserId: data.user.id,
            email,
            fullName,
            role: "INDUSTRY_PARTNER",
            emailVerified: Boolean(data.user.email_confirmed_at),
            avatarUrl: data.user.user_metadata?.avatar_url,
            organizationName: value(formData, "organizationName"),
            organizationType: value(formData, "organizationType") as OrganizationType,
            websiteUrl: value(formData, "websiteUrl"),
            industry: value(formData, "industry"),
            location: value(formData, "location"),
            description: value(formData, "description"),
          });

    if (!result.ok) {
      return {
        ok: false,
        errors: result.errors,
        message: result.message,
      };
    }

    redirectTo = getPostLoginRedirect(role);
  } catch (error) {
    console.error("Onboarding failed:", error);
    return { ok: false, message: "Unable to complete account setup. Please try again." };
  }

  redirect(redirectTo);
}
