import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [users, categories, projects] = await Promise.all([
      prisma.user.count(),
      prisma.category.count(),
      prisma.project.count(),
    ]);

    return NextResponse.json({
      success: true,
      counts: {
        users,
        categories,
        projects,
      },
    });
  } catch (error) {
    console.error("Database connection test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 },
    );
  }
}
