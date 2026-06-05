import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OnboardingForm } from "./OnboardingForm";
import { getSignupUniversities } from "@/lib/auth/auth-queries";
import { getCurrentPlatformUser } from "@/lib/auth/session-utils";

export const metadata: Metadata = {
  title: "Complete Profile | UniVenture",
  description: "Complete your UniVenture account profile.",
};

export default async function OnboardingPage() {
  const { authUser, profile } = await getCurrentPlatformUser();

  if (!authUser || !profile) {
    redirect("/login");
  }

  if (profile.status === "READY") {
    redirect(profile.redirectTo);
  }

  if (profile.status === "MISSING_STUDENT_PROFILE" || (profile.status === "MISSING_USER" && authUser.user_metadata?.role === "STUDENT")) {
    redirect("/onboarding/student");
  }

  const universities = await getSignupUniversities();
  const lockedRole = profile.user?.userType === "STUDENT" || profile.user?.userType === "INDUSTRY_PARTNER" ? profile.user.userType : undefined;

  return (
    <AuthLayout mode="signup">
      <OnboardingForm lockedRole={lockedRole} needsName={profile.status === "MISSING_USER"} universities={universities} />
    </AuthLayout>
  );
}
