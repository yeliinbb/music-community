import spotifyApiAxios from "@/lib/api/spotifyApiAxios";
import { RelatedArtist } from "@/types/spotify.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const response = await spotifyApiAxios.get<RelatedArtist[]>(`/artists/${params.id}/related-artists`, {
      params: { market: "KR" }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
