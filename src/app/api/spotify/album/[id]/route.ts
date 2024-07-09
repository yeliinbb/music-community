import { getAccessToken } from "@/lib/spotify";
import { SpotifyAlbum } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get<SpotifyAlbum>(`https://api.spotify.com/v1/albums/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { market: "KR" }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch album data" }, { status: 500 });
  }
};
