import { getAccessToken } from "@/app/api/utils/spotify";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const userId = params.get("userId");

  if (!userId) return NextResponse.json({ message: "API GET LIKES No User Id" });

  const supabase = createClient();
  const token = await getAccessToken();

  const likesData = await supabase.from("likes").select("*").eq("userId", userId);

  let query = "";
  if (likesData.data) {
    query = likesData?.data?.map((like) => like.artistId).join(",");
  }

  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();

  return NextResponse.json(data);
}
