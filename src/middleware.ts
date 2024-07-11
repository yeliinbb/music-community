import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
  // return await NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
