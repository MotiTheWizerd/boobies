import { NextRequest, NextResponse } from 'next/server';

// Hardcoded Express API URL - port 5000 is the default in the server's index.js
const EXPRESS_API_URL = "http://localhost:5000";

/**
 * This route handles file uploads for ads
 * It forwards the request to the Express backend
 */

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adId = params.id;
    
    // Clone the request to forward it
    const formData = await request.formData();
    
    // Forward the request to the Express backend
    const response = await fetch(`${EXPRESS_API_URL}/api/ads/${adId}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove all files for an ad
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adId = params.id;
    
    // Forward the request to the Express backend
    const response = await fetch(`${EXPRESS_API_URL}/api/ads/${adId}/upload`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error deleting files:', error);
    return NextResponse.json(
      { error: 'Failed to delete files' },
      { status: 500 }
    );
  }
}
