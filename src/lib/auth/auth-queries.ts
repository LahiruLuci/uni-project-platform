import { prisma } from "@/lib/prisma";

export async function getSignupUniversities() {
  return prisma.university.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      shortName: true,
    },
  });
}

export async function getAppUserByAuthId(authUserId: string) {
  return prisma.user.findUnique({
    where: { authUserId },
    select: {
      id: true,
      userType: true,
      status: true,
      studentProfile: { select: { id: true } },
      industryProfile: { select: { id: true } },
    },
  });
}
