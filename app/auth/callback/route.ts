import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth/profile-service";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  let next = requestUrl.searchParams.get("next") ?? "/onboarding";

  if (code && hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (data.user) {
      const profile = await ensureUserProfile(data.user.id);
      next = profile.status === "MISSING_USER" && data.user.user_metadata?.role === "STUDENT" ? "/onboarding/student" : profile.redirectTo;
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
