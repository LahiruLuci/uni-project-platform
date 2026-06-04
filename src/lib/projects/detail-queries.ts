import { LinkType, Prisma, ReviewStatus, Visibility } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ExploreProject } from "./queries";

export type ProjectDetail = NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>;
export type SimilarProject = ExploreProject;

const publicVisibility = {
  reviewStatus: ReviewStatus.PUBLISHED,
  visibility: {
    in: [Visibility.PUBLIC, Visibility.REQUEST_ONLY],
  },
} satisfies Prisma.ProjectWhereInput;

const similarInclude = {
  category: true,
  subcategory: true,
  university: true,
  media: {
    orderBy: { sortOrder: "asc" },
    take: 1,
  },
  opportunities: true,
  tags: {
    include: {
      tag: true,
    },
  },
} satisfies Prisma.ProjectInclude;

async function getBadgeNames(projectIds: string[]) {
  if (projectIds.length === 0) return new Map<string, string[]>();

  const assignments = await prisma.badgeAssignment.findMany({
    where: {
      targetType: "PROJECT",
      targetId: {
        in: projectIds,
      },
    },
    include: {
      badge: true,
    },
  });

  const badgesByProject = new Map<string, string[]>();
  for (const assignment of assignments) {
    const values = badgesByProject.get(assignment.targetId) ?? [];
    values.push(assignment.badge.name);
    badgesByProject.set(assignment.targetId, values);
  }

  return badgesByProject;
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: {
      slug,
      ...publicVisibility,
    },
    include: {
      category: true,
      subcategory: true,
      university: true,
      media: {
        orderBy: { sortOrder: "asc" },
      },
      links: {
        where: { visibility: Visibility.PUBLIC },
        orderBy: { createdAt: "asc" },
      },
      opportunities: true,
      tags: {
        include: {
          tag: true,
        },
      },
      owner: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
          userType: true,
          studentProfile: {
            select: {
              faculty: true,
              degreeProgram: true,
              academicYear: true,
              bio: true,
              portfolioUrl: true,
              linkedinUrl: true,
              verificationStatus: true,
              university: {
                select: {
                  name: true,
                  shortName: true,
                },
              },
            },
          },
        },
      },
      files: {
        select: {
          fileType: true,
          accessLevel: true,
          requiresNda: true,
          virusScanStatus: true,
        },
      },
      teamMembers: {
        select: {
          fullName: true,
          role: true,
          contributionPercent: true,
          consentStatus: true,
        },
        orderBy: { createdAt: "asc" },
      },
      supervisors: {
        select: {
          name: true,
          role: true,
          permissionStatus: true,
          university: {
            select: {
              name: true,
              shortName: true,
            },
          },
        },
      },
      ownership: {
        select: {
          isGroupProject: true,
          allMembersAgreed: true,
          universityResourcesUsed: true,
          companySponsored: true,
          privateDataUsed: true,
          containsThirdPartyAssets: true,
          patentPossible: true,
          universityApprovalNeeded: true,
          declaredAt: true,
        },
      },
    },
  });

  if (!project) return null;

  const badgesByProject = await getBadgeNames([project.id]);
  const fileSummary = project.files.reduce<Record<string, number>>((summary, file) => {
    summary[file.fileType] = (summary[file.fileType] ?? 0) + 1;
    return summary;
  }, {});

  return {
    ...project,
    badges: badgesByProject.get(project.id) ?? [],
    fileSummary,
    publicLinks: project.links.filter((link) => link.linkType !== LinkType.GITHUB || link.visibility === Visibility.PUBLIC),
  };
}

export async function getSimilarProjects(projectId: string, categoryId: string) {
  const projects = await prisma.project.findMany({
    where: {
      ...publicVisibility,
      id: {
        not: projectId,
      },
      categoryId,
    },
    include: similarInclude,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  const badgesByProject = await getBadgeNames(projects.map((project) => project.id));

  return projects.map((project) => ({
    ...project,
    badges: badgesByProject.get(project.id) ?? [],
  })) satisfies SimilarProject[];
}
