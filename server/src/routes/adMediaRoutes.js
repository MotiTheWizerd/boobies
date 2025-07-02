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
    // Use path.resolve to ensure we get an absolute path
    const uploadDir = path.resolve(__dirname, '../../../public/ads', adId);
    
    console.log('Upload destination directory:', uploadDir);
    console.log('Current working directory:', process.cwd());
    
    try {
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        console.log('Creating directory:', uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Directory created successfully');
      } else {
        // Clear existing files if directory exists
        console.log('Directory exists, clearing existing files');
        const files = fs.readdirSync(uploadDir);
        console.log(`Found ${files.length} existing files to remove`);
        for (const file of files) {
          const filePath = path.join(uploadDir, file);
          console.log('Removing file:', filePath);
          fs.unlinkSync(filePath);
        }
      }
      
      console.log('Destination directory ready');
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error in destination function:', error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
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
});

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
    
    // Use multer to handle the file upload
    console.log('Starting file upload...');
    upload.array("files")(req, res, async function (err) {
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
      req.files.forEach((file, index) => {
        console.log(`File ${index + 1}:`, {
          originalname: file.originalname,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          path: file.path
        });
      });
      
      try {
        // Get the defaultFileName from the request body if provided
        const defaultFileName = req.body.defaultFileName;
        console.log('Default file name from request:', defaultFileName);
        
        // Create media records
        const mediaRecords = req.files.map((file, index) => {
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
        
        // Update the ad with the new images
        await prisma.ad.update({
          where: { id: adId },
          data: {
            images: mediaRecords,
          },
        });
        
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
