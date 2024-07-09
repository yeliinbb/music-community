import { getAccessToken } from "@/lib/spotify";
import { SpotifyTrack } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface GetProps {
  request: NextRequest;
  params: { id: string };
}

export const GET = async ({ request, params }: GetProps) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get<SpotifyTrack>(`https://api.spotify.com/v1/tracks/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { market: "KR" }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
