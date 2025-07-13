import { NextRequest, NextResponse } from "next/server";

// Hardcoded Express API URL - port 5000 is the default in the server's index.js
const EXPRESS_API_URL = "http://localhost:5000";

/**
 * GET handler for /api/ads
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get("campaignId");
    const serviceType = searchParams.get("serviceType");

    let url = `${EXPRESS_API_URL}/api/ads`;
    const params = new URLSearchParams();

    if (campaignId) params.append("campaignId", campaignId);
    if (serviceType) params.append("serviceType", serviceType);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/ads
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${EXPRESS_API_URL}/api/ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
