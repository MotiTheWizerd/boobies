import { NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:5000';

export async function GET(request: Request, { params }: { params: { areaId: string } }) {
  const areaId = params.areaId;
  
  if (!EXPRESS_API_URL) {
    return NextResponse.json({ error: 'EXPRESS_API_URL environment variable is not set' }, { status: 500 });
  }
  
  try {
    console.log(`[API Cities] Fetching cities for area ${areaId} from: ${EXPRESS_API_URL}/api/cities/${areaId}`);
    
    const response = await fetch(`${EXPRESS_API_URL}/api/cities/${areaId}`, {
      // Add proper headers and cache settings
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable cache to always get fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('[API Cities] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
