import { NextRequest, NextResponse } from "next/server";

// Hardcoded Express API URL - port 5000 is the default in the server's index.js
const EXPRESS_API_URL = "http://localhost:5000";

/**
 * GET handler for /api/clients
 */
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${EXPRESS_API_URL}/api/clients`);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/clients
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${EXPRESS_API_URL}/api/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
