import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // API 경로 중 인증이 필요한 경로만 포함
    "/api/spotify/(.*)", // Spotify API 경로 포함
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
