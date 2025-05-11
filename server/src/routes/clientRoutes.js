const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middlewares/errorHandler');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/clients
 * @desc Get all clients
 */
router.get('/', asyncHandler(async (req, res) => {
  const clients = await prisma.client.findMany({
    include: {
      _count: {
        select: { campaigns: true }
      }
    }
  });
  
  res.status(200).json(clients);
}));

/**
 * @route GET /api/clients/:id
 * @desc Get a single client by ID
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      campaigns: true,
      _count: {
        select: { campaigns: true }
      }
    }
  });
  
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  
  res.status(200).json(client);
}));

/**
 * @route POST /api/clients
 * @desc Create a new client
 */
router.post('/', asyncHandler(async (req, res) => {
  const { name, title, email, mobile } = req.body;
  
  // Validate required fields
  if (!name || !title || !email) {
    return res.status(400).json({ message: 'Name, title and email are required' });
  }
  
  // Check if email already exists
  const existingClient = await prisma.client.findUnique({
    where: { email }
  });
  
  if (existingClient) {
    return res.status(400).json({ message: 'A client with this email already exists' });
  }
  
  const client = await prisma.client.create({
    data: {
      name,
      title,
      email,
      mobile
    }
  });
  
  res.status(201).json(client);
}));

/**
 * @route PUT /api/clients/:id
 * @desc Update a client
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, title, email, mobile } = req.body;
  
  // Validate required fields
  if (!name || !title || !email) {
    return res.status(400).json({ message: 'Name, title and email are required' });
  }
  
  // Check if client exists
  const clientExists = await prisma.client.findUnique({
    where: { id }
  });
  
  if (!clientExists) {
    return res.status(404).json({ message: 'Client not found' });
  }
  
  // Check if email is already used by another client
  if (email !== clientExists.email) {
    const emailExists = await prisma.client.findUnique({
      where: { email }
    });
    
    if (emailExists) {
      return res.status(400).json({ message: 'A client with this email already exists' });
    }
  }
  
  const client = await prisma.client.update({
    where: { id },
    data: {
      name,
      title,
      email,
      mobile
    }
  });
  
  res.status(200).json(client);
}));

/**
 * @route DELETE /api/clients/:id
 * @desc Delete a client
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check if client exists
  const client = await prisma.client.findUnique({
    where: { id }
  });
  
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  
  // Check if client has campaigns
  const clientWithCampaigns = await prisma.client.findUnique({
    where: { id },
    include: {
      _count: {
        select: { campaigns: true }
      }
    }
  });
  
  if (clientWithCampaigns._count.campaigns > 0) {
    return res.status(400).json({ message: 'Cannot delete a client with existing campaigns' });
  }
  
  await prisma.client.delete({
    where: { id }
  });
  
  res.status(200).json({ message: 'Client deleted successfully' });
}));

module.exports = router; 