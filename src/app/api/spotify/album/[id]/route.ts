import spotifyApiAxios from "@/lib/axios/spotifyApiAxios";
import { SpotifyAlbum } from "@/types/spotify.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const response = await spotifyApiAxios.get<SpotifyAlbum>(`/albums/${params.id}`, {
      params: { market: "KR" }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch album data" }, { status: 500 });
  }
};
