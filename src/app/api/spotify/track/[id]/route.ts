import { getAccessToken } from "@/lib/spotify";
import { SpotifyTrack } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = await getAccessToken();
    // console.log('--------------------------------')
    // console.log('Access Token:', token);
    // // console.log('Params:', params.id)
    console.log("Track ID:", params.id);
    const response = await axios.get<SpotifyTrack>(`https://api.spotify.com/v1/tracks/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
      // params: { market: "KR" }
    });
    console.log("--------------------------------");
    console.log("--------------------------------");
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
