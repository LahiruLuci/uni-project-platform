import {
  OpportunityType,
  Prisma,
  ProjectType,
  ReviewStatus,
  Visibility,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const PAGE_SIZE = 9;

export type ExploreSort = "newest" | "featured" | "views" | "az";

export type ExploreParams = {
  q?: string;
  category?: string;
  university?: string;
  type?: string;
  opportunity?: string;
  sort?: string;
  page?: string;
};

export type ExploreProject = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    subcategory: true;
    university: true;
    media: true;
    opportunities: true;
    tags: { include: { tag: true } };
  };
}> & {
  badges: string[];
};

const projectTypes = Object.values(ProjectType);
const opportunityTypes = Object.values(OpportunityType);

function normalizePage(page?: string) {
  const parsed = Number(page);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

function normalizeSort(sort?: string): ExploreSort {
  if (sort === "featured" || sort === "views" || sort === "az") {
    return sort;
  }

  return "newest";
}

function buildOrderBy(sort: ExploreSort): Prisma.ProjectOrderByWithRelationInput[] {
  if (sort === "featured") {
    return [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }];
  }

  if (sort === "views") {
    return [{ viewCount: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }];
  }

  if (sort === "az") {
    return [{ title: "asc" }];
  }

  return [{ publishedAt: "desc" }, { createdAt: "desc" }];
}

function buildWhere(params: ExploreParams): Prisma.ProjectWhereInput {
  const q = params.q?.trim();
  const type = projectTypes.includes(params.type as ProjectType) ? (params.type as ProjectType) : undefined;
  const opportunity = opportunityTypes.includes(params.opportunity as OpportunityType)
    ? (params.opportunity as OpportunityType)
    : undefined;

  return {
    reviewStatus: ReviewStatus.PUBLISHED,
    visibility: {
      in: [Visibility.PUBLIC, Visibility.REQUEST_ONLY],
    },
    ...(params.category
      ? {
          category: {
            slug: params.category,
          },
        }
      : {}),
    ...(params.university
      ? {
          universityId: params.university,
        }
      : {}),
    ...(type ? { projectType: type } : {}),
    ...(opportunity
      ? {
          opportunities: {
            some: {
              opportunityType: opportunity,
            },
          },
        }
      : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { shortSummary: { contains: q, mode: "insensitive" } },
            { problemStatement: { contains: q, mode: "insensitive" } },
            { solutionOverview: { contains: q, mode: "insensitive" } },
            { category: { name: { contains: q, mode: "insensitive" } } },
            { university: { name: { contains: q, mode: "insensitive" } } },
            { tags: { some: { tag: { name: { contains: q, mode: "insensitive" } } } } },
          ],
        }
      : {}),
  };
}

export async function getExploreProjects(params: ExploreParams) {
  const page = normalizePage(params.page);
  const sort = normalizeSort(params.sort);
  const where = buildWhere(params);

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
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
      },
      orderBy: buildOrderBy(sort),
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.project.count({ where }),
  ]);

  const projectIds = projects.map((project) => project.id);
  const badgeAssignments = projectIds.length
    ? await prisma.badgeAssignment.findMany({
        where: {
          targetType: "PROJECT",
          targetId: {
            in: projectIds,
          },
        },
        include: {
          badge: true,
        },
      })
    : [];

  const badgesByProject = new Map<string, string[]>();
  for (const assignment of badgeAssignments) {
    const values = badgesByProject.get(assignment.targetId) ?? [];
    values.push(assignment.badge.name);
    badgesByProject.set(assignment.targetId, values);
  }

  return {
    projects: projects.map((project) => ({
      ...project,
      badges: badgesByProject.get(project.id) ?? [],
    })) satisfies ExploreProject[],
    totalCount,
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
  };
}

export async function getExploreFilters() {
  const [categories, universities] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true },
    }),
    prisma.university.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return {
    categories,
    universities,
    projectTypes,
    opportunityTypes,
  };
}
