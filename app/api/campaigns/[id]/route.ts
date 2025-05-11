import { NextRequest, NextResponse } from "next/server";

// Hardcoded Express API URL - port 5000 is the default in the server's index.js
const EXPRESS_API_URL = "http://localhost:5000";

/**
 * GET handler for /api/campaigns/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await fetch(`${EXPRESS_API_URL}/api/campaigns/${id}`);

    if (response.status === 404) {
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for /api/campaigns/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const response = await fetch(`${EXPRESS_API_URL}/api/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for /api/campaigns/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(`${EXPRESS_API_URL}/api/campaigns/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
