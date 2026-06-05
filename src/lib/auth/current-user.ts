import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export type SafePlatformUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  userType: "STUDENT" | "INDUSTRY_PARTNER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
};

export async function getCurrentPlatformUser(): Promise<SafePlatformUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;

  return prisma.user.findUnique({
    where: { authUserId: data.user.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      userType: true,
      status: true,
    },
  });
}
