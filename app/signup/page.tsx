import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { getAppUserByAuthId, getSignupUniversities } from "@/lib/auth/auth-queries";
import { roleRedirect } from "@/lib/auth/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Create Account | UniVenture",
  description: "Create a UniVenture account as a student creator or industry partner.",
};

export default async function SignupPage() {
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      const appUser = await getAppUserByAuthId(data.user.id);
      redirect(roleRedirect(appUser?.userType));
    }
  }

  const universities = await getSignupUniversities();

  return (
    <AuthLayout mode="signup">
      <SignupForm universities={universities} />
    </AuthLayout>
  );
}
