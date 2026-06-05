"use server";

import { redirect } from "next/navigation";
import { AuthProvider, UserStatus, VerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { type AuthActionState, isValidEmail, isValidOptionalUrl } from "@/lib/auth/auth-utils";

const academicYears = new Set(["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year", "Postgraduate", "Other"]);

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function nullable(valueToClean: string) {
  return valueToClean ? valueToClean : null;
}

function validateStudentOnboarding(formData: FormData) {
  const errors: Record<string, string> = {};
  const fullName = value(formData, "fullName");
  const universityId = value(formData, "universityId");
  const faculty = value(formData, "faculty");
  const degreeProgram = value(formData, "degreeProgram");
  const academicYear = value(formData, "academicYear");
  const universityEmail = value(formData, "universityEmail");
  const portfolioUrl = value(formData, "portfolioUrl");
  const linkedinUrl = value(formData, "linkedinUrl");

  if (!fullName) errors.fullName = "Please enter your full name.";
  if (!universityId) errors.universityId = "Please select your university.";
  if (!faculty) errors.faculty = "Please enter your faculty.";
  if (!degreeProgram) errors.degreeProgram = "Please enter your degree program.";
  if (!academicYear || !academicYears.has(academicYear)) errors.academicYear = "Please select your academic year.";
  if (universityEmail && !isValidEmail(universityEmail)) errors.universityEmail = "Please enter a valid university email.";
  if (!isValidOptionalUrl(portfolioUrl)) errors.portfolioUrl = "Please enter a valid portfolio URL.";
  if (!isValidOptionalUrl(linkedinUrl)) errors.linkedinUrl = "Please enter a valid LinkedIn URL.";

  return errors;
}

export async function saveStudentOnboardingAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const redirectTo = "/explore";

  const errors = validateStudentOnboarding(formData);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user?.id || !data.user.email) {
      return { ok: false, message: "Please login to complete your student profile." };
    }

    const authUser = data.user;
    const authEmail = data.user.email;
    const fullName = value(formData, "fullName");
    const universityId = value(formData, "universityId");
    const faculty = value(formData, "faculty");
    const degreeProgram = value(formData, "degreeProgram");
    const academicYear = value(formData, "academicYear");
    const universityEmail = value(formData, "universityEmail");
    const bio = value(formData, "bio");
    const portfolioUrl = value(formData, "portfolioUrl");
    const linkedinUrl = value(formData, "linkedinUrl");
    const avatarUrl = value(formData, "avatarUrl") || authUser.user_metadata?.avatar_url || null;

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({
        where: { authUserId: authUser.id },
        include: { studentProfile: true },
      });

      if (existing?.status === "SUSPENDED") {
        return { ok: false, message: "Your account is currently suspended. Please contact support." };
      }

      if (existing?.status === "DELETED") {
        return { ok: false, message: "This account is not available." };
      }

      if (existing && existing.userType !== "STUDENT") {
        return { ok: false, message: "This onboarding page is only for student accounts." };
      }

      const user = existing
        ? await tx.user.update({
            where: { id: existing.id },
            data: {
              fullName,
              avatarUrl: avatarUrl ?? existing.avatarUrl,
              email: existing.email || authEmail,
              authUserId: authUser.id,
              userType: "STUDENT",
              authProvider: AuthProvider.SUPABASE,
              status: UserStatus.ACTIVE,
              emailVerified: Boolean(authUser.email_confirmed_at),
            },
            include: { studentProfile: true },
          })
        : await tx.user.create({
            data: {
              authUserId: authUser.id,
              email: authEmail,
              fullName,
              avatarUrl,
              userType: "STUDENT",
              status: UserStatus.ACTIVE,
              authProvider: AuthProvider.SUPABASE,
              emailVerified: Boolean(authUser.email_confirmed_at),
            },
            include: { studentProfile: true },
          });

      await tx.studentProfile.upsert({
        where: { userId: user.id },
        update: {
          universityId,
          faculty,
          degreeProgram,
          academicYear,
          universityEmail: universityEmail ? universityEmail : user.studentProfile?.universityEmail ?? null,
          bio: bio ? bio : user.studentProfile?.bio ?? null,
          portfolioUrl: portfolioUrl ? portfolioUrl : user.studentProfile?.portfolioUrl ?? null,
          linkedinUrl: linkedinUrl ? linkedinUrl : user.studentProfile?.linkedinUrl ?? null,
        },
        create: {
          userId: user.id,
          universityId,
          faculty,
          degreeProgram,
          academicYear,
          universityEmail: nullable(universityEmail),
          bio: nullable(bio),
          portfolioUrl: nullable(portfolioUrl),
          linkedinUrl: nullable(linkedinUrl),
          verificationStatus: VerificationStatus.UNVERIFIED,
        },
      });

      return { ok: true };
    });

    if (!result.ok) {
      return { ok: false, message: result.message ?? "Unable to save your profile. Please try again." };
    }
  } catch (error) {
    console.error("Student onboarding failed:", error);
    return { ok: false, message: "Unable to save your profile. Please try again." };
  }

  redirect(redirectTo);
}
