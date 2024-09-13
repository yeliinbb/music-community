import { getAccessToken } from "@/app/api/utils/spotify";
import { SpotifyArtist } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get<SpotifyArtist>(`https://api.spotify.com/v1/artists/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { market: "KR", locale: "ko_KR" }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
  }
};
