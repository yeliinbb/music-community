import { getAccessToken } from "@/lib/spotify";
import { SpotifySearchResults } from "@/types/spotify.type";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, context: Context) {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${context.params.keyword}&type=album%2Cartist&market=KR`,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data: SpotifySearchResults = await response.json();

  return NextResponse.json(data);
}
