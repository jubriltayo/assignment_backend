import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCorsHeaders } from "@/lib/cors";


// Global middleware for CORS. Applies to all API routes
export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const corsHeaders = getCorsHeaders(origin);
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(origin);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Configure which paths use this middleware
export const config = {
  matcher: "/api/:path*",
};
