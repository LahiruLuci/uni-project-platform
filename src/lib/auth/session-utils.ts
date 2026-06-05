import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "./profile-service";

export async function getCurrentPlatformUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return {
      authUser: null,
      profile: null,
    };
  }

  return {
    authUser: data.user,
    profile: await ensureUserProfile(data.user.id),
  };
}
