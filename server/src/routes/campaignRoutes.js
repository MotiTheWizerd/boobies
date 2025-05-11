const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middlewares/errorHandler');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/campaigns
 * @desc Get all campaigns or filter by client ID
 */
router.get('/', asyncHandler(async (req, res) => {
  const { clientId } = req.query;
  
  const where = clientId ? { clientId } : {};
  
  const campaigns = await prisma.campaign.findMany({
    where,
    include: {
      client: true,
      _count: {
        select: { ads: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  res.status(200).json(campaigns);
}));

/**
 * @route GET /api/campaigns/:id
 * @desc Get a single campaign by ID
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      client: true,
      ads: true
    }
  });
  
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  
  res.status(200).json(campaign);
}));

/**
 * @route POST /api/campaigns
 * @desc Create a new campaign
 */
router.post('/', asyncHandler(async (req, res) => {
  const { campaign_name, clientId } = req.body;
  
  // Validate required fields
  if (!campaign_name || !clientId) {
    return res.status(400).json({ message: 'Campaign name and client ID are required' });
  }
  
  // Check if client exists
  const client = await prisma.client.findUnique({
    where: { id: clientId }
  });
  
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  
  const campaign = await prisma.campaign.create({
    data: {
      campaign_name,
      client: {
        connect: { id: clientId }
      }
    },
    include: {
      client: true
    }
  });
  
  res.status(201).json(campaign);
}));

/**
 * @route PUT /api/campaigns/:id
 * @desc Update a campaign
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { campaign_name, clientId } = req.body;
  
  // Validate required fields
  if (!campaign_name) {
    return res.status(400).json({ message: 'Campaign name is required' });
  }
  
  // Check if campaign exists
  const campaignExists = await prisma.campaign.findUnique({
    where: { id }
  });
  
  if (!campaignExists) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  
  // If client ID is changing, check if new client exists
  if (clientId && clientId !== campaignExists.clientId) {
    const clientExists = await prisma.client.findUnique({
      where: { id: clientId }
    });
    
    if (!clientExists) {
      return res.status(404).json({ message: 'Client not found' });
    }
  }
  
  // Update data object
  const updateData = {
    campaign_name
  };
  
  // If client ID is provided, add it to update
  if (clientId) {
    updateData.client = {
      connect: { id: clientId }
    };
  }
  
  const campaign = await prisma.campaign.update({
    where: { id },
    data: updateData,
    include: {
      client: true
    }
  });
  
  res.status(200).json(campaign);
}));

/**
 * @route DELETE /api/campaigns/:id
 * @desc Delete a campaign
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check if campaign exists
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      _count: {
        select: { ads: true }
      }
    }
  });
  
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  
  // Check if campaign has ads
  if (campaign._count.ads > 0) {
    return res.status(400).json({ message: 'Cannot delete a campaign with existing ads. Delete the ads first.' });
  }
  
  await prisma.campaign.delete({
    where: { id }
  });
  
  res.status(200).json({ message: 'Campaign deleted successfully' });
}));

module.exports = router; 