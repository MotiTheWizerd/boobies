import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Get all media items
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const adId = url.searchParams.get("adId");
    const limit = parseInt(url.searchParams.get("limit") || "100");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Query conditions
    const where: any = {};
    if (adId) {
      where.adId = adId;
    }

    // Get media items with filtering
    const [media, total] = await Promise.all([
      prisma.adImage.findMany({
        where,
        orderBy: [{ isMain: "desc" }, { order: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.adImage.count({ where }),
    ]);

    return NextResponse.json({
      media,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// Create a new media record (metadata only, upload handled separately)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { adId, url, altText, width, height, size, order, isMain } = data;

    // Validation
    if (!adId || !url) {
      return NextResponse.json(
        { error: "Ad ID and URL are required" },
        { status: 400 }
      );
    }

    // Check if ad exists
    const ad = await prisma.ad.findUnique({
      where: { id: adId },
    });

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    // If setting this image as main, update other images to not be main
    if (isMain) {
      await prisma.adImage.updateMany({
        where: { adId },
        data: { isMain: false },
      });
    }

    // Create the media record
    const media = await prisma.adImage.create({
      data: {
        adId,
        url,
        altText: altText || "",
        width: width || 0,
        height: height || 0,
        size: size || 0,
        order: order || 0,
        isMain: isMain || false,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Error creating media:", error);
    return NextResponse.json(
      { error: "Failed to create media" },
      { status: 500 }
    );
  }
}
