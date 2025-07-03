const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { asyncHandler } = require("../middlewares/errorHandler");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const adId = req.params.id;
    // Save files to the frontend public folder instead of server public folder
    // Go up one directory from server to reach the root project folder
    const uploadDir = path.join(process.cwd(), '..', 'public', 'ads', adId);
    
    console.log('Upload destination directory:', uploadDir);
    console.log('Current working directory:', process.cwd());
    
    try {
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        console.log('Creating directory:', uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Directory created successfully');
      } else {
        // Don't clear existing files - we'll use unique filenames instead
        console.log('Directory exists, keeping existing files');
      }
      
      console.log('Destination directory ready');
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error in destination function:', error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Generate a truly unique filename with timestamp and UUID
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = `${timestamp}-${uuidv4()}${fileExtension}`;
    console.log('Generated filename:', fileName, 'for original:', file.originalname);
    cb(null, fileName);
  }
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed`), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10 // Maximum 10 files
  }
}).array("files");

/**
 * @route POST /api/ads/:id/upload
 * @desc Upload files for an ad
 */
router.post(
  "/:id/upload",
  asyncHandler(async (req, res) => {
    const { id: adId } = req.params;
    
    // Check if ad exists
    const ad = await prisma.ad.findUnique({
      where: { id: adId },
    });
    
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    
    console.log('Starting file upload...');
    
    // Use upload as middleware directly
    upload(req, res, async function (err) {
      if (err) {
        console.error('Upload error:', err);
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "File size exceeds 50MB limit" });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({ error: "Maximum 10 files allowed" });
        }
        return res.status(400).json({ error: err.message });
      }
      
      if (!req.files || req.files.length === 0) {
        console.log('No files were uploaded');
        return res.status(400).json({ error: "No files provided" });
      }
      
      console.log(`Processing ${req.files.length} uploaded files`);
      
      // Verify files were actually saved to disk
      const uploadDir = path.join(process.cwd(), '..', 'public', 'ads', adId);
      try {
        const savedFiles = fs.readdirSync(uploadDir);
        console.log(`Files in directory after upload: ${savedFiles.length}`);
        savedFiles.forEach(file => console.log(`- ${file}`));
      } catch (err) {
        console.error('Error reading upload directory:', err);
      }
      
      // Log detailed information about each file
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        const exists = fs.existsSync(file.path);
        console.log(`File ${index + 1}:`, {
          originalname: file.originalname,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          path: file.path,
          exists: exists
        });
        
        // If file doesn't exist, log an error
        if (!exists) {
          console.error(`File ${file.originalname} was not saved to disk at ${file.path}`);
        }
      }
      
      try {
        // Get the defaultFileName from the request body if provided
        const defaultFileName = req.body.defaultFileName;
        console.log('Default file name from request:', defaultFileName);
        
        // Create media records only for files that actually exist
        const mediaRecords = req.files
          .filter(file => fs.existsSync(file.path))
          .map((file, index) => {
            const fileUrl = `/ads/${adId}/${file.filename}`;
            console.log('Generated file URL:', fileUrl);
            
            // Set isDefault based on the defaultFileName or first file
            const isDefault = defaultFileName ? 
              file.originalname === defaultFileName : 
              index === 0;
              
            console.log(`File ${file.originalname} isDefault:`, isDefault);
            
            return {
              originalName: file.originalname,
              fileName: file.filename,
              fileType: file.mimetype,
              fileSize: file.size,
              url: fileUrl,
              isDefault: isDefault
            };
          });
        
        console.log(`Created ${mediaRecords.length} media records out of ${req.files.length} uploaded files`);
        
        // Update the ad with the new images
        const updatedAd = await prisma.ad.update({
          where: { id: adId },
          data: {
            images: mediaRecords,
          },
        });
        
        console.log(`Updated ad ${adId} with ${mediaRecords.length} images`);
        
        res.status(200).json({
          success: true,
          files: mediaRecords,
        });
      } catch (error) {
        console.error("Error saving media records:", error);
        res.status(500).json({ error: "Failed to save media records" });
      }
    });
  })
);

/**
 * @route DELETE /api/ads/:id/upload
 * @desc Delete all files for an ad
 */
router.delete(
  "/:id/upload",
  asyncHandler(async (req, res) => {
    const { id: adId } = req.params;
    
    // Check if ad exists
    const ad = await prisma.ad.findUnique({
      where: { id: adId },
    });
    
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    
    try {
      // Update the ad to clear images
      await prisma.ad.update({
        where: { id: adId },
        data: {
          images: [],
        },
      });
      
      // Delete files from disk
      const uploadDir = path.join(process.cwd(), "public", "ads", adId);
      
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        for (const file of files) {
          fs.unlinkSync(path.join(uploadDir, file));
        }
        // Remove directory
        fs.rmdirSync(uploadDir);
      }
      
      res.status(200).json({
        success: true,
        message: "All files deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting files:", error);
      res.status(500).json({ error: "Failed to delete files" });
    }
  })
);

/**
 * @route PUT /api/ads/:id/default-media
 * @desc Set a specific media item as the default for an ad
 */
router.put(
  "/:id/default-media",
  asyncHandler(async (req, res) => {
    const { id: adId } = req.params;
    const { fileName } = req.body;
    
    if (!fileName) {
      return res.status(400).json({ error: "fileName is required" });
    }
    
    // Check if ad exists
    const ad = await prisma.ad.findUnique({
      where: { id: adId },
    });
    
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    
    if (!ad.images || !Array.isArray(ad.images) || ad.images.length === 0) {
      return res.status(404).json({ error: "No media found for this ad" });
    }
    
    try {
      // Find the media item with the specified fileName
      const mediaIndex = ad.images.findIndex(media => media.fileName === fileName);
      
      if (mediaIndex === -1) {
        return res.status(404).json({ error: "Media not found" });
      }
      
      // Update all media items to set isDefault to false
      const updatedImages = ad.images.map(media => ({
        ...media,
        isDefault: false
      }));
      
      // Set the specified media item as default
      updatedImages[mediaIndex].isDefault = true;
      
      // Update the ad with the new images array
      await prisma.ad.update({
        where: { id: adId },
        data: {
          images: updatedImages,
        },
      });
      
      res.status(200).json({
        success: true,
        message: "Default media updated successfully",
        defaultMedia: updatedImages[mediaIndex]
      });
    } catch (error) {
      console.error("Error updating default media:", error);
      res.status(500).json({ error: "Failed to update default media" });
    }
  })
);

module.exports = router;
