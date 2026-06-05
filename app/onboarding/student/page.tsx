import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getSignupUniversities } from "@/lib/auth/auth-queries";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { ProfileCompletionCard } from "@/components/onboarding/ProfileCompletionCard";
import { StudentOnboardingForm } from "@/components/onboarding/StudentOnboardingForm";

export const metadata: Metadata = {
  title: "Student Profile Setup | UniVenture",
  description: "Complete your student profile before submitting university projects.",
};

function calculateCompletion(values: Array<string | null | undefined>) {
  const complete = values.filter((value) => Boolean(value?.trim())).length;
  return Math.round((complete / values.length) * 100);
}

function BlockedState({ title, message }: { title: string; message: string }) {
  return (
    <OnboardingLayout
      aside={<ProfileCompletionCard completion={0} />}
    >
      <section className="rounded-[1.75rem] border border-red-200 bg-white p-5 shadow-2xl shadow-slate-900/[0.08] sm:p-6 lg:p-8">
        <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-red-700">
          Account unavailable
        </p>
        <h1 className="mt-4 !text-slate-950 text-3xl font-black">{title}</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{message}</p>
      </section>
    </OnboardingLayout>
  );
}

export default async function StudentOnboardingPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.id || !data.user.email) {
    redirect("/login");
  }

  const [platformUser, universities] = await Promise.all([
    prisma.user.findUnique({
      where: { authUserId: data.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        userType: true,
        status: true,
        studentProfile: {
          select: {
            universityId: true,
            faculty: true,
            degreeProgram: true,
            academicYear: true,
            universityEmail: true,
            bio: true,
            portfolioUrl: true,
            linkedinUrl: true,
            verificationStatus: true,
          },
        },
      },
    }),
    getSignupUniversities(),
  ]);

  if (platformUser?.status === "SUSPENDED") {
    return <BlockedState title="Your account is currently suspended" message="Please contact support before completing your student profile." />;
  }

  if (platformUser?.status === "DELETED") {
    return <BlockedState title="This account is not available" message="This account cannot continue onboarding." />;
  }

  if (platformUser?.userType === "INDUSTRY_PARTNER") {
    redirect("/explore");
  }

  if (platformUser?.userType === "ADMIN") {
    redirect("/admin");
  }

  const defaults = {
    fullName: platformUser?.fullName ?? data.user.user_metadata?.fullName ?? "",
    universityId: platformUser?.studentProfile?.universityId ?? "",
    faculty: platformUser?.studentProfile?.faculty ?? "",
    degreeProgram: platformUser?.studentProfile?.degreeProgram ?? "",
    academicYear: platformUser?.studentProfile?.academicYear ?? "",
    universityEmail: platformUser?.studentProfile?.universityEmail ?? "",
    bio: platformUser?.studentProfile?.bio ?? "",
    portfolioUrl: platformUser?.studentProfile?.portfolioUrl ?? "",
    linkedinUrl: platformUser?.studentProfile?.linkedinUrl ?? "",
    avatarUrl: platformUser?.avatarUrl ?? data.user.user_metadata?.avatar_url ?? "",
  };

  const completion = calculateCompletion([
    defaults.fullName,
    defaults.universityId,
    defaults.faculty,
    defaults.degreeProgram,
    defaults.academicYear,
  ]);

  return (
    <OnboardingLayout aside={<ProfileCompletionCard completion={completion} />}>
      <StudentOnboardingForm defaults={defaults} universities={universities} />
    </OnboardingLayout>
  );
}
