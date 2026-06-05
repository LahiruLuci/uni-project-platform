import { AuthProvider, OrganizationType, UserStatus, VerificationStatus, type UserType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isValidEmail, isValidOptionalUrl, roleRedirect, type SignupRole } from "./auth-utils";

export type ProfileStatus = "READY" | "MISSING_USER" | "MISSING_STUDENT_PROFILE" | "MISSING_INDUSTRY_PROFILE" | "SUSPENDED" | "DELETED";

export type ProfileResult = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  user?: {
    id: string;
    authUserId: string | null;
    email: string;
    fullName: string;
    userType: UserType;
    status: UserStatus;
  };
};

export type EnsureProfileResult = {
  status: ProfileStatus;
  redirectTo: string;
  message?: string;
  user?: {
    id: string;
    authUserId: string | null;
    email: string;
    fullName: string;
    userType: UserType;
    status: UserStatus;
  };
};

type BaseProfileInput = {
  authUserId: string;
  email: string;
  fullName: string;
  emailVerified?: boolean;
  avatarUrl?: string | null;
};

type StudentProfileInput = BaseProfileInput & {
  role: "STUDENT";
  universityId: string;
  faculty: string;
  degreeProgram: string;
  academicYear: string;
  universityEmail?: string;
  bio?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
};

type IndustryProfileInput = BaseProfileInput & {
  role: "INDUSTRY_PARTNER";
  organizationName: string;
  organizationType: OrganizationType;
  websiteUrl?: string;
  industry?: string;
  location?: string;
  description?: string;
};

const organizationTypes = Object.values(OrganizationType);

function clean(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function nullable(value: string | null | undefined) {
  const trimmed = clean(value);
  return trimmed ? trimmed : null;
}

export function validatePublicSignupRole(role: string): role is SignupRole {
  return role === "STUDENT" || role === "INDUSTRY_PARTNER";
}

function validateBase(input: BaseProfileInput, errors: Record<string, string>) {
  if (!clean(input.authUserId)) errors.authUserId = "Authentication session is missing. Please login again.";
  if (!clean(input.fullName)) errors.fullName = "Please enter your full name.";
  if (!clean(input.email) || !isValidEmail(input.email)) errors.email = "Please enter a valid email address.";
}

function validateStudentInput(input: StudentProfileInput) {
  const errors: Record<string, string> = {};
  validateBase(input, errors);
  if (input.role !== "STUDENT") errors.role = "Invalid account type.";
  if (!clean(input.universityId)) errors.universityId = "Please select your university.";
  if (!clean(input.faculty)) errors.faculty = "Please enter your faculty.";
  if (!clean(input.degreeProgram)) errors.degreeProgram = "Please enter your degree program.";
  if (!clean(input.academicYear)) errors.academicYear = "Please enter your academic year.";
  if (clean(input.universityEmail) && !isValidEmail(clean(input.universityEmail))) errors.universityEmail = "Please enter a valid university email.";
  if (!isValidOptionalUrl(clean(input.portfolioUrl))) errors.portfolioUrl = "Please enter a valid portfolio URL.";
  if (!isValidOptionalUrl(clean(input.linkedinUrl))) errors.linkedinUrl = "Please enter a valid LinkedIn URL.";
  return errors;
}

function validateIndustryInput(input: IndustryProfileInput) {
  const errors: Record<string, string> = {};
  validateBase(input, errors);
  if (input.role !== "INDUSTRY_PARTNER") errors.role = "Invalid account type.";
  if (!clean(input.organizationName)) errors.organizationName = "Please enter your organization name.";
  if (!organizationTypes.includes(input.organizationType)) errors.organizationType = "Please select your organization type.";
  if (!isValidOptionalUrl(clean(input.websiteUrl))) errors.websiteUrl = "Please enter a valid website URL.";
  return errors;
}

export async function createStudentAccountProfile(input: StudentProfileInput): Promise<ProfileResult> {
  const errors = validateStudentInput(input);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    const user = await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findFirst({
        where: { OR: [{ authUserId: input.authUserId }, { email: input.email }] },
        select: { id: true },
      });
      const upsertedUser = existing
        ? await tx.user.update({
            where: { id: existing.id },
            data: {
              authUserId: input.authUserId,
              email: input.email,
              fullName: input.fullName,
              avatarUrl: nullable(input.avatarUrl),
              userType: "STUDENT",
              status: UserStatus.ACTIVE,
              authProvider: AuthProvider.SUPABASE,
              emailVerified: Boolean(input.emailVerified),
            },
          })
        : await tx.user.create({
            data: {
              authUserId: input.authUserId,
              email: input.email,
              fullName: input.fullName,
              avatarUrl: nullable(input.avatarUrl),
              userType: "STUDENT",
              status: UserStatus.ACTIVE,
              authProvider: AuthProvider.SUPABASE,
              emailVerified: Boolean(input.emailVerified),
            },
          });

      await tx.industryProfile.deleteMany({ where: { userId: upsertedUser.id } });
      await tx.studentProfile.upsert({
        where: { userId: upsertedUser.id },
        update: {
          universityId: input.universityId,
          faculty: input.faculty,
          degreeProgram: input.degreeProgram,
          academicYear: input.academicYear,
          universityEmail: nullable(input.universityEmail),
          bio: nullable(input.bio),
          portfolioUrl: nullable(input.portfolioUrl),
          linkedinUrl: nullable(input.linkedinUrl),
        },
        create: {
          userId: upsertedUser.id,
          universityId: input.universityId,
          faculty: input.faculty,
          degreeProgram: input.degreeProgram,
          academicYear: input.academicYear,
          universityEmail: nullable(input.universityEmail),
          bio: nullable(input.bio),
          portfolioUrl: nullable(input.portfolioUrl),
          linkedinUrl: nullable(input.linkedinUrl),
          verificationStatus: VerificationStatus.UNVERIFIED,
        },
      });

      return upsertedUser;
    });

    return { ok: true, user };
  } catch (error) {
    console.error("Student profile creation failed:", error);
    return { ok: false, message: "Unable to complete account setup. Please try again." };
  }
}

export async function createIndustryAccountProfile(input: IndustryProfileInput): Promise<ProfileResult> {
  const errors = validateIndustryInput(input);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    const user = await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findFirst({
        where: { OR: [{ authUserId: input.authUserId }, { email: input.email }] },
        select: { id: true },
      });
      const upsertedUser = existing
        ? await tx.user.update({
            where: { id: existing.id },
            data: {
              authUserId: input.authUserId,
              email: input.email,
              fullName: input.fullName,
              avatarUrl: nullable(input.avatarUrl),
              userType: "INDUSTRY_PARTNER",
              status: UserStatus.ACTIVE,
              authProvider: AuthProvider.SUPABASE,
              emailVerified: Boolean(input.emailVerified),
            },
          })
        : await tx.user.create({
            data: {
              authUserId: input.authUserId,
              email: input.email,
              fullName: input.fullName,
              avatarUrl: nullable(input.avatarUrl),
              userType: "INDUSTRY_PARTNER",
              status: UserStatus.ACTIVE,
              authProvider: AuthProvider.SUPABASE,
              emailVerified: Boolean(input.emailVerified),
            },
          });

      await tx.studentProfile.deleteMany({ where: { userId: upsertedUser.id } });
      await tx.industryProfile.upsert({
        where: { userId: upsertedUser.id },
        update: {
          organizationName: input.organizationName,
          organizationType: input.organizationType,
          websiteUrl: nullable(input.websiteUrl),
          industry: nullable(input.industry),
          location: nullable(input.location),
          description: nullable(input.description),
        },
        create: {
          userId: upsertedUser.id,
          organizationName: input.organizationName,
          organizationType: input.organizationType,
          websiteUrl: nullable(input.websiteUrl),
          industry: nullable(input.industry),
          location: nullable(input.location),
          description: nullable(input.description),
          verificationStatus: VerificationStatus.UNVERIFIED,
        },
      });

      return upsertedUser;
    });

    return { ok: true, user };
  } catch (error) {
    console.error("Industry profile creation failed:", error);
    return { ok: false, message: "Unable to complete account setup. Please try again." };
  }
}

export async function ensureUserProfile(authUserId: string): Promise<EnsureProfileResult> {
  const user = await prisma.user.findUnique({
    where: { authUserId },
    select: {
      id: true,
      authUserId: true,
      email: true,
      fullName: true,
      userType: true,
      status: true,
      studentProfile: { select: { id: true } },
      industryProfile: { select: { id: true } },
    },
  });

  if (!user) {
    return { status: "MISSING_USER", redirectTo: "/onboarding", message: "Your account setup is incomplete. Please complete your profile." };
  }

  if (user.status === "SUSPENDED") {
    return { status: "SUSPENDED", redirectTo: "/login", message: "Your account is currently suspended. Please contact support.", user };
  }

  if (user.status === "DELETED") {
    return { status: "DELETED", redirectTo: "/login", message: "This account is not available.", user };
  }

  if (user.userType === "STUDENT" && !user.studentProfile) {
    return { status: "MISSING_STUDENT_PROFILE", redirectTo: "/onboarding/student", message: "Your account setup is incomplete. Please complete your profile.", user };
  }

  if (user.userType === "INDUSTRY_PARTNER" && !user.industryProfile) {
    return { status: "MISSING_INDUSTRY_PROFILE", redirectTo: "/onboarding", message: "Your account setup is incomplete. Please complete your profile.", user };
  }

  return { status: "READY", redirectTo: getPostLoginRedirect(user.userType), user };
}

export function getPostLoginRedirect(userType: UserType | SignupRole | string | null | undefined) {
  return roleRedirect(userType);
}

export async function repairMissingRoleProfile(input: StudentProfileInput | IndustryProfileInput) {
  if (input.role === "STUDENT") return createStudentAccountProfile(input);
  if (input.role === "INDUSTRY_PARTNER") return createIndustryAccountProfile(input);
  return { ok: false, message: "Invalid account type." };
}
