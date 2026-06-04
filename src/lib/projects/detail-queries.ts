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
          downloadAllowed: true,
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

export async function getSimilarProjects(project: ProjectDetail) {
  const opportunityTypes = project.opportunities.map((opportunity) => opportunity.opportunityType);
  const collected = new Map<string, Prisma.ProjectGetPayload<{ include: typeof similarInclude }>>();

  const sameCategory = await prisma.project.findMany({
    where: {
      ...publicVisibility,
      id: {
        not: project.id,
      },
      categoryId: project.categoryId,
    },
    include: similarInclude,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  for (const item of sameCategory) collected.set(item.id, item);

  if (collected.size < 4 && project.universityId) {
    const sameUniversity = await prisma.project.findMany({
      where: {
        ...publicVisibility,
        id: {
          notIn: [project.id, ...collected.keys()],
        },
        universityId: project.universityId,
      },
      include: similarInclude,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: 4 - collected.size,
    });

    for (const item of sameUniversity) collected.set(item.id, item);
  }

  if (collected.size < 4 && opportunityTypes.length > 0) {
    const sameOpportunity = await prisma.project.findMany({
      where: {
        ...publicVisibility,
        id: {
          notIn: [project.id, ...collected.keys()],
        },
        opportunities: {
          some: {
            opportunityType: {
              in: opportunityTypes,
            },
          },
        },
      },
      include: similarInclude,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: 4 - collected.size,
    });

    for (const item of sameOpportunity) collected.set(item.id, item);
  }

  const projects = Array.from(collected.values()).slice(0, 4);
  const badgesByProject = await getBadgeNames(projects.map((item) => item.id));

  return projects.map((item) => ({
    ...item,
    badges: badgesByProject.get(item.id) ?? [],
  })) satisfies SimilarProject[];
}
