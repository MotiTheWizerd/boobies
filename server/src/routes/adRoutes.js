const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { asyncHandler } = require("../middlewares/errorHandler");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/ads
 * @desc Get all ads or filter by campaign ID
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { campaignId } = req.query;

    const where = campaignId ? { campaignId } : {};

    const ads = await prisma.ad.findMany({
      where,
      include: {
        campaign: {
          select: {
            id: true,
            campaign_name: true,
          },
        },
        areas: {
          include: {
            area: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the response to include areaIds array for each ad
    const adsWithAreaIds = ads.map(ad => ({
      ...ad,
      areaIds: ad.areas.map(adArea => adArea.areaId.toString()),
    }));

    res.status(200).json(adsWithAreaIds);
  })
);

/**
 * @route GET /api/ads/:id
 * @desc Get a single ad by ID
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const ad = await prisma.ad.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            id: true,
            campaign_name: true,
            client: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        areas: {
          include: {
            area: true,
          },
        },
      },
    });

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Transform the response to include areaIds array
    const response = {
      ...ad,
      areaIds: ad.areas.map(adArea => adArea.areaId.toString()),
    };

    res.status(200).json(response);
  })
);

/**
 * @route POST /api/ads
 * @desc Create a new ad
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      shortDescription,
      isHappyHour,
      isHot,
      isPremium,
      priority,
      status,
      tags,
      campaignId,
      age,
      country,
      titsSize,
      mobile,
      whatsapp,
      telegram,
    } = req.body;

    // Validate required fields
    if (!name || !campaignId) {
      return res
        .status(400)
        .json({ message: "Ad name and campaign ID are required" });
    }

    // Check if campaign exists
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Use images from req.body directly
    const images = req.body.images || null;
    console.log("test");
    // First create the ad
    const ad = await prisma.ad.create({
      data: {
        name,
        description,
        shortDescription,
        images,
        isHappyHour: isHappyHour || false,
        isHot: isHot || false,
        isPremium: isPremium || false,
        priority: priority || false,
        status: status || "active",
        age: age ? parseInt(age) : null,
        country,
        titsSize,
        mobile,
        whatsapp,
        telegram,
        campaign: {
          connect: { id: campaignId },
        },
        tags: Array.isArray(tags) ? tags : [],
      },
      include: {
        campaign: {
          select: {
            id: true,
            campaign_name: true,
          },
        },
      },
    });

    // Then create AdArea records if areaIds are provided
    if (req.body.areaIds && Array.isArray(req.body.areaIds) && req.body.areaIds.length > 0) {
      await prisma.adArea.createMany({
        data: req.body.areaIds.map(areaId => ({
          adId: ad.id,
          areaId: parseInt(areaId, 10)
        })),
        skipDuplicates: true,
      });
    }

    // Fetch the ad with its areas
    const adWithAreas = await prisma.ad.findUnique({
      where: { id: ad.id },
      include: {
        campaign: {
          select: {
            id: true,
            campaign_name: true,
          },
        },
        areas: {
          include: {
            area: true,
          },
        },
      },
    });

    res.status(201).json({
      ...adWithAreas,
      areaIds: adWithAreas.areas.map(adArea => adArea.areaId.toString()),
    });
  })
);

/**
 * @route PUT /api/ads/:id
 * @desc Update an ad
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      name,
      description,
      shortDescription,
      isHappyHour,
      isHot,
      isPremium,
      priority,
      status,
      tags,
      campaignId,
      age,
      country,
      titsSize,
      mobile,
      whatsapp,
      telegram,
    } = req.body;

    // Check if ad exists
    const existingAd = await prisma.ad.findUnique({
      where: { id },
    });

    if (!existingAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Check if campaign exists if campaignId is provided
    if (campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
      });

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
    }

    // Use images from req.body directly
    let images = req.body.images;

    // Start a transaction to update both ad and areas
    const [ad] = await prisma.$transaction([
      // Update the ad
      prisma.ad.update({
        where: { id },
        data: {
          name: name !== undefined ? name : undefined,
          description: description !== undefined ? description : undefined,
          shortDescription:
            shortDescription !== undefined ? shortDescription : undefined,
          images,
          isHappyHour: isHappyHour !== undefined ? isHappyHour : undefined,
          isHot: isHot !== undefined ? isHot : undefined,
          isPremium: isPremium !== undefined ? isPremium : undefined,
          priority: priority !== undefined ? priority : undefined,
          status: status !== undefined ? status : undefined,
          age: age !== undefined ? (age ? parseInt(age) : null) : undefined,
          country: country !== undefined ? country : undefined,
          titsSize: titsSize !== undefined ? titsSize : undefined,
          mobile: mobile !== undefined ? mobile : undefined,
          whatsapp: whatsapp !== undefined ? whatsapp : undefined,
          telegram: telegram !== undefined ? telegram : undefined,
          campaign: campaignId
            ? {
                connect: { id: campaignId },
              }
            : undefined,
          tags:
            tags !== undefined ? (Array.isArray(tags) ? tags : []) : undefined,
        },
        include: {
          campaign: {
            select: {
              id: true,
              campaign_name: true,
            },
          },
        },
      }),
      // Delete existing AdArea records for this ad
      prisma.adArea.deleteMany({
        where: { adId: id },
      }),
      // Create new AdArea records if areaIds are provided
      ...(req.body.areaIds && Array.isArray(req.body.areaIds) && req.body.areaIds.length > 0
        ? [
            prisma.adArea.createMany({
              data: req.body.areaIds.map(areaId => ({
                adId: id,
                areaId: parseInt(areaId, 10)
              })),
              skipDuplicates: true,
            })
          ]
        : [])
    ]);

    // Fetch the ad with its areas to return complete data
    const adWithAreas = await prisma.ad.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            id: true,
            campaign_name: true,
          },
        },
        areas: {
          include: {
            area: true,
          },
        },
      },
    });

    res.status(200).json({
      ...adWithAreas,
      areaIds: adWithAreas.areas.map(adArea => adArea.areaId.toString()),
    });
  })
);

/**
 * @route DELETE /api/ads/:id
 * @desc Delete an ad
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if ad exists
    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    await prisma.ad.delete({
      where: { id },
    });

    res.status(200).json({ message: "Ad deleted successfully" });
  })
);

module.exports = router;
