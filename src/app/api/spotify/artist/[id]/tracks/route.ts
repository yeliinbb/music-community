import spotifyApiAxios from "@/lib/api/spotifyApiAxios";
import { TracksItems } from "@/types/spotify.type";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const response = await spotifyApiAxios.get<TracksItems[]>(`/artists/${params.id}/top-tracks`, {
      params: { market: "KR" }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
