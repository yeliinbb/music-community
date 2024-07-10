import { getAccessToken } from "@/lib/spotify";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const token = await getAccessToken();

  //TODO userID 하드코딩
  const likesData = await supabase.from("likes").select("*").eq("userId", "c0badd14-de12-4bdd-9fc8-e8c22516435d");

  //TODO query 최대 50개 까지임, 50개 이상일 때 생각할 것
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
