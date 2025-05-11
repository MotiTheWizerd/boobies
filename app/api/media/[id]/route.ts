import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Get a specific media item
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;

    const media = await prisma.adImage.findUnique({
      where: { id },
      include: {
        ad: {
          select: {
            id: true,
            name: true,
            campaignId: true,
            campaign: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// Update a media item
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    const data = await req.json();
    const { altText, order, isMain } = data;

    // Ensure media exists
    const existingMedia = await prisma.adImage.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // If setting this image as main, update other images to not be main
    if (isMain) {
      await prisma.adImage.updateMany({
        where: {
          adId: existingMedia.adId,
          id: { not: id },
        },
        data: { isMain: false },
      });
    }

    // Update media
    const media = await prisma.adImage.update({
      where: { id },
      data: {
        altText: altText !== undefined ? altText : undefined,
        order: order !== undefined ? order : undefined,
        isMain: isMain !== undefined ? isMain : undefined,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

// Delete a media item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;

    // Ensure media exists
    const existingMedia = await prisma.adImage.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete media
    await prisma.adImage.delete({
      where: { id },
    });

    // If deleted media was main, set another one as main
    if (existingMedia.isMain) {
      const nextMainImage = await prisma.adImage.findFirst({
        where: { adId: existingMedia.adId },
        orderBy: { order: "asc" },
      });

      if (nextMainImage) {
        await prisma.adImage.update({
          where: { id: nextMainImage.id },
          data: { isMain: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
