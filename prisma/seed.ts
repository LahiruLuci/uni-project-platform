import {
  BadgeType,
  CommercialStatus,
  CompletionStatus,
  OpportunityType,
  PrismaClient,
  ProjectType,
  ReviewStatus,
  UserType,
  Visibility,
} from "@prisma/client";

const prisma = new PrismaClient();

const universities = [
  { name: "University of Moratuwa", shortName: "UOM", websiteUrl: "https://uom.lk" },
  { name: "University of Colombo", shortName: "UOC", websiteUrl: "https://cmb.ac.lk" },
  { name: "University of Peradeniya", shortName: "UOP", websiteUrl: "https://www.pdn.ac.lk" },
  { name: "University of Sri Jayewardenepura", shortName: "USJ", websiteUrl: "https://www.sjp.ac.lk" },
  { name: "University of Kelaniya", shortName: "UOK", websiteUrl: "https://www.kln.ac.lk" },
  { name: "Sabaragamuwa University", shortName: "SUSL", websiteUrl: "https://www.sab.ac.lk" },
  { name: "University of Ruhuna", shortName: "UOR", websiteUrl: "https://www.ruh.ac.lk" },
  { name: "Wayamba University", shortName: "WUSL", websiteUrl: "https://www.wyb.ac.lk" },
  { name: "Rajarata University", shortName: "RUSL", websiteUrl: "https://www.rjt.ac.lk" },
  { name: "Eastern University", shortName: "EUSL", websiteUrl: "https://www.esn.ac.lk" },
];

const categories = [
  "Technology",
  "Engineering",
  "Business",
  "Health",
  "Agriculture",
  "Tourism",
  "Education",
  "Science",
  "Creative / Design",
  "Social Impact",
];

const badges = [
  "Student Verified",
  "University Verified",
  "Demo Available",
  "Private Files Locked",
  "Open for Collaboration",
  "Open for Investment",
  "Available for Licensing",
  "Available for Acquisition",
  "Admin Reviewed",
];

const tags = [
  "IoT",
  "AI",
  "Mobile App",
  "Research",
  "Sustainability",
  "Prototype",
  "Data",
  "Design",
  "Social Impact",
  "Marketplace",
  "Healthcare",
  "Agriculture",
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type ProjectSeed = {
  title: string;
  category: string;
  university: string;
  shortSummary: string;
  problemStatement: string;
  solutionOverview: string;
  fullDescription: string;
  projectType: ProjectType;
  completionStatus: CompletionStatus;
  commercialStatus: CommercialStatus;
  opportunities: OpportunityType[];
  tags: string[];
  badges: string[];
  featured?: boolean;
  verified?: boolean;
  demoUrl?: string;
};

const projects: ProjectSeed[] = [
  {
    title: "Smart Farming Irrigation System",
    category: "Agriculture",
    university: "University of Peradeniya",
    shortSummary: "An IoT-based irrigation system that helps farmers reduce water waste and monitor soil conditions.",
    problemStatement: "Small farms often irrigate manually without reliable soil data, wasting water and increasing cost.",
    solutionOverview: "Sensors monitor soil moisture and trigger controlled irrigation through a simple dashboard.",
    fullDescription:
      "The system combines low-cost soil sensors, microcontroller automation, and a lightweight dashboard to help farmers make better irrigation decisions.",
    projectType: ProjectType.PRODUCT,
    completionStatus: CompletionStatus.PROTOTYPE,
    commercialStatus: CommercialStatus.OPEN_TO_COLLABORATION,
    opportunities: [OpportunityType.COLLABORATION, OpportunityType.RESEARCH_PARTNER],
    tags: ["IoT", "Agriculture", "Sustainability"],
    badges: ["Demo Available", "Open for Collaboration", "Admin Reviewed"],
    featured: true,
    verified: true,
    demoUrl: "https://example.com/smart-farming-demo",
  },
  {
    title: "AI Learning Assistant",
    category: "Education",
    university: "University of Moratuwa",
    shortSummary: "An AI-powered study assistant that helps students understand lecture notes and prepare for exams.",
    problemStatement: "Students struggle to revise large lecture materials and identify weak areas before exams.",
    solutionOverview: "The assistant summarizes notes, generates questions, and recommends revision paths.",
    fullDescription:
      "This prototype explores AI-assisted learning workflows for university students, with note parsing, quiz generation, and progress tracking.",
    projectType: ProjectType.PROTOTYPE,
    completionStatus: CompletionStatus.MVP,
    commercialStatus: CommercialStatus.OPEN_TO_INVESTMENT,
    opportunities: [OpportunityType.INVESTMENT, OpportunityType.HIRING],
    tags: ["AI", "Education", "Prototype"],
    badges: ["Student Verified", "Private Files Locked", "Open for Investment"],
    featured: true,
    verified: true,
  },
  {
    title: "Eco Packaging Research",
    category: "Science",
    university: "University of Sri Jayewardenepura",
    shortSummary: "A research project focused on biodegradable packaging materials for small businesses.",
    problemStatement: "Small businesses need affordable packaging options that reduce plastic waste.",
    solutionOverview: "The research evaluates local biodegradable materials for cost, durability, and scalability.",
    fullDescription:
      "The project investigates alternative packaging material blends and practical adoption paths for small Sri Lankan businesses.",
    projectType: ProjectType.RESEARCH,
    completionStatus: CompletionStatus.RESEARCH_ONLY,
    commercialStatus: CommercialStatus.OPEN_TO_LICENSE,
    opportunities: [OpportunityType.LICENSING, OpportunityType.RESEARCH_PARTNER],
    tags: ["Research", "Sustainability"],
    badges: ["Available for Licensing", "Admin Reviewed"],
    verified: true,
  },
  {
    title: "Tourism Experience Platform",
    category: "Tourism",
    university: "Sabaragamuwa University",
    shortSummary: "A digital platform connecting local travel experiences with tourists and small service providers.",
    problemStatement: "Local guides and small tourism providers struggle to reach digital-first travelers.",
    solutionOverview: "The platform helps providers publish experiences and accept discovery requests from travelers.",
    fullDescription:
      "This marketplace concept focuses on authentic local experiences, provider visibility, and responsible tourism discovery.",
    projectType: ProjectType.BUSINESS,
    completionStatus: CompletionStatus.CONCEPT_VALIDATED,
    commercialStatus: CommercialStatus.OPEN_TO_INVESTMENT,
    opportunities: [OpportunityType.INVESTMENT, OpportunityType.COLLABORATION],
    tags: ["Marketplace", "Tourism"],
    badges: ["Open for Investment", "Demo Available"],
    featured: true,
  },
  {
    title: "Mental Health Support App",
    category: "Health",
    university: "University of Colombo",
    shortSummary: "A mobile-first tool that helps university students track mood and access wellbeing resources.",
    problemStatement: "Students often lack discreet ways to understand wellbeing patterns and find support resources.",
    solutionOverview: "The app provides mood tracking, guided check-ins, and curated university wellbeing resources.",
    fullDescription:
      "This support tool is designed around privacy, early self-awareness, and campus wellbeing service discovery.",
    projectType: ProjectType.PRODUCT,
    completionStatus: CompletionStatus.MVP,
    commercialStatus: CommercialStatus.OPEN_TO_COLLABORATION,
    opportunities: [OpportunityType.COLLABORATION, OpportunityType.SPONSORSHIP],
    tags: ["Mobile App", "Healthcare", "Social Impact"],
    badges: ["Private Files Locked", "Open for Collaboration"],
    verified: true,
  },
  {
    title: "Creative Brand Identity System",
    category: "Creative / Design",
    university: "University of Kelaniya",
    shortSummary: "A complete brand identity and campaign concept for a youth-focused social enterprise.",
    problemStatement: "Early social enterprises need credible brand systems but often lack design resources.",
    solutionOverview: "The project delivers brand strategy, visual identity, and launch campaign assets.",
    fullDescription:
      "The work includes logo systems, campaign messaging, social media templates, and a brand usage guide.",
    projectType: ProjectType.CREATIVE,
    completionStatus: CompletionStatus.COMPLETED,
    commercialStatus: CommercialStatus.OPEN_TO_MULTIPLE,
    opportunities: [OpportunityType.HIRING, OpportunityType.COLLABORATION],
    tags: ["Design", "Social Impact"],
    badges: ["Student Verified", "Open for Collaboration"],
  },
  {
    title: "Sinhala Speech Learning Tool",
    category: "Technology",
    university: "University of Colombo",
    shortSummary: "A language learning prototype that helps learners practice Sinhala pronunciation.",
    problemStatement: "Learners need guided pronunciation feedback that supports local language learning.",
    solutionOverview: "The tool records speech, compares pronunciation patterns, and gives practice suggestions.",
    fullDescription:
      "This prototype explores speech analysis for Sinhala language learning with a simple practice interface.",
    projectType: ProjectType.PROTOTYPE,
    completionStatus: CompletionStatus.PROTOTYPE,
    commercialStatus: CommercialStatus.OPEN_TO_COLLABORATION,
    opportunities: [OpportunityType.COLLABORATION, OpportunityType.RESEARCH_PARTNER],
    tags: ["AI", "Education"],
    badges: ["Demo Available", "Student Verified"],
  },
  {
    title: "Low-Cost Water Quality Monitor",
    category: "Engineering",
    university: "University of Ruhuna",
    shortSummary: "A portable monitoring device for basic water quality readings in rural communities.",
    problemStatement: "Communities need affordable ways to identify potential water quality issues early.",
    solutionOverview: "The prototype combines sensors and a simple display to track key water quality indicators.",
    fullDescription:
      "The device focuses on affordability, ease of repair, and use by community groups or field officers.",
    projectType: ProjectType.PRODUCT,
    completionStatus: CompletionStatus.PROTOTYPE,
    commercialStatus: CommercialStatus.OPEN_TO_LICENSE,
    opportunities: [OpportunityType.LICENSING, OpportunityType.SPONSORSHIP],
    tags: ["IoT", "Sustainability", "Prototype"],
    badges: ["Available for Licensing", "Private Files Locked"],
  },
  {
    title: "Small Business Finance Dashboard",
    category: "Business",
    university: "Wayamba University",
    shortSummary: "A dashboard concept for small businesses to understand cash flow and sales performance.",
    problemStatement: "Small businesses often manage financial decisions without clear daily visibility.",
    solutionOverview: "The dashboard summarizes sales, expenses, cash flow, and simple forecasts.",
    fullDescription:
      "The project validates a lightweight analytics experience for shop owners and micro businesses.",
    projectType: ProjectType.BUSINESS,
    completionStatus: CompletionStatus.CONCEPT_VALIDATED,
    commercialStatus: CommercialStatus.OPEN_TO_MULTIPLE,
    opportunities: [OpportunityType.INVESTMENT, OpportunityType.HIRING],
    tags: ["Data", "Business"],
    badges: ["Open for Investment", "Admin Reviewed"],
  },
  {
    title: "Waste Sorting Awareness Campaign",
    category: "Social Impact",
    university: "Rajarata University",
    shortSummary: "A behavior-change campaign that teaches households to sort waste using clear visual prompts.",
    problemStatement: "Waste sorting guidance is often unclear, making household participation inconsistent.",
    solutionOverview: "The campaign uses simple visuals, community messaging, and school-based awareness materials.",
    fullDescription:
      "This creative social impact project includes campaign strategy, posters, and community education assets.",
    projectType: ProjectType.SOCIAL_IMPACT,
    completionStatus: CompletionStatus.COMPLETED,
    commercialStatus: CommercialStatus.OPEN_TO_COLLABORATION,
    opportunities: [OpportunityType.SPONSORSHIP, OpportunityType.COLLABORATION],
    tags: ["Social Impact", "Design", "Sustainability"],
    badges: ["Open for Collaboration", "Admin Reviewed"],
  },
  {
    title: "Hospital Queue Management Prototype",
    category: "Health",
    university: "Eastern University",
    shortSummary: "A queue management prototype for clinics to reduce waiting confusion and improve patient flow.",
    problemStatement: "Patients often wait without clear updates, increasing stress and staff workload.",
    solutionOverview: "The system provides queue numbers, status updates, and basic staff-side queue controls.",
    fullDescription:
      "This prototype focuses on low-cost clinic operations, patient communication, and simple deployment needs.",
    projectType: ProjectType.PROTOTYPE,
    completionStatus: CompletionStatus.MVP,
    commercialStatus: CommercialStatus.OPEN_TO_COLLABORATION,
    opportunities: [OpportunityType.COLLABORATION, OpportunityType.RESEARCH_PARTNER],
    tags: ["Healthcare", "Prototype"],
    badges: ["Demo Available", "Private Files Locked"],
    featured: true,
  },
  {
    title: "Tea Supply Chain Traceability System",
    category: "Agriculture",
    university: "University of Peradeniya",
    shortSummary: "A traceability concept for tea producers to track batches from smallholders to buyers.",
    problemStatement: "Small tea producers need better traceability to build buyer trust and improve reporting.",
    solutionOverview: "The system records batch movement, producer details, and quality checkpoints.",
    fullDescription:
      "This project explores practical digital traceability workflows for tea supply chains and export credibility.",
    projectType: ProjectType.PRODUCT,
    completionStatus: CompletionStatus.CONCEPT_VALIDATED,
    commercialStatus: CommercialStatus.OPEN_TO_INVESTMENT,
    opportunities: [OpportunityType.INVESTMENT, OpportunityType.LICENSING],
    tags: ["Agriculture", "Data", "Sustainability"],
    badges: ["Open for Investment", "Available for Licensing"],
    verified: true,
  },
];

async function main() {
  const createdUniversities = await Promise.all(
    universities.map((university) =>
      prisma.university.upsert({
        where: { name: university.name },
        update: university,
        create: university,
      }),
    ),
  );

  const createdCategories = await Promise.all(
    categories.map((name, index) =>
      prisma.category.upsert({
        where: { slug: slugify(name) },
        update: { name, sortOrder: index + 1, isActive: true },
        create: {
          name,
          slug: slugify(name),
          sortOrder: index + 1,
          isActive: true,
        },
      }),
    ),
  );

  for (const category of createdCategories) {
    await Promise.all(
      ["Projects", "Research"].map((suffix) =>
        prisma.subcategory.upsert({
          where: { slug: `${category.slug}-${slugify(suffix)}` },
          update: { name: `${category.name} ${suffix}`, isActive: true, categoryId: category.id },
          create: {
            name: `${category.name} ${suffix}`,
            slug: `${category.slug}-${slugify(suffix)}`,
            isActive: true,
            categoryId: category.id,
          },
        }),
      ),
    );
  }

  await Promise.all(
    tags.map((name) =>
      prisma.tag.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { name, slug: slugify(name) },
      }),
    ),
  );

  await Promise.all(
    badges.map((name) =>
      prisma.badge.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: {
          name,
          slug: slugify(name),
          badgeType: name.includes("Student") ? BadgeType.USER : BadgeType.PROJECT,
        },
      }),
    ),
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@univenture.lk" },
    update: { fullName: "UniVenture Admin", userType: UserType.ADMIN },
    create: {
      email: "admin@univenture.lk",
      fullName: "UniVenture Admin",
      userType: UserType.ADMIN,
      emailVerified: true,
    },
  });

  const studentUsers = await Promise.all(
    ["student.demo@univenture.lk", "creator.team@univenture.lk", "research.demo@univenture.lk"].map((email, index) =>
      prisma.user.upsert({
        where: { email },
        update: { fullName: ["Demo Student Creator", "Innovation Team Lead", "Research Student"][index], userType: UserType.STUDENT },
        create: {
          email,
          fullName: ["Demo Student Creator", "Innovation Team Lead", "Research Student"][index],
          userType: UserType.STUDENT,
          emailVerified: true,
          studentProfile: {
            create: {
              universityId: createdUniversities[index]?.id,
              faculty: ["Engineering", "Computing", "Science"][index],
              degreeProgram: ["Agricultural Engineering", "Software Engineering", "Applied Sciences"][index],
              academicYear: "Final Year",
              bio: "Demo student profile for seeded marketplace projects.",
            },
          },
        },
      }),
    ),
  );

  const categoryByName = new Map(createdCategories.map((category) => [category.name, category]));
  const universityByName = new Map(createdUniversities.map((university) => [university.name, university]));

  for (const [index, projectSeed] of projects.entries()) {
    const category = categoryByName.get(projectSeed.category) ?? createdCategories[0];
    const university = universityByName.get(projectSeed.university) ?? createdUniversities[0];
    const owner = studentUsers[index % studentUsers.length];
    const slug = slugify(projectSeed.title);

    const project = await prisma.project.upsert({
      where: { slug },
      update: {
        ownerId: owner.id,
        categoryId: category.id,
        universityId: university.id,
        shortSummary: projectSeed.shortSummary,
        problemStatement: projectSeed.problemStatement,
        solutionOverview: projectSeed.solutionOverview,
        fullDescription: projectSeed.fullDescription,
        projectType: projectSeed.projectType,
        completionStatus: projectSeed.completionStatus,
        visibility: Visibility.PUBLIC,
        reviewStatus: ReviewStatus.PUBLISHED,
        commercialStatus: projectSeed.commercialStatus,
        demoUrl: projectSeed.demoUrl,
        featured: projectSeed.featured ?? false,
        verified: projectSeed.verified ?? false,
        publishedAt: new Date(),
      },
      create: {
        ownerId: owner.id,
        categoryId: category.id,
        universityId: university.id,
        title: projectSeed.title,
        slug,
        shortSummary: projectSeed.shortSummary,
        problemStatement: projectSeed.problemStatement,
        solutionOverview: projectSeed.solutionOverview,
        fullDescription: projectSeed.fullDescription,
        projectType: projectSeed.projectType,
        completionStatus: projectSeed.completionStatus,
        visibility: Visibility.PUBLIC,
        reviewStatus: ReviewStatus.PUBLISHED,
        commercialStatus: projectSeed.commercialStatus,
        demoUrl: projectSeed.demoUrl,
        featured: projectSeed.featured ?? false,
        verified: projectSeed.verified ?? false,
        viewCount: 120 - index * 6,
        publishedAt: new Date(),
      },
    });

    await Promise.all([
      prisma.projectOpportunity.deleteMany({ where: { projectId: project.id } }),
      prisma.projectTag.deleteMany({ where: { projectId: project.id } }),
      prisma.projectMedia.deleteMany({ where: { projectId: project.id } }),
      prisma.badgeAssignment.deleteMany({ where: { targetType: BadgeType.PROJECT, targetId: project.id } }),
    ]);

    await prisma.projectOpportunity.createMany({
      data: projectSeed.opportunities.map((opportunityType) => ({ projectId: project.id, opportunityType })),
      skipDuplicates: true,
    });

    for (const tagName of projectSeed.tags) {
      const tag = await prisma.tag.upsert({
        where: { slug: slugify(tagName) },
        update: { name: tagName },
        create: { name: tagName, slug: slugify(tagName) },
      });
      await prisma.projectTag.create({ data: { projectId: project.id, tagId: tag.id } });
    }

    await prisma.projectMedia.create({
      data: {
        projectId: project.id,
        mediaType: "IMAGE",
        url: `/images/project-${index + 1}.jpg`,
        altText: `${project.title} preview`,
        sortOrder: 1,
      },
    });

    for (const badgeName of projectSeed.badges) {
      const badge = await prisma.badge.findUnique({ where: { slug: slugify(badgeName) } });
      if (badge) {
        await prisma.badgeAssignment.create({
          data: {
            badgeId: badge.id,
            targetType: BadgeType.PROJECT,
            targetId: project.id,
            assignedBy: admin.id,
          },
        });
      }
    }
  }

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "SEED_EXPLORE_DATA",
      entityType: "System",
      metadata: { source: "prisma/seed.ts", projects: projects.length },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
