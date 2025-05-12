import { NextResponse } from "next/server";

const EXPRESS_API_URL = "http://localhost:5000";
export async function GET(request: Request) {
  console.log("[API Areas] GET request received");

  // Check for the environment variable inside the handler
  if (!EXPRESS_API_URL) {
    return NextResponse.json(
      { message: "Internal Server Configuration Error: Missing API URL" },
      { status: 500 }
    );
  }

  try {
    console.log(`[API Areas] Fetching from: ${EXPRESS_API_URL}/api/areas`);
    // TODO: Add authentication/headers if needed for the external API
    const response = await fetch(`${EXPRESS_API_URL}/api/areas`);
    console.log(`[API Areas] External API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[API Areas] External API Error Response Text (${response.status}):`,
        errorText
      );
      // Throw to be caught by the main catch block, which returns JSON
      throw new Error(
        `External API request failed: ${response.status} ${response.statusText}`
      );
    }

    console.log("[API Areas] Attempting to parse response as JSON...");
    const areas = await response.json();
    console.log("[API Areas] Successfully parsed JSON, returning response.");
    return NextResponse.json(areas);
  } catch (error) {
    console.error("[API Areas] Error caught in handler:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    // Ensure we always return JSON from the catch block
    return NextResponse.json(
      { message: `Internal Server Error: ${message}` },
      { status: 500 }
    );
  }
}
