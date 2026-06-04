import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { getAppUserByAuthId } from "@/lib/auth/auth-queries";
import { roleRedirect } from "@/lib/auth/auth-utils";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login | UniVenture",
  description: "Login to your UniVenture account.",
};

export default async function LoginPage() {
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      const appUser = await getAppUserByAuthId(data.user.id);
      redirect(roleRedirect(appUser?.userType));
    }
  }

  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  );
}
