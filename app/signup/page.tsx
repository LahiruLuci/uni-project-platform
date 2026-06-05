import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { getSignupUniversities } from "@/lib/auth/auth-queries";

export const metadata: Metadata = {
  title: "Create Account | UniVenture",
  description: "Create a UniVenture account as a student creator or industry partner.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const universities = await getSignupUniversities();
  const initialRole = params.role === "industry" ? "INDUSTRY_PARTNER" : "STUDENT";

  return (
    <AuthLayout mode="signup">
      <SignupForm universities={universities} initialRole={initialRole} />
    </AuthLayout>
  );
}
