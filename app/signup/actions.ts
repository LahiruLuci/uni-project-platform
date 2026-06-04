"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthProvider, OrganizationType, UserStatus, VerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { friendlyAuthError, isValidEmail, isValidOptionalUrl, roleRedirect, type AuthActionState, type SignupRole } from "@/lib/auth/auth-utils";

const organizationTypes = Object.values(OrganizationType);

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function validateBase(formData: FormData) {
  const errors: Record<string, string> = {};
  const role = value(formData, "role") as SignupRole;
  const fullName = value(formData, "fullName");
  const email = value(formData, "email");
  const password = value(formData, "password");
  const confirmPassword = value(formData, "confirmPassword");

  if (role !== "STUDENT" && role !== "INDUSTRY_PARTNER") errors.role = "Please select a valid account type.";
  if (!fullName) errors.fullName = "Please enter your full name.";
  if (!email || !isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

  return { role, fullName, email, password, errors };
}

function validateSignup(formData: FormData) {
  const base = validateBase(formData);
  const errors = base.errors;

  if (base.role === "STUDENT") {
    if (!value(formData, "universityId")) errors.universityId = "Please select your university.";
    if (!value(formData, "faculty")) errors.faculty = "Please enter your faculty.";
    if (!value(formData, "degreeProgram")) errors.degreeProgram = "Please enter your degree program.";
    if (!value(formData, "academicYear")) errors.academicYear = "Please enter your academic year.";
    if (!isValidOptionalUrl(value(formData, "portfolioUrl"))) errors.portfolioUrl = "Please enter a valid portfolio URL.";
    if (!isValidOptionalUrl(value(formData, "linkedinUrl"))) errors.linkedinUrl = "Please enter a valid LinkedIn URL.";
  }

  if (base.role === "INDUSTRY_PARTNER") {
    const organizationType = value(formData, "organizationType");
    if (!value(formData, "organizationName")) errors.organizationName = "Please enter your organization name.";
    if (!organizationTypes.includes(organizationType as OrganizationType)) errors.organizationType = "Please select your organization type.";
    if (!isValidOptionalUrl(value(formData, "websiteUrl"))) errors.websiteUrl = "Please enter a valid website URL.";
  }

  return { ...base, errors };
}

async function upsertAppUser({
  authUserId,
  email,
  fullName,
  role,
  emailVerified,
  formData,
}: {
  authUserId: string;
  email: string;
  fullName: string;
  role: SignupRole;
  emailVerified: boolean;
  formData: FormData;
}) {
  return prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findFirst({
      where: {
        OR: [{ authUserId }, { email }],
      },
      select: { id: true },
    });

    const user = existingUser
      ? await tx.user.update({
          where: { id: existingUser.id },
          data: {
            authUserId,
            email,
            fullName,
            userType: role,
            status: UserStatus.ACTIVE,
            authProvider: AuthProvider.SUPABASE,
            emailVerified,
          },
        })
      : await tx.user.create({
          data: {
            authUserId,
            email,
            fullName,
            userType: role,
            status: UserStatus.ACTIVE,
            authProvider: AuthProvider.SUPABASE,
            emailVerified,
          },
        });

    if (role === "STUDENT") {
      await tx.studentProfile.upsert({
        where: { userId: user.id },
        update: {
          universityId: value(formData, "universityId"),
          faculty: value(formData, "faculty"),
          degreeProgram: value(formData, "degreeProgram"),
          academicYear: value(formData, "academicYear"),
          universityEmail: value(formData, "universityEmail") || null,
          bio: value(formData, "bio") || null,
          portfolioUrl: value(formData, "portfolioUrl") || null,
          linkedinUrl: value(formData, "linkedinUrl") || null,
        },
        create: {
          userId: user.id,
          universityId: value(formData, "universityId"),
          faculty: value(formData, "faculty"),
          degreeProgram: value(formData, "degreeProgram"),
          academicYear: value(formData, "academicYear"),
          universityEmail: value(formData, "universityEmail") || null,
          bio: value(formData, "bio") || null,
          portfolioUrl: value(formData, "portfolioUrl") || null,
          linkedinUrl: value(formData, "linkedinUrl") || null,
          verificationStatus: VerificationStatus.UNVERIFIED,
        },
      });
    }

    if (role === "INDUSTRY_PARTNER") {
      await tx.industryProfile.upsert({
        where: { userId: user.id },
        update: {
          organizationName: value(formData, "organizationName"),
          organizationType: value(formData, "organizationType") as OrganizationType,
          websiteUrl: value(formData, "websiteUrl") || null,
          industry: value(formData, "industry") || null,
          location: value(formData, "location") || null,
          description: value(formData, "description") || null,
        },
        create: {
          userId: user.id,
          organizationName: value(formData, "organizationName"),
          organizationType: value(formData, "organizationType") as OrganizationType,
          websiteUrl: value(formData, "websiteUrl") || null,
          industry: value(formData, "industry") || null,
          location: value(formData, "location") || null,
          description: value(formData, "description") || null,
          verificationStatus: VerificationStatus.UNVERIFIED,
        },
      });
    }

    return user;
  });
}

export async function signupAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = validateSignup(formData);
  if (Object.keys(parsed.errors).length > 0) {
    return { ok: false, errors: parsed.errors };
  }

  try {
    const supabase = await createClient();
    const headerStore = await headers();
    const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const { data, error } = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          fullName: parsed.fullName,
          role: parsed.role,
        },
      },
    });

    if (error || !data.user?.id || !data.user.email) {
      console.error("Supabase signup failed:", {
        message: error?.message,
        status: error?.status,
        code: error?.code,
      });
      return { ok: false, message: friendlyAuthError(error?.message) };
    }

    await upsertAppUser({
      authUserId: data.user.id,
      email: data.user.email,
      fullName: parsed.fullName,
      role: parsed.role,
      emailVerified: Boolean(data.user.email_confirmed_at),
      formData,
    });

    if (!data.session) {
      return {
        ok: true,
        message: "Account created. Please check your email to confirm your account.",
      };
    }
  } catch (error) {
    console.error("Signup failed:", error);

    if (error instanceof Error && error.message.includes("Missing Supabase public environment variables")) {
      return {
        ok: false,
        message: "Supabase Auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, then restart the dev server.",
      };
    }

    if (error instanceof Error && error.message.includes("Invalid Supabase project URL")) {
      return {
        ok: false,
        message: "Supabase project URL is incorrect. Use the base URL only, without /rest/v1 or /auth/v1.",
      };
    }

    return { ok: false, message: "Unable to create account. Please try again." };
  }

  redirect(roleRedirect(parsed.role));
}
