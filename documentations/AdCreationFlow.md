# Ad Creation & File Upload Flow

## Overview

This document outlines the complete flow of creating or updating an ad in the system, including file uploads and area selection.

## 1. Form Submission (Frontend - AdForm.tsx)

### User Interaction
- User fills out the ad form with details (title, description, areas, etc.)
- User can select multiple image/video files to upload (up to 10 files, 50MB each)
- User selects one or more areas for ad targeting (up to 5 areas)

### Form Processing
- Form data is validated (required fields, file types, etc.)
- Files are separated from other form data
- Data is passed to the parent component's `onSubmit` handler

## 2. API Request - Create/Update Ad (Frontend - [campaignId]/page.tsx)

### Request Details
- **Endpoint**: `POST /api/ads` (create) or `PUT /api/ads/:id` (update)
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "Ad Title",
    "description": "Ad Description",
    "campaignId": "123",
    "areaIds": ["1", "2"],
    "tags": ["tag1", "tag2"],
    "status": "active",
    "images": []
  }
  ```

## 3. Server Processing - Create/Update Ad (Backend - adRoutes.js)

### Validation
- Validates required fields
- Checks if campaign exists
- Validates area IDs

### Database Operations
- Creates/updates ad in the database using Prisma
- Handles ad-area relationships
- Returns the created/updated ad with ID

## 4. File Upload (Frontend - [campaignId]/page.tsx)

### If files were selected:
1. Creates `FormData` object
2. Appends all files to form data
3. Sends `POST /api/ads/:id/upload` with:
   - `files`: Array of File objects
   - `defaultFileName`: (optional) Name of the default media file

## 5. File Processing (Backend - adMediaRoutes.js)

### File Handling
1. Saves files to `/public/ads/:adId/` directory
2. Creates media records in database
3. Updates ad with media references
4. Sets default media if specified
5. Returns success/failure response

## 6. Final Response (Frontend)

### Success Case
- Shows success toast message
- Updates UI with new ad data
- Optionally redirects to ad list or stays in edit mode

### Error Handling
- Shows error message if any step fails
- If file upload fails after ad creation, deletes the created ad to avoid orphaned records
- Provides user-friendly error messages

## Key Components

### Frontend
- **AdForm.tsx**: Main form component
- **FileUpload.tsx**: Handles file selection and preview
- **MultiSelectAreas.tsx**: Area selection component

### Backend
- **adRoutes.js**: Handles ad CRUD operations
- **adMediaRoutes.js**: Handles file uploads and media management

## Error Handling

### Common Error Scenarios
1. **Validation Errors**: Missing required fields, invalid file types
2. **Upload Failures**: File too large, network issues
3. **Database Errors**: Duplicate entries, foreign key violations

### Error Responses
- Returns appropriate HTTP status codes
- Includes descriptive error messages
- Logs detailed error information for debugging
